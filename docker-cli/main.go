package main

import (
	command "github.com/daijinru/mango-packages-command"
	tasks "docker-cli/tasks"
)

func main() {
	rootCommand := &command.Command{
		Use: "docker cli",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}

	rootCommand.AddCommand(tasks.NewCmdImages())
	rootCommand.AddCommand(tasks.NewCmdVersion())
	rootCommand.Execute()
}
