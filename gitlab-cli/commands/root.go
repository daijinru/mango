package cmd

import (
	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/xanzy/go-gitlab"
)

var (
	rootCmd = &command.Command{
		Use: "gitlab-ci",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
	customGit = initGit()
	docker = initDocker()
)

func initDocker() *utils.Docker {
	docker := &utils.Docker{}
	client := docker.NewClient()
	return client
}

func Execute() error {
	return rootCmd.Execute()
}

func initGit() *gitlab.Client {
	config := utils.ReadLocalConfig()
	token := config.Token
	url := config.BaseUrl
	utils.CheckType(token, "Token")
	utils.CheckType(url, "BaseUrl")
	customGit, err := gitlab.NewClient(token, gitlab.WithBaseURL(url))
	utils.ReportErr(err)
	return customGit
}

func init() {
	rootCmd.AddCommand(NewCmdConfig())
	rootCmd.AddCommand(NewCmdPipelines())
	rootCmd.AddCommand(NewCmdPipeline())
	rootCmd.AddCommand(NewCmdProjects())
	rootCmd.AddCommand(NewCmdProject())
	rootCmd.AddCommand(NewCmdCommits())
	rootCmd.AddCommand(NewCmdVersion())
	
	rootCmd.AddCommand(NewDockerConfig())
}
