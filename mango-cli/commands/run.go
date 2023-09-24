package cmd

import (
	"bufio"
	"os/exec"
	"fmt"
	"github.com/daijinru/mango/mango-cli/utils"
	command "github.com/daijinru/mango-packages-command"
)

func NewCmdRun() *command.Command {
	cmd := &command.Command{
		Use: "run",
		RunE: func(cmd *command.Command, args[] string) error {
			return nil
		},
	}
	cmd.AddCommand(NewCmdRunLs())
	return cmd
}

func NewCmdRunLs() *command.Command {
	return &command.Command{
		Use: "ls",
		RunE: func(cmd *command.Command, args []string) error {
      execCmd := exec.Command("ls", "-a")
      stdout, err := execCmd.StdoutPipe()
      utils.ReportErr(err)

      if err:= execCmd.Start(); err != nil {
        utils.ReportErr(err)
      }

      scanner := bufio.NewScanner(stdout)
      for scanner.Scan() {
        fmt.Println(scanner.Text())
      }

      if err := execCmd.Wait(); err != nil {
        utils.ReportErr(err)
      }
      return nil
		},
  }
}