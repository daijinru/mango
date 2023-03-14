package lib

import (
	command "github.com/daijinru/mango-packages-command"
)

var (
	rootCmd = &command.Command{
		Use: "mangoctl",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
)

func Execute() error {
	return rootCmd.ExecuteC()
}

func init() {

}
