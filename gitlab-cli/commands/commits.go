package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
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

func NewCmdCommits() *cobra.Command {
	return &cobra.Command{
		Use:   "commits",
		Short: "List commits of the project",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			config := utils.ReadLocalConfig()
			git, err := gitlab.NewClient(config.Token)
			utils.ReportErr(err)

			now := time.Now()
			since := now.AddDate(0, 0, -150)
			listCommitsOptions := gitlab.ListCommitsOptions{
				Since: &since,
			}

			commits, _, err := git.Commits.ListCommits(args[0], &listCommitsOptions)
			utils.ReportErr(err)
			for _, c := range commits {
				m := utils.ExpandMapToString(utils.StructToMap(c))
				s := os.Expand(utils.MangoPrintTemplate(Commit{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
			}
		},
	}
}
