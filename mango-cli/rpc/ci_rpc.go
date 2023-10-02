package rpc

import (
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
  Name string
  Path string
}
func (CiS *CiService) Run(args *RunArgs, reply *Reply) error {
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
    message := "🔒ci is running, No further operations allowed until it ends"
    reply.Message = utils.AddPrefixMsg(message)
    utils.ReportWarn(message)
    return nil
  }

  ok, err := ci.CreateRunningLocally()
  utils.ReportErr(err)
  if ok {
    utils.ReportLog("create lock file locally success")
  } else {
    reply.Message = utils.AddPrefixMsg("create lock fail")
    return nil
  }

  ok, err = ci.ReadFromYaml()
  utils.ReportErr(err)
  if ok {
    utils.ReportLog("ci completes reading from local yaml: " + ci.LockName)
  } else {
    reply.Message = utils.AddPrefixMsg("ci cannot be completed reading of: " + ci.LockName)
    return nil
  }

  reply.Status = int8(OK)
  reply.Message = utils.AddPrefixMsg("successfully started the ci pipeline: " + ci.LockName)

  // Executiing of the pipelines is time-consuming,
  // do not wait here just let for reponding
  go func() {
    execution := &runner.Execution{
      PrintLine: true,
    }
    for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
      scripts := stage.Value
      if value, ok := scripts.(*runner.Job); ok {
        utils.ReportLog("now running stage: " + value.Stage)
        for _, script := range value.Scripts {
          _, err := execution.RunCommandSplit(script.(string))
          utils.ReportErr(err, "started stage: " + value.Stage + ", but run ci script failed: %v")
        }
      }
    }

    ok, err = ci.CompletedRunningTask()
    utils.ReportErr(err, "cannot be ended running task %v")
    if ok {
      utils.ReportSuccess("✅finish running task and now release🔓 the lock")
    }
  }()

  return nil
}