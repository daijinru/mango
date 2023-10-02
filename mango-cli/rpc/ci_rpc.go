package rpc

import (
  "fmt"

  "github.com/daijinru/mango/mango-cli/runner"
  "github.com/daijinru/mango/mango-cli/utils"
)

var (
  CI_LOCK_NAME = ".ci_running"
)

type CiService struct {
  // CiRunner *runner.CiClient
}

type Reply struct {
  Status int8
  Message string
  // data map[string]interface{}
}
type RunArgs struct {
  Path string
}
func (CiS *CiService) Run(args *RunArgs, reply *Reply) error {
  fmt.Println(args)
  reply.Status = int8(FailedCreate)

  ciOption := &runner.CiOption{
    Path: args.Path,
    LockName: CI_LOCK_NAME,
  }
  ci := &runner.CiClient{}
  ci.NewCI(ciOption)

  running, err := ci.AreRunningLocally()
  utils.ReportErr(err)
  if running {
    message := "😂 ci is running, can query the progresss of the current CI"
    reply.Message = AddPrefixMsg(message)
    fmt.Println(message)
    return nil
  }

  ok, err := ci.CreateRunningLocally()
  utils.ReportErr(err)
  if ok {
    fmt.Println("create lock file locally success: ", ci.Workspace.LockFile.Timestamp)
  } else {
    reply.Message = AddPrefixMsg("create lock file locally fail")
    return nil
  }

  ok, err = ci.ReadFromYaml()
  utils.ReportErr(err)
  if ok {
    fmt.Println("ci completes reading of: " + ci.LockName)
  } else {
    reply.Message = AddPrefixMsg("ci cannot be completed reading of: " + ci.LockName)
    return nil
  }

  reply.Status = int8(OK)
  reply.Message = AddPrefixMsg("successfully started the ci pipeline: " + ci.LockName)

  runner.Setting(&runner.ExecutionOption{
    PrintLine: true,
  })

  for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
    scripts := stage.Value
    if value, ok := scripts.(*runner.Job); ok {
      fmt.Println(AddPrefixMsg("now start stage: " + value.Stage))
      for _, script := range value.Scripts {
        _, err := runner.RunCommandSplit(script.(string))
        utils.ReportErr(err)
      }
    }
  }

  ok, err = ci.CompletedRunningTask()
  utils.ReportErr(err)
  if ok {
    fmt.Println("now release the lock: ", runner.TimeNow())
  }
  return nil
}