package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
)

func NewCmdPipelines() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pipelines",
		Args:  cobra.ExactArgs(1),
		Short: "pipelines",
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			token := config.Token
			git, err := gitlab.NewClient(token)
			utils.ReportErr(err)
			opt := &gitlab.ListProjectPipelinesOptions{
				//Scope: gitlab.String("finished"),
				//Status:     gitlab.BuildState(gitlab.Failed),
				//Ref:        gitlab.String("main"),
				//YamlErrors: gitlab.Bool(true),
				Username: gitlab.String(config.Username),
				//UpdatedAfter:  gitlab.Time(time.Now().Add(-24 * 365 * time.Hour)),
				//UpdatedBefore: gitlab.Time(time.Now().Add(-7 * 24 * time.Hour)),
				OrderBy: gitlab.String("status"),
				Sort:    gitlab.String("asc"),
			}
			pipelines, _, err := git.Pipelines.ListProjectPipelines(args[0], opt)
			utils.ReportErr(err)
			for _, p := range pipelines {
				log.Printf("<mango>id$$&%v,status$$&%v,source$$&%v,ref$$&%v,webUrl$$&%v</mango>",
					p.ID, p.Status, p.Source, p.Ref, p.WebURL)
			}
		},
	}
	return cmd
}
