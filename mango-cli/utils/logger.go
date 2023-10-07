package utils

import (
  "fmt"
  "log"
  "os"
  "github.com/ttacon/chalk"
)

type Logger struct {
  Writer *Writer
}

func (l *Logger) Printing(color chalk.Color, input string) {
  fmt.Println(color, input)
  if (l.Writer != nil) {
    _, err := l.Writer.Append(input)
    if err != nil {
      fmt.Println(err)
    }
  }
}

func AddPrefixMsg(msg string) string {
  return "[" + TimeNow() + "] " + msg
}

func (l *Logger) ReportLog(msg string) {
  l.Printing(chalk.Cyan, AddPrefixMsg(msg))
}

func (l *Logger) ReportWarn(msg string) {
  l.Printing(chalk.Yellow, AddPrefixMsg(msg))
}

func (l *Logger) ReportSuccess(msg string) {
  l.Printing(chalk.Green, AddPrefixMsg(msg))
}

// TODO add to Logger struct
// Accepts a diff number of params,
// prints the error when only one error type passing.
// the second param is required to be a char carrying the %s placeholder.
func ReportErr(args ...interface{}) {
  if args[0] == nil {
    return
  }

  if len(args) < 2 {
    if value, ok := args[0].(error); ok {
      log.Println(chalk.Red, value)
    }
    return
  }

  var msg string
  var err interface{}
  if (len(args) > 1) {
    for _, arg := range args {
      if value, ok := arg.(string); ok {
        msg = value
      }
      if value, ok := arg.(error); ok {
        err = value
      }
    }

    if err == nil {
      return
    }
    fmt.Printf(msg, chalk.Red, err)
    // log.Fatal(chalk.Red, fmt.Errorf(msg, err))
  }
}

type Writer struct {
  FilePath string
  File *os.File
}

type WriterOption struct {
  FilePath string
}

func (w *Writer) NewWriter(option WriterOption) (*Writer, error) {
  file, err := os.OpenFile(option.FilePath, os.O_APPEND|os.O_CREATE, 0644)
  if err != nil {
    return nil, fmt.Errorf("unable to create file: %v", err) 
  }
  w.FilePath = option.FilePath
  w.File = file
  return w, nil
}

func (w *Writer) Append(input string) (bool, error) {
  file, err := os.OpenFile(w.FilePath, os.O_APPEND|os.O_WRONLY, 0644)
  if err != nil {
    return false, fmt.Errorf("unable to open file: %v", err)
  }

  _, err = file.WriteString(input + "\n")
  if err != nil {
    return false, fmt.Errorf("unable write content to the file: %v", err)
  }
  return true, nil
}

func (w *Writer) Close() error {
  err := w.File.Close()
  if err != nil {
    return fmt.Errorf("unable close the file: %v", err)
  }
  return nil
}
