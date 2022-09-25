package cmd

import (
	"github.com/MakeNowJust/heredoc"
	"github.com/spf13/cobra"
)

func NewCmdLogin() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "login",
		Args:  cobra.ExactArgs(0),
		Short: "Authenticate with a GitLab instance",
		Long: heredoc.Docf(`
			Authenticate with a GitLab instance.
			You can pass in a token on standard input by using %[1]s--stdin%[1]s.
			The minimum required scopes for the token are: "api", "write_repository".
		`, "`"),
		Example: heredoc.Doc(`
			# start interactive setup
			$ glab auth login
			# authenticate against gitlab.com by reading the token from a file
			$ glab auth login --stdin < myaccesstoken.txt
			# authenticate with a self-hosted GitLab instance
			$ glab auth login --hostname salsa.debian.org
		`),
	}

	return cmd
}
