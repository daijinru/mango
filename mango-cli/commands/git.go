package cmd

import (
	"fmt"

	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

func NewCmdGit() *command.Command {
	cmd := &command.Command{
		Use: "git",
		RunE: func(cmd *command.Command, args[] string) error {
			return nil
		},
	}
	cmd.AddCommand(NewCmdGitLog())
  cmd.AddCommand(NewCmdGitStatus())
	return cmd
}

// List Statu
func NewCmdGitLog() *command.Command {
	return &command.Command{
		Use: "log",
		// Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			output, err := runner.GetLog()
			utils.ReportErr(err)
			fmt.Println(output)
			return nil
		},
  }
}


func NewCmdGitStatus() *command.Command {
	return &command.Command{
		Use: "status",
		// Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			output, err := runner.GetStatus()
			utils.ReportErr(err)
			fmt.Println(output)
			return nil
		},
  }
}