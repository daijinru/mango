package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
)

func NewCmdProjects() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "projects",
		Args:  cobra.ExactArgs(0),
		Short: "list projects",
		RunE: func(cmd *cobra.Command, args []string) error {
			config := utils.ReadLocalConfig()
			//git, err := gitlab.NewBasicAuthClient(
			//	config.Username,
			//	config.Password,
			//	gitlab.WithBaseURL("https://gitlab.com/api/v4"),
			//)
			git, err := gitlab.NewClient(localToken)
			utils.ReportErr(err)
			projects, _, err := git.Projects.ListUserProjects(config.Username, nil)
			utils.ReportErr(err)
			log.Printf("Found repos: %v", len(projects))
			for _, project := range projects {
				log.Printf("Found repo: %v", project.Name)
			}
			return nil
		},
	}
	return cmd
}
