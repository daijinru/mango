package cmd

import (
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	localToken string

	rootCmd = &cobra.Command{
		Use:   "mango gitlab cli",
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
	rootCmd.PersistentFlags().StringP("author", "a", "daiijnru", "")
	rootCmd.PersistentFlags().Bool("viper", true, "use Viper for configuration")
	viper.SetDefault("author", "daijinru <jeocat@163.com>")
	viper.SetDefault("license", "MIT")

	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(NewCmdConfig())
	rootCmd.AddCommand(NewCmdPipelines())
	rootCmd.AddCommand(NewCmdPipeline())
	rootCmd.AddCommand(NewCmdProjects())
}
