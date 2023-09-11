package cmd

import (
	"fmt"
	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/gitlab-cli/utils"
)

func NewCmdConfig() *command.Command {
	cmd := &command.Command{
		Use: "config",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
	cmd.AddCommand(NewCmdConfigGetToken())
	cmd.AddCommand(NewCmdConfigGetUser())
	return cmd
}

func NewCmdConfigGetToken() *command.Command {
	cmd := &command.Command{
		Use: "token",
		RunE: func(cmd *command.Command, args []string) error {
			config := utils.ReadLocalConfig()
			fmt.Println(config.Token)
			return nil
		},
	}
	return cmd
}

func NewCmdConfigGetUser() *command.Command {
	cmd := &command.Command{
		Use: "user",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
	return cmd
}
