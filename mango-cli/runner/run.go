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
    message := fmt.Sprintf("failed to create execution: %s\n", err)
    ex.Pipeline.AppendLocally(message)
    return "", fmt.Errorf(message)
  }

  if err := cmd.Start(); err != nil {
    message := fmt.Sprintf("failed to start execution: %s\n", err)
    ex.Pipeline.AppendLocally(message)
    return "", fmt.Errorf(message)
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
    message := fmt.Sprintf("[%s] failed to start execution: %s %s", utils.TimeNow(),command, utils.ConvertArrayToStr(args))
    ex.Pipeline.AppendLocally(message + "\n")
    return "", fmt.Errorf(message)
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