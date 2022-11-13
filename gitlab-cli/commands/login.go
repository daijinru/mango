package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
)

func NewCmdLogin() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "login",
		Short: "Authenticate with a GitLab instance",
		RunE: func(cmd *cobra.Command, args []string) error {
			basicAuth()
			return nil
		},
	}
	return cmd
}

func basicAuth() {
	token := utils.ReadLocalConfig().Token

	git, err := gitlab.NewClient(
		token,
		gitlab.WithBaseURL("https://gitlab.com/api/v4"),
	)
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	users, _, err := git.Users.ListUsers(&gitlab.ListUsersOptions{Username: gitlab.String("daijinru")})
	if err != nil {
		log.Fatalf("list users error: %v", err)
	}
	for _, user := range users {
		log.Printf("Fouund user: %v", user)
	}
	opt := &gitlab.ListProjectsOptions{Search: gitlab.String("daijinru")}
	projects, _, err := git.Projects.ListProjects(opt)
	if err != nil {
		log.Fatal(err)
	}
	//log.Println(projects)
	log.Printf("Found %d projects", len(projects))
}
