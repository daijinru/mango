package cmd

import (
	"fmt"
	"github.com/daijinru/mango/gitlab-cli/utils"
	"github.com/spf13/cobra"
)

func NewCmdConfig() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "config [flags]",
		Short:   "Initial config",
		Aliases: []string{"conf"},
	}
	cmd.AddCommand(NewCmdConfigGetToken())
	cmd.AddCommand(NewCmdConfigGetUser())
	return cmd
}

func NewCmdConfigGetToken() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "token",
		Short:   "get the value of token local",
		Example: "$ gitlab-cli config token",
		RunE: func(cmd *cobra.Command, args []string) error {
			tokenArr := utils.GetLocalToken()
			fmt.Println(utils.ConvertArrayToStr(tokenArr))
			return nil
		},
	}
	return cmd
}

func NewCmdConfigGetUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "user",
		Short:   "get the value of user local",
		Example: "$ gitlab-cli config user",
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println(utils.GetLocalUser())
			return nil
		},
	}
	return cmd
}
