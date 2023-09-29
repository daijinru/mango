package runner

import (
	"bufio"
	"os/exec"

	"github.com/daijinru/mango/mango-cli/utils"
)

func RunCommand(command string, args ...string) (string, error) {
  cmd := exec.Command(command, args...)

  stdout, err := cmd.StdoutPipe()
  utils.ReportErr(err, "unable to create execution pipe: %s")

  if err := cmd.Start(); err != nil {
    utils.ReportErr(err, "unable to start execution: %s")
  }

  scanner := bufio.NewScanner(stdout)
  var output string
  for scanner.Scan() {
    output += scanner.Text() + "\n"
  }

  if err:= cmd.Wait(); err != nil {
    utils.ReportErr(err, "unable to exeute: %s")
  }

  return output, err
}
