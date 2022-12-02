package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
	"os"
	"strconv"
	"time"
)

type PipelineInfo struct {
	ID        int        `json:"id"`
	ProjectID int        `json:"project_id"`
	Status    string     `json:"status"`
	Source    string     `json:"source"`
	Ref       string     `json:"ref"`
	WebURL    string     `json:"web_url"`
	UpdatedAt *time.Time `json:"updated-at"`
	CreatedAt *time.Time `json:"created-at"`
}

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
				m := utils.ExpandMapToString(utils.StructToMap(p))
				s := os.Expand(utils.MangoPrintTemplate(PipelineInfo{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
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
	cmd.AddCommand(DeletePipeline())
	return cmd
}

type Pipeline struct {
	ID          int        `json:"id"`
	ProjectID   int        `json:"project_id"`
	Status      string     `json:"status"`
	Source      string     `json:"source"`
	Ref         string     `json:"ref"`
	Tag         bool       `json:"tag"`
	YamlErrors  string     `json:"yaml_errors"`
	CommittedAt *time.Time `json:"committed_at"`
	Duration    int        `json:"duration"`
	Coverage    string     `json:"coverage"`
	WebURL      string     `json:"web_url"`
	UpdatedAt   *time.Time `json:"updated-at"`
	StartedAt   *time.Time `json:"started-at"`
	CreatedAt   *time.Time `json:"created-at"`
	FinishedAt  *time.Time `json:"finished-at"`
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

			m := utils.ExpandMapToString(utils.StructToMap(p))
			s := os.Expand(utils.MangoPrintTemplate(Pipeline{}), func(k string) string {
				return m[k]
			})
			log.Print(s)
		},
	}
	return cmd
}

func CreatePipeline() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a pipeline for the project",
		Args:  cobra.MinimumNArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			git, err := gitlab.NewClient(config.Token)
			utils.ReportErr(err)
			opts := &gitlab.CreatePipelineOptions{
				// todo: ?? why use ptr here, probably for memory shared.
				Ref: gitlab.String(args[1]),
			}
			r, _, err := git.Pipelines.CreatePipeline(args[0], opts)
			utils.ReportErr(err)
			m := utils.ExpandMapToString(utils.StructToMap(r))
			s := os.Expand(utils.MangoPrintTemplate(Pipeline{}), func(k string) string {
				return m[k]
			})
			log.Print(s)
		},
	}
	return cmd
}

func DeletePipeline() *cobra.Command {
	return &cobra.Command{
		Use:   "delete",
		Short: "Delete a pipeline for the project",
		Args:  cobra.MinimumNArgs(2),
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			git, err := gitlab.NewClient(config.Token)
			utils.ReportErr(err)
			id, err := strconv.Atoi(args[1])
			utils.ReportErr(err)
			res, err := git.Pipelines.DeletePipeline(args[0], id)
			utils.ReportErr(err)
			log.Print(res.Response.Status)
		},
	}
}
