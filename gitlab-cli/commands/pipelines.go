package cmd

import (
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
			git, err := gitlab.NewClient("yourtokengoeshere")
			if err != nil {
				log.Fatal(err)
			}

			opt := &gitlab.ListProjectPipelinesOptions{
				Scope:      gitlab.String("branches"),
				Status:     gitlab.BuildState(gitlab.Running),
				Ref:        gitlab.String("master"),
				YamlErrors: gitlab.Bool(true),
				//Name:          gitlab.String("name"),
				//Username:      gitlab.String("username"),
				//UpdatedAfter:  gitlab.Time(time.Now().Add(-24 * 365 * time.Hour)),
				//UpdatedBefore: gitlab.Time(time.Now().Add(-7 * 24 * time.Hour)),
				OrderBy: gitlab.String("status"),
				Sort:    gitlab.String("asc"),
			}

			pipelines, _, err := git.Pipelines.ListProjectPipelines(2743054, opt)
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
