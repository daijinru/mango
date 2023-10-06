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
}

type CreatePipelineReply struct {
  Tag string
}
type Reply struct {
  Status int8
  Message string
  Data CreatePipelineReply 
}
type PipArgs struct {
  Tag string
  Path string
}

func formatPipMsg(ci *runner.CiClient, msg string) string {
  return fmt.Sprintf("[%s] [%s] 🥭 %s", utils.TimeNow(), ci.Pipeline.Filename, msg)
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

  running, err := ci.AreRunningLocally()
  if err != nil {
    ci.Logger.ReportWarn(err.Error())
    reply.Message = formatPipMsg(ci, err.Error())
    return nil
  }
  if running {
    message := "🔒 ci is running, No further operations allowed until it ends"
    reply.Message = formatPipMsg(ci, message)
    ci.Logger.ReportWarn(message)
    return nil
  }

  ok, err := ci.CreateRunningLocally()
  if err != nil {
    ci.Logger.ReportWarn(err.Error())
    reply.Message = formatPipMsg(ci, "create lock fail")
    return nil
  }
  if ok {
    ci.Logger.ReportLog("🔒 create lock file locally success")
  }

  ok, err = ci.ReadFromYaml()
  if ok {
    ci.Logger.ReportLog("📝 ci completes reading from local yaml")
  } else {
    message := "error occured at ci.ReadFromYaml"
    reply.Message = formatPipMsg(ci, message)
    ci.Logger.ReportWarn(err.Error())
    return nil
  }

  reply.Status = int8(OK)
  reply.Message = formatPipMsg(ci, "new pipeline was successfully launched!")
  reply.Data.Tag = ci.Pipeline.Tag

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
        ci.Logger.ReportLog("🎯 now running stage: " + value.Stage)
        // fmt.Println(value)
        for _, script := range value.Scripts {
          _, err := execution.RunCommandSplit(script.(string))
          if err != nil {
            ci.Logger.ReportWarn(fmt.Sprintf("has launched %s, but execution of ci script failed", value.Stage))
          }
        }
      }
    }

    err = ci.CompletedRunningTask()
    if err != nil {
      ci.Logger.ReportWarn(fmt.Sprintf("unable ended running pipeline: %s", err))
    }
    if ok {
      ci.Logger.ReportSuccess("✅ finish running task and now release 🔓 the lock")
    }
  }()
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