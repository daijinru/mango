package cmd

import (
  "fmt"
  command "github.com/daijinru/mango-packages-command"
  "github.com/daijinru/mango/mango-cli/runner"
  "github.com/daijinru/mango/mango-cli/utils"
)

var (
  CI_LOCK_NAME = ".ci-running"
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
      ci := &runner.CiClient{}
      ciOption := &runner.CiOption{
        Path: args[0],
      }
      ci.NewCI(ciOption)
      ok, err := ci.ReadFromYaml()
      utils.ReportErr(err)
      if ok {
        // TODO print fields of ci config
        fmt.Println("Version: ", ci.Version)
        for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
          fmt.Println(stage.Value)
        }
      }

      return nil
    },
  }
}

func NewCmdRunConfig() *command.Command {
  return &command.Command{
    Use: "run",
    RunE: func(cmd *command.Command, args []string) error {
      ciOption := &runner.CiOption{
        Path: args[0],
        LockName: CI_LOCK_NAME,
      }
      ci := &runner.CiClient{}
      ci.NewCI(ciOption)

      running, err := ci.AreRunningLocally()
      utils.ReportErr(err)
      if running {
        fmt.Println("😂 ci is running, can query the progresss of the current CI")
        return nil
      }

      ok, err := ci.CreateRunningLocally()
      utils.ReportErr(err)
      if ok {
        fmt.Println("create lock file locally success: ", ci.Workspace.LockFile.Timestamp)
      }

      ok, err = ci.ReadFromYaml()
      utils.ReportErr(err)
      if ok {
        fmt.Println("ci completes reading of: " + ci.LockName)
      }

      runner.Setting(&runner.ExecutionOption{
        PrintLine: true,
      })
      for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
        scripts := stage.Value
        if value, ok := scripts.(*runner.Job); ok {
          fmt.Println("[🥭 now start stage: ", value.Stage, " ]")
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
    },
  }
}
