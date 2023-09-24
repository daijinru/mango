package cmd

import (
	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/mango-cli/utils"
)

var (
	rootCmd = &command.Command{
		Use: "gitlab-ci",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
	docker = initDocker()
)

func init() {
	rootCmd.AddCommand(NewCmdVersion())
	rootCmd.AddCommand(NewDockerConfig())
	rootCmd.AddCommand(NewCmdRun())
}

func initDocker() *utils.Docker {
	docker := &utils.Docker{}
	client := docker.NewClient()
	return client
}

func Execute() error {
	return rootCmd.Execute()
}


