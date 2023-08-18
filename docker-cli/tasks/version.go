package tasks

import (
	"log"
	command "github.com/daijinru/mango-packages-command"
)

func NewCmdVersion() *command.Command {
	root := &command.Command{
		Use: "version",
		Args: command.ExactArgs(0),
		RunE: func(cmd *command.Command, args []string) error {
			log.Println("Mango/docker-cli@0.0.1")
			return nil
		},
	}
	return root
}