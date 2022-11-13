package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
)

func NewCmdPipelines() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pipeline",
		Args:  cobra.ExactArgs(0),
		Short: "pipelines",
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			token := config.Token
			git, err := gitlab.NewClient(token)
			if err != nil {
				log.Fatal(err)
			}

			username := config.Username

			opt := &gitlab.ListProjectPipelinesOptions{
				Scope: gitlab.String("branches"),
				//Status:     gitlab.BuildState(gitlab.Success),
				Ref:        gitlab.String("main"),
				YamlErrors: gitlab.Bool(true),
				Username:   gitlab.String(username),
				//UpdatedAfter:  gitlab.Time(time.Now().Add(-24 * 365 * time.Hour)),
				//UpdatedBefore: gitlab.Time(time.Now().Add(-7 * 24 * time.Hour)),
				OrderBy: gitlab.String("status"),
				Sort:    gitlab.String("asc"),
			}

			pipelines, _, err := git.Pipelines.ListProjectPipelines(38427578, opt)
			if err != nil {
				log.Fatal(err)
			}

			for _, pipeline := range pipelines {
				log.Printf("Found pipeline: %v", pipeline)
			}
		},
	}
	return cmd
}
