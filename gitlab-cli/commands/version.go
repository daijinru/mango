package cmd

import (
	"fmt"
	command "github.com/daijinru/mango-packages-command"
)

func NewCmdVersion() *command.Command {
  cmd := &command.Command{
    Use: "version",
    RunE: func(cmd *command.Command, args[]string) error {
      fmt.Println("🥭 mango version 0.0.1")
      return nil
    },
  }
  return cmd
}