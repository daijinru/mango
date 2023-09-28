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
	cmd.AddCommand(NewCmdWorkspace())
  cmd.AddCommand(NewCmdLs())
	return cmd
}	

// List Directories in the current workspace.
func NewCmdWorkspace() *command.Command {
	return &command.Command{
		Use: "ws",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
      client := &runner.WorkspaceClient{}
      _, err := client.NewWorkSpaceClient(args[0])
			utils.ReportErr(err)
      fmt.Println(client.Workspace)
			return nil
		},
  }
}

func NewCmdLs() *command.Command {
  return &command.Command{
    Use: "ls",
    Args: command.ExactArgs(1),
    RunE: func(cmd *command.Command, args []string) error {
      // client, err := createWorkspaceClient(args[0])
      client := &runner.WorkspaceClient{}
      files, err := client.LsFiles(args[0])
      utils.ReportErr(err)
      fmt.Println(files)
      return nil
    },
  }
}
