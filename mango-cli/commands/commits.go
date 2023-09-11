package cmd

import (
	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/xanzy/go-gitlab"
	"log"
	"os"
	"time"
)

type Commit struct {
	ID             string                 `json:"id"`
	ShortID        string                 `json:"short_id"`
	Title          string                 `json:"title"`
	AuthorName     string                 `json:"author_name"`
	AuthorEmail    string                 `json:"author_email"`
	AuthoredDate   *time.Time             `json:"authored_date"`
	CommitterName  string                 `json:"committer_name"`
	CommitterEmail string                 `json:"committer_email"`
	CommittedDate  *time.Time             `json:"committed_date"`
	CreatedAt      *time.Time             `json:"created_at"`
	Message        string                 `json:"message"`
	ParentIDs      []string               `json:"parent_ids"`
	Stats          gitlab.CommitStats     `json:"stats"`
	Status         gitlab.BuildStateValue `json:"status"`
	LastPipeline   *PipelineInfo          `json:"last_pipeline"`
	ProjectID      int                    `json:"project_id"`
	Trailers       map[string]string      `json:"trailers"`
	WebURL         string                 `json:"web_url"`
}

func NewCmdCommits() *command.Command {
	return &command.Command{
		Use:  "commits",
		Args: command.ExactArgs(1),
		RunE: func(cmd *command.Command, args []string) error {
			now := time.Now()
			since := now.AddDate(0, 0, -150)
			listCommitsOptions := gitlab.ListCommitsOptions{
				Since: &since,
			}

			commits, _, err := customGit.Commits.ListCommits(args[0], &listCommitsOptions)
			utils.ReportErr(err)
			for _, c := range commits {
				m := utils.ExpandMapToString(utils.StructToMap(c))
				s := os.Expand(utils.MangoPrintTemplate(Commit{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
			}
			return nil
		},
	}
}
