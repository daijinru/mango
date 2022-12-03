package cmd

import (
	"github.com/spf13/cobra"
)

var (
	rootCmd = &cobra.Command{
		Use:   "gitlab-ci",
		Short: "a cli for gitlab",
		RunE: func(cmd *cobra.Command, args []string) error {
			return nil
		},
	}
)

func Execute() error {
	return rootCmd.Execute()
}

func init() {
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(NewCmdConfig())
	rootCmd.AddCommand(NewCmdPipelines())
	rootCmd.AddCommand(NewCmdPipeline())
	rootCmd.AddCommand(NewCmdProjects())
	rootCmd.AddCommand(NewCmdProject())
	rootCmd.AddCommand(NewCmdCommits())
}
