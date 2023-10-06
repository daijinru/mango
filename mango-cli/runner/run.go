package runner

import (
	"bufio"
	"fmt"
	"os/exec"
	"strings"

	"github.com/daijinru/mango/mango-cli/utils"
)

type Execution struct {
  // text will be printed line by line
  PrintLine bool
  Pipeline *Pipeline
}

func (ex *Execution) RunCommand(command string, args ...string) (string, error) {
  // fmt.Println(command, args[0])
  cmd := exec.Command(command, args...)

  stdout, err := cmd.StdoutPipe()
  if err != nil {
    return "", fmt.Errorf("unable create execution: %s", err)
  }

  if err := cmd.Start(); err != nil {
    return "", fmt.Errorf("unable start execution: %s", err)
  }

  scanner := bufio.NewScanner(stdout)
  var output string
  for scanner.Scan() {
    text := scanner.Text()
    output += text + "\n"
    if ex.Pipeline != nil {
      ex.Pipeline.AppendLocally(fmt.Sprintf("[%s] %s", utils.TimeNow(), output))
    }
    if ex.PrintLine {
      fmt.Printf("[%s] %s\n", utils.TimeNow(), text)
    }
  }

  if err:= cmd.Wait(); err != nil {
    return "", fmt.Errorf("unable execute: %s %s", command, utils.ConvertArrayToStr(args))
  }

  return output, err
}

func (ex *Execution) RunCommandSplit(in string) (string, error) {
  arr := strings.Split(in, " ")
  output, err := ex.RunCommand(arr[0], arr[1:]...)
  if err != nil {
    return "", err
  }
  return output, err
}