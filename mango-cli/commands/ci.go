package cmd

import (
  "fmt"
  command "github.com/daijinru/mango-packages-command"
  "github.com/daijinru/mango/mango-cli/runner"
  "github.com/daijinru/mango/mango-cli/utils"
)

func NewCmdCI() *command.Command {
  root := &command.Command{
    Use: "ci",
    RunE: func(cmd *command.Command, args []string) error {
      return nil
    },
  }
  root.AddCommand(NewCmdGetConfig())
  root.AddCommand(NewCmdRunConfig())
  return root
}

func NewCmdGetConfig() *command.Command {
  return &command.Command{
    Use: "get",
    RunE: func(cmd *command.Command, args []string) error {
      var ci = &runner.CiConfig{}
      ci.NewCI()
      _, err := ci.ReadFromYaml(args[0])
      utils.ReportErr(err)
      // TODO print fields of ci config
      fmt.Println("Version: ", ci.Version)
      for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
        fmt.Println(stage.Value)
      }
      return nil
    },
  }
}

func NewCmdRunConfig() *command.Command {
  return &command.Command{
    Use: "run",
    RunE: func(cmd *command.Command, args []string) error {
      lockName := ".ci.running"
      workspace := &runner.WorkspaceClient{}
      workspace.NewWorkSpaceClient(args[0])
      
      isLock, err := workspace.IfExistsLock(lockName)
      utils.ReportErr(err)
      if isLock {
        fmt.Println("ci is running: " + lockName)
        return nil
      }

      lockFile, err := workspace.CreateLockFile(lockName)
      utils.ReportErr(err)

      ci := &runner.CiConfig{}
      ci.NewCI()
      _, err = ci.ReadFromYaml(args[0])
      utils.ReportErr(err)
      runner.Setting(&runner.ExecutionOption{
        PrintLine: true,
      })

      for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
        scripts := stage.Value
        if value, ok := scripts.(*runner.Job); ok {
          fmt.Println("now start [stage]: ", value.Stage)
          for _, script := range value.Scripts {
            _, err := runner.RunCommandSplit(script.(string))
            utils.ReportErr(err)
          }
        }
      }
      
      fmt.Println("now release the lock: ", lockFile.Timestamp)
      lockFile.DeleteLockFile()
      return nil
    },
  }
}
