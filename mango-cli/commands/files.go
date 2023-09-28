package cmd

import (
	"fmt"

	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

func NewCmdFiles() *command.Command {
	cmd := &command.Command{
		Use: "files",
		RunE: func(cmd *command.Command, args[] string) error {
			return nil
		},
	}
	cmd.AddCommand(NewCmdDirectories())
	return cmd
}	

// List Directories in the current workspace.
func NewCmdDirectories() *command.Command {
	return &command.Command{
		Use: "list",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			output, err := runner.ListDirectories(args[0])
			utils.ReportErr(err)
			fmt.Println(output)
			return nil
		},
  }
}
