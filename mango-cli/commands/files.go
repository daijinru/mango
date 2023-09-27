package cmd

import (
	"fmt"

	command "github.com/daijinru/mango-packages-command"
	files "github.com/daijinru/mango/mango-cli/libs_files"
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

// List Statu
func NewCmdDirectories() *command.Command {
	return &command.Command{
		Use: "list",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			output, err := files.LstDirectories(args[0])
			utils.ReportErr(err)
			fmt.Println(output)
			return nil
		},
  }
}
