package runner

import (
	"bufio"
	"fmt"
	"os/exec"
	"strings"

	"github.com/daijinru/mango/mango-cli/utils"
	"github.com/ttacon/chalk"
)

type Execution struct {
  // text will be printed line by line
  PrintLine bool
  Pipeline *Pipeline
}

func (ex *Execution) RunCommand(command string, args ...string) (string, error) {
  // fmt.Println(command, args[0])
  cmd := exec.Command(command, args...)
  combine := command + " " + utils.ConvertArrayToStr(args)

  stdoutPipe, err := cmd.StdoutPipe()
  if err != nil {
    message := fmt.Sprintf("failed to create execution: %s\n", err)
    ex.Pipeline.WriteError(err, combine)
    return "", fmt.Errorf(message)
  }

  if err := cmd.Start(); err != nil {
    message := fmt.Sprintf("failed to start execution: %s\n", err)
    ex.Pipeline.WriteError(err, combine)
    // ex.Pipeline.AppendInfoLocally(message)
    return "", fmt.Errorf(message)
  }

  scanner := bufio.NewScanner(stdoutPipe)
  var output string
  for scanner.Scan() {
    text := scanner.Text()
    output = text + "\n"
    if ex.Pipeline != nil {
      ex.Pipeline.WriteInfo(output)
    }
    if ex.PrintLine {
      msg := fmt.Sprintf("[%s] %s", utils.TimeNow(), text)
      fmt.Println(chalk.White, msg)
    }
  }

  if err:= cmd.Wait(); err != nil {
    message := fmt.Sprintf("error occured from: %s", combine)
    ex.Pipeline.WriteInfo(message + "\n")
    ex.Pipeline.WriteError(err, combine)
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