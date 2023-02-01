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
			utils.CheckType(config.Username, "Username")
			projects, _, err := customGit.Projects.ListUserProjects(config.Username, nil)
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

func NewCmdProject() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "project",
		Args:  cobra.MinimumNArgs(1),
		Short: "To operate a project",
		Run: func(cmd *cobra.Command, args []string) {
		},
	}
	cmd.AddCommand(NewCmdGetProject())
	cmd.AddCommand(NewCmdGetBranches())
	return cmd
}

func NewCmdGetProject() *cobra.Command {
	return &cobra.Command{
		Use:   "get",
		Args:  cobra.MinimumNArgs(1),
		Short: "Get a project info",
		Run: func(cmd *cobra.Command, args []string) {
			p, _, err := customGit.Projects.GetProject(args[0], nil)
			utils.ReportErr(err)

			m := utils.ExpandMapToString(utils.StructToMap(p))
			s := os.Expand(utils.MangoPrintTemplate(Project{}), func(k string) string {
				return m[k]
			})
			log.Print(s)
		},
	}
}

type Branch struct {
	Commit             gitlab.Commit `json:"commit"`
	Name               string        `json:"name"`
	Protected          bool          `json:"protected"`
	Merged             bool          `json:"merged"`
	Default            bool          `json:"default"`
	CanPush            bool          `json:"can_push"`
	DevelopersCanPush  bool          `json:"developers_can_push"`
	DevelopersCanMerge bool          `json:"developers_can_merge"`
	WebURL             string        `json:"web_url"`
}

func NewCmdGetBranches() *cobra.Command {
	return &cobra.Command{
		Use:   "branches",
		Short: "Get branches of the project",
		Args:  cobra.MinimumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			branches, _, err := customGit.Branches.ListBranches(args[0], nil)
			utils.ReportErr(err)
			for _, b := range branches {
				m := utils.ExpandMapToString(utils.StructToMap(b))
				s := os.Expand(utils.MangoPrintTemplate(Branch{}), func(k string) string {
					return m[k]
				})
				log.Print(s)
			}
		},
	}
}
