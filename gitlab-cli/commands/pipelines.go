package cmd

import (
	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/gitlab-cli/utils"
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

func NewCmdPipelines() *command.Command {
	cmd := &command.Command{
		Use:  "pipelines",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			config := utils.ReadLocalConfig()
			opt := &gitlab.ListProjectPipelinesOptions{
				Username: gitlab.String(config.Username),
				OrderBy:  gitlab.String("status"),
				Sort:     gitlab.String("asc"),
			}
			pipelines, _, err := customGit.Pipelines.ListProjectPipelines(args[0], opt)
			utils.ReportErr(err)

			for _, p := range pipelines {
				m := utils.ExpandMapToString(utils.StructToMap(p))
				s := os.Expand(utils.MangoPrintTemplate(PipelineInfo{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
			}

			return nil
		},
	}
	return cmd
}

func NewCmdPipeline() *command.Command {
	cmd := &command.Command{
		Use: "pipeline",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
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

func GetSinglePipeline() *command.Command {
	cmd := &command.Command{
		Use:  "get",
		Args: command.ExactArgs(2),
		RunE: func(cmd *command.Command, args []string) error {
			id, err := strconv.Atoi(args[1])
			utils.ReportErr(err)
			p, _, err := customGit.Pipelines.GetPipeline(args[0], id)
			utils.ReportErr(err)

			m := utils.ExpandMapToString(utils.StructToMap(p))
			s := os.Expand(utils.MangoPrintTemplate(Pipeline{}), func(k string) string {
				return m[k]
			})
			log.Print(s)
			return nil
		},
	}
	return cmd
}

func CreatePipeline() *command.Command {
	cmd := &command.Command{
		Use:  "create",
		Args: command.ExactArgs(2),
		RunE: func(cmd *command.Command, args []string) error {
			opts := &gitlab.CreatePipelineOptions{
				// todo: ?? why use ptr here, probably for memory shared.
				Ref: gitlab.String(args[1]),
			}
			r, _, err := customGit.Pipelines.CreatePipeline(args[0], opts)
			utils.ReportErr(err)
			m := utils.ExpandMapToString(utils.StructToMap(r))
			s := os.Expand(utils.MangoPrintTemplate(Pipeline{}), func(k string) string {
				return m[k]
			})
			log.Print(s)
			return nil
		},
	}
	return cmd
}

func DeletePipeline() *command.Command {
	return &command.Command{
		Use:  "delete",
		Args: command.ExactArgs(2),
		RunE: func(cmd *command.Command, args []string) error {
			id, err := strconv.Atoi(args[1])
			utils.ReportErr(err)
			res, err := customGit.Pipelines.DeletePipeline(args[0], id)
			utils.ReportErr(err)
			log.Print(res.Response.Status)
			return nil
		},
	}
}
