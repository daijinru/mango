package runner

import (
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"time"

	"github.com/ttacon/chalk"
)

type Logger struct {
  File *os.File
}

func TimeNow() string {
  return time.Now().Format("01-02-2006 15:04:05")
}

func AddPrefixMsg(msg string) string {
  return "[" + TimeNow() + "] " + msg
}

func NewLogger(path string) (*Logger, error) {
  dir, err := url.JoinPath(path, "/logs/")
  if err != nil {
    return nil, err
  }
  
  err = os.MkdirAll(dir, 0755)
  if err != nil {
    return nil, err
  }

  infoFilePath := filepath.Join(dir, "info.log")
  _, err = os.Stat(infoFilePath)
  if err != nil && os.IsNotExist(err) {
    _, err = os.Create(infoFilePath)
    if err != nil {
      return nil, err
    }
  }

  file, err := os.OpenFile(infoFilePath, os.O_APPEND|os.O_WRONLY, 0644)
  if err != nil {
    return nil, err
  }
  return &Logger{
    File: file,
  }, nil
}

func (l *Logger) Printing(color chalk.Color, input string) {
  fmt.Println(color, input)
  l.Append(input)
}

func (l *Logger) Log(msg string) {
  l.Printing(chalk.Cyan, AddPrefixMsg(msg))
}

func (l *Logger) Warn(msg string) {
  l.Printing(chalk.Yellow, AddPrefixMsg(msg))
}

func (l *Logger) Info(msg string) {
  l.Printing(chalk.Green, AddPrefixMsg(msg))
}

func (l *Logger) Append(input string) error {
  _, err := l.File.WriteString(input + "\n")
  if err != nil {
    return err
  }
  return nil
}

func (l *Logger) Close() error {
  err := l.File.Close()
  if err != nil {
    return err
  }
  return nil
}
