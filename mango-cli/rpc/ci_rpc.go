package rpc

import (
	"fmt"
	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

var (
  CI_LOCK_NAME = ".running.lock"
)

type CiService struct {
}

func formatReplyMsg(runner *runner.Runner, msg string) string {
  return fmt.Sprintf("[%s] [%s] 🥭 %s", utils.TimeNow(), runner.Pipeline.Filename, msg)
}

// Path parameter passing that service will switch to the path,
// as the working directory,
// and then performing the tasks by meta-inf/.mango-ci.yaml
func (CiS *CiService) CreatePipeline(args *CreatePipArgs, reply *PipReply) error {
  reply.Status = int8(FailedCreate)

  runnerArgs := &runner.RunnerArgs{
    Path: args.Path,
    Tag: args.Tag,
  }
  runner, err := runner.NewRunner(runnerArgs)
  if err != nil {
    reply.Message = err.Error()
    return nil
  }
  
  running, err := runner.ReadStatus()
  if err != nil {
    runner.Logger.Warn(err.Error())
  }
  if running {
    message := "🔒 ci is running, No further operations allowed until it ends"
    runner.Logger.Warn(message)
    reply.Message = formatReplyMsg(runner, message)
    return nil
  }

  err = runner.Complete()
  if err != nil {
    runner.Logger.Warn(err.Error())
    reply.Message = err.Error()
    return nil
  }

  go func() {
    err = runner.Create()
    if err != nil {
      runner.Logger.Warn(err.Error())
    }
  }()

  reply.Status = int8(OK)
  reply.Message = formatReplyMsg(runner, "new pipeline was successfully launched!")
  reply.Data.Tag = runner.Pipeline.Tag
  return nil
}

// Whether the pipeline is running: query by pid and name locate the lock file at the path.
func (Cis *CiService) ReadPipelineStatus(args *QueryPipArgs, reply *PipReply) error {
  reply.Status = int8(FailedQuery)

  runnerArgs := &runner.RunnerArgs{
    Path: args.Path,
    Tag: args.Tag,
  }
  runner, err := runner.NewRunner(runnerArgs)
  if err != nil {
    reply.Message = err.Error()
    return nil
  }

  running, err := runner.Pipeline.ReadPipelineStatus(runner.Lock.FilePath)
  if err != nil {
    runner.Logger.Warn(err.Error())
  }
  reply.Status = int8(OK)
  reply.Data.Running = running
  return nil
}

// Jobs tasks execution is output to a file, and its calling returns the contents of the file.
func (Cis *CiService) ReadPipeline(args *QueryPipArgs, reply *PipReply) error {
  reply.Status = int8(FailedQuery)

  workspace, err := runner.NewWorkSpace(args.Path)
  if err != nil {
    reply.Message = err.Error()
    return nil
  }
  
  pipeline, err := runner.NewPipeline(&runner.PipelineArgs{
    Tag: args.Tag,
    Path: workspace.CWD,
  })
  if err != nil {
    reply.Message = err.Error()
    return nil
  }
  
  content := pipeline.ReadFile(args.Filename)
  reply.Status = int8(OK)
  reply.Data.Content = content
  return nil
}

// Gets all pipeline files by the path passing.
func (Cis *CiService) ReadPipelines(args *QueryPipArgs, reply *PipListReply) error {
  reply.Status = int8(FailedQuery)

  workspace, err := runner.NewWorkSpace(args.Path)
  if err != nil {
    reply.Message = err.Error()
    return nil
  }
  
  pipeline, err := runner.NewPipeline(&runner.PipelineArgs{
    Tag: args.Tag,
    Path: workspace.CWD,
  })
  if err != nil {
    reply.Message = err.Error()
    return nil
  }

  pipFilenames, err := pipeline.ReadDir()
  if err != nil {
    reply.Message = err.Error()
    return nil
  }
  reply.Status = int8(OK)
  reply.Data.Total = len(pipFilenames)
  reply.Data.Filenames = pipFilenames
  reply.Data.Tag = pipeline.Tag
  return nil
}
