package main

import (
	"fmt"
	command "github.com/daijinru/mango-packages-command"
	chalk_ "github.com/ttacon/chalk"
)

func Lime(in string) {
	lime := chalk_.Green.NewStyle().
		WithBackground(chalk_.Black).
		WithTextStyle(chalk_.Bold).
		Style
	fmt.Println(lime(in))
}

func main() {
	rootCommand := &command.Command{
		Use: "docker cli",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}

	rootCommand.AddCommand(NewCmdImages())
	rootCommand.Execute()
}
