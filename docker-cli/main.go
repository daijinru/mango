package main

import (
	command "github.com/daijinru/mango-packages-command"
)

func main() {
	rootCommand := &command.Command{
		Use: "docker cli",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}

	rootCommand.AddCommand(NewCmdImages())
	rootCommand.Execute()
}
