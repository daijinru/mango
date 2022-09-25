package cmd

import "github.com/spf13/cobra"

func NewCmdConfig() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "config [flags]",
		Short:   "Initial config",
		Aliases: []string{"conf"},
	}
	cmd.AddCommand(NewCmdConfigGet())
	return cmd
}

func NewCmdConfigGet() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "get <key>",
		Short:   "get the value of configuration key",
		Example: "$ gitlab-cli config get token",
		Args:    cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {

			return nil
		},
	}
	return cmd
}
