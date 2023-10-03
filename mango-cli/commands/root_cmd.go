package cmd

import (
  command "github.com/daijinru/mango-packages-command"
)

var (
  rootCmd = &command.Command{
    Use: "gitlab-ci",
    RunE: func(cmd *command.Command, args []string) error {
      return nil
    },
  }
)

func init() {
  rootCmd.AddCommand(NewCmdVersion())
  rootCmd.AddCommand(NewServiceRPC())
}

func Execute() error {
  return rootCmd.Execute()
}


