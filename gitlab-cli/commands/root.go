package cmd

import (
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	cfgFile    string
	localToken string

	rootCmd = &cobra.Command{
		Use:   "mango gitlab cli",
		Short: "a cli for gitlab",
		RunE: func(cmd *cobra.Command, args []string) error {
			return nil
		},
	}
)

// Execute executes the root command.
func Execute() error {
	return rootCmd.Execute()
}

func init() {
	localToken = utils.ReadLocalConfig().Token

	//rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.cobra.yaml)")
	rootCmd.PersistentFlags().StringP("author", "a", "daiijnru", "")
	rootCmd.PersistentFlags().Bool("viper", true, "use Viper for configuration")
	//viper.BindPFlag("author", rootCmd.PersistentFlags().Lookup("author"))
	//viper.BindPFlag("useViper", rootCmd.PersistentFlags().Lookup("viper"))
	viper.SetDefault("author", "daijinru <jeocat@163.com>")
	viper.SetDefault("license", "MIT")

	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(NewCmdConfig())
	rootCmd.AddCommand(NewCmdPipelines())
	rootCmd.AddCommand(NewCmdProjects())
}
