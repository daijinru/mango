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
			git, err := gitlab.NewClient(localToken)
			utils.ReportErr(err)
			projects, _, err := git.Projects.ListUserProjects(config.Username, nil)
			utils.ReportErr(err)
			for _, p := range projects {
				log.Printf("<mango>id:%v,description:%v,SSHURLToRepo:%v,webUrl:%v,username:%v,userId:%v</mango>",
					p.ID, p.Description, p.SSHURLToRepo, p.WebURL, p.Owner.Username, p.Owner.ID)
			}
			return nil
		},
	}
	return cmd
}
