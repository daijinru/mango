package cmd

import (
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
)

func NewCmdLogin() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "login",
		Short: "Authenticate with a GitLab instance",
		Run: func(cmd *cobra.Command, args []string) {
			basicAuth()
		},
	}
	return cmd
}

func basicAuth() {
	git, err := gitlab.NewBasicAuthClient(
		"xxx",
		"xxx",
		gitlab.WithBaseURL("https://gitlab.com"),
	)
	if err != nil {
		log.Fatal(err)
	}
	projects, _, err := git.Projects.ListProjects(nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(projects)
	//log.Printf("Found %d projects", len(projects))
}
