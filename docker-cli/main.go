package main

import (
	"docker-cli/command"
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
