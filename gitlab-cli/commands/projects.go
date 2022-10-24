package cmd

import (
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
			git, err := gitlab.NewClient(localToken)
			if err != nil {
				log.Fatal(err)
			}
			opt := &gitlab.ListProjectsOptions{}
			projects, _, err := git.Projects.ListProjects(opt)

		},
	}
}
