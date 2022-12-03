package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Show the version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("mango/gitlab-cli 0.0.1")
	},
}
