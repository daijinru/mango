package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
	"strconv"
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
				Username: gitlab.String(config.Username),
				OrderBy:  gitlab.String("status"),
				Sort:     gitlab.String("asc"),
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

func NewCmdPipeline() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pipeline",
		Short: "To operate a pipeline",
		Run: func(cmd *cobra.Command, args []string) {

		},
	}
	cmd.AddCommand(GetSinglePipeline())
	cmd.AddCommand(CreatePipeline())
	return cmd
}

func GetSinglePipeline() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get",
		Short: "Get a single pipeline with pid and its id",
		Args:  cobra.MinimumNArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			git, err := gitlab.NewClient(config.Token)
			utils.ReportErr(err)
			id, err := strconv.Atoi(args[1])
			utils.ReportErr(err)
			p, _, err := git.Pipelines.GetPipeline(args[0], id)
			utils.ReportErr(err)
			log.Printf("<mango>id$$&%v,projectId$$&%v,status$$&%v,source$$&%v,ref$$&%v,user$$&%v,webUrl$$&%v,tag$$&%v,duration$$&%v</mango>",
				p.ID, p.ProjectID, p.Status, p.Source, p.Ref, p.User, p.WebURL, p.Tag, p.Duration)
		},
	}
	return cmd
}

func CreatePipeline() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a pipeline for the project",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {

		},
	}
	return cmd
}
