package rpc

import (
	"fmt"

	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

var (
  CI_LOCK_NAME = ".running"
)

type CiService struct {
  Pid *runner.Pid
}

type Reply struct {
  Status int8
  Message string
}
type PipArgs struct {
  Tag string
  Path string
}

// Path parameter passing that service will switch to the path,
// as the working directory,
// and then performing the tasks by meta-inf/.mango-ci.yaml
func (CiS *CiService) CreatePip(args *PipArgs, reply *Reply) error {
  reply.Status = int8(FailedCreate)

  ciOption := &runner.CiOption{
    Path: args.Path,
    LockName: CI_LOCK_NAME,
  }
  ci := &runner.CiClient{}
  ci.NewCI(ciOption)

  defer ci.Logger.Writer.Close()
  defer ci.Pipeline.File.Close()

  if CiS.Pid == nil {
    pid := &runner.Pid{}
    pid, err := pid.NewPid(&runner.PidOption{
      Path: args.Path,
    })
    if err != nil {
      fmt.Printf(utils.AddPrefixMsg("errors about pid has occured: %v"), err)
    } else {
      CiS.Pid = pid
    }
  }

  running, err := ci.AreRunningLocally()
  utils.ReportErr(err)
  if running {
    message := "🔒ci is running, No further operations allowed until it ends"
    reply.Message = utils.AddPrefixMsg(message)
    ci.Logger.ReportWarn(message)
    return nil
  }

  ok, err := ci.CreateRunningLocally()
  utils.ReportErr(err)
  if ok {
    ci.Logger.ReportLog("create lock file locally success")
  } else {
    reply.Message = utils.AddPrefixMsg("create lock fail")
    return nil
  }

  ok, err = ci.ReadFromYaml()
  utils.ReportErr(err)
  if ok {
    ci.Logger.ReportLog("ci completes reading from local yaml: " + ci.LockName)
  } else {
    message := "error occured at ci.ReadFromYaml: %s"
    utils.ReportErr(err, message)
    reply.Message = err.Error()
    // reply.Message = utils.AddPrefixMsg("ci cannot be completed reading of: " + ci.LockName)
    return nil
  }

  reply.Status = int8(OK)
  reply.Message = utils.AddPrefixMsg("successfully started the ci pipeline: " + ci.LockName)

  // Executiing of the pipelines is time-consuming,
  // do not wait here just let for reponding
  go func() {
    execution := &runner.Execution{
      PrintLine: true,
      Pipeline: ci.Pipeline,
    }
    for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
      scripts := stage.Value
      if value, ok := scripts.(*runner.Job); ok {
        ci.Logger.ReportLog("now running stage: " + value.Stage)
        // fmt.Println(value)
        for _, script := range value.Scripts {
          _, err := execution.RunCommandSplit(script.(string))
          utils.ReportErr(err, "started stage: " + value.Stage + ", but run ci script failed: %v")
        }
      }
    }

    ok, err = ci.CompletedRunningTask()
    utils.ReportErr(err, "cannot be ended running task %v")
    if ok {
      ci.Logger.ReportSuccess("✅finish running task and now release🔓 the lock")
    }
  }()
  return nil
}

type ExitArgs struct {
  Path string
  Restart bool
}
func (CiS *CiService) Exit (args *ExitArgs, reply *Reply) error {
  reply.Status = int8(FailedExit)

  pid := &runner.Pid{}
  pid.ThinClient(&runner.PidOption{
    Path: args.Path,
  })
  err := pid.ProcessKill()
  if err != nil {
    message := "failed to kill process: %v\n"
    fmt.Printf(utils.AddPrefixMsg(message), err)
    reply.Message = message
    return nil
  }
  reply.Status = int8(OK)
  reply.Message = "kill process successfully"
  return nil
}

// Get the pipelines running status which using the Tag and Path.
// It will return contents of the pipeline file which was written of each running task.
// This Content describes the status of executing stage and jobs.
func (Cis *CiService) GetPip (args *PipArgs, reply *Reply) error {
  return nil
}

// Gets all pipeline files by the path passing.
func (Cis *CiService) GetPips (args *PipArgs, reply *Reply) error {
  return nil
}

// Jobs tasks execution is output to a file, and its calling returns the contents of the file.
func (Cis *CiService) GetPipOutput (args *PipArgs, reply *Reply) error {
  return nil
}