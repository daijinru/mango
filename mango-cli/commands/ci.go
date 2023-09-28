package cmd

import (
	"fmt"

	command "github.com/daijinru/mango-packages-command"
	"github.com/daijinru/mango/mango-cli/runner"
	"github.com/daijinru/mango/mango-cli/utils"
)

func NewCmdCI() *command.Command {
	root := &command.Command{
		Use: "ci",
		RunE: func(cmd *command.Command, args []string) error {
			return nil
		},
	}
  root.AddCommand(NewCmdGetConfig())
	return root
}

func NewCmdGetConfig() *command.Command {
	return &command.Command{
		Use: "get",
		RunE: func(cmd *command.Command, args []string) error {
      var ci = &runner.CiConfig{}
      ci.NewCI()
      _, err := ci.ReadFromYaml(args[0])
      utils.ReportErr(err)
      // TODO print fields of ci config
      fmt.Println("Version: ", ci.Version)
      for stage := ci.Stages.Front(); stage != nil; stage = stage.Next() {
        fmt.Println(stage.Value)
      }
      return nil
		},
	}
}