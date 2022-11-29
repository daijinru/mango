package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/xanzy/go-gitlab"
	"log"
	"os"
)

type Project struct {
	ID            int          `json:"id"`
	Name          string       `json:"name"`
	Description   string       `json:"description"`
	AvatarURL     string       `json:"avatar_url"`
	SSHURLToRepo  string       `json:"ssh_url_to_repo"`
	HTTPURLToRepo string       `json:"http_url_to_repo"`
	WebURL        string       `json:"web_url"`
	DefaultBranch string       `json:"default_branch"`
	Owner         *gitlab.User `json:"owner"`
}

func NewCmdProjects() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "projects",
		Args:  cobra.ExactArgs(0),
		Short: "list projects",
		RunE: func(cmd *cobra.Command, args []string) error {
			config := utils.ReadLocalConfig()
			git, err := gitlab.NewClient(config.Token)
			utils.ReportErr(err)
			projects, _, err := git.Projects.ListUserProjects(config.Username, nil)
			utils.ReportErr(err)
			for _, p := range projects {
				m := utils.ExpandMapToString(utils.StructToMap(p))
				s := os.Expand(utils.MangoPrintTemplate(Project{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
			}
			return nil
		},
	}
	return cmd
}
