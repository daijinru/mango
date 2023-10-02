package runner

import (
	"bufio"
	"errors"
	"fmt"

	// "fmt"
	"os/exec"
	"strings"

	"github.com/daijinru/mango/mango-cli/utils"
)

type Execution struct {
  // text will be printed line by line
  PrintLine bool
}

func (ex *Execution) RunCommand(command string, args ...string) (string, error) {
  // fmt.Println(command, args[0])
  cmd := exec.Command(command, args...)

  stdout, err := cmd.StdoutPipe()
  utils.ReportErr(err, "unable to create execution pipe: %s")

  if err := cmd.Start(); err != nil {
    utils.ReportErr(err, "unable to start execution: %s")
  }

  scanner := bufio.NewScanner(stdout)
  var output string
  for scanner.Scan() {
    text := scanner.Text()
    output += text + "\n"
    if ex.PrintLine {
      fmt.Println(text)
    }
  }

  if err:= cmd.Wait(); err != nil {
    utils.ReportErr(errors.New(command + " " + utils.ConvertArrayToStr(args)), "unable to exeute: %s")
  }

  return output, err
}

func (ex *Execution)RunCommandSplit(in string) (string, error) {
  arr := strings.Split(in, " ")
  output, err := ex.RunCommand(arr[0], arr[1:]...)
  utils.ReportErr(err)
  return output, err
}