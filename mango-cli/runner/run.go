package runner

import (
	"bufio"
	"os/exec"

	"github.com/daijinru/mango/mango-cli/utils"
)

func RunCommand(command string, args ...string) (string, error) {
  cmd := exec.Command(command, args...)
  stdout, err := cmd.StdoutPipe()
  utils.ReportErr(err)

  if err := cmd.Start(); err != nil {
    utils.ReportErr(err)
  }

  scanner := bufio.NewScanner(stdout)
  var output string
  for scanner.Scan() {
    output += scanner.Text() + "\n"
    // fmt.Println(scanner.Text())
  }

  if err:= cmd.Wait(); err != nil {
    utils.ReportErr(err)
  }

  return output, err
}
