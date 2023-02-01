package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
)

var (
	rootCmd = &cobra.Command{
		Use:   "gitlab-ci",
		Short: "a cli for gitlab",
		RunE: func(cmd *cobra.Command, args []string) error {
			return nil
		},
	}
	customGit = initGit()
)

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
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(NewCmdConfig())
	rootCmd.AddCommand(NewCmdPipelines())
	rootCmd.AddCommand(NewCmdPipeline())
	rootCmd.AddCommand(NewCmdProjects())
	rootCmd.AddCommand(NewCmdProject())
	rootCmd.AddCommand(NewCmdCommits())
}
