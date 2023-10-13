package runner

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/daijinru/mango/mango-cli/utils"
)

var (
  PID_FILE_NAME = ".pid.lock"
)

type Lock struct {
  Timestamp string
  FilePath string
}

func NewLock(path string) *Lock {
  return &Lock{
    Timestamp: utils.TimeNow(),
    FilePath: filepath.Join(path, "running.lock"),
  }
}

type ReadLockContent struct {
  PID string
  Tag string
  Timestamp string
}
func (lock *Lock) Read() (*ReadLockContent, error) {
  bytes, err := os.ReadFile(lock.FilePath)
  if err != nil {
    return nil, err
  }

  lines := strings.Split(string(bytes), "\n")
  if len(lines) < 2 {
    return nil, fmt.Errorf("warning: os.Pid and pipline.Tag should be content of the running.lock")
  }

  return &ReadLockContent{
    PID: lines[0],
    Tag: lines[1],
    Timestamp: lines[2],
  }, nil
}

func (lock *Lock) Write(tag string) error {
  file, err := os.Create(lock.FilePath)
  if err != nil {
    return err
  }

  defer file.Close()

  pid := os.Getpid()
  _, err = file.WriteString(strconv.Itoa(pid) + "\n")
  if err != nil {
    return err
  }
  _, err = file.WriteString(tag + "\n")
  if err != nil {
    return err
  }
  _, err = file.WriteString(lock.Timestamp)
  if err != nil {
    return err
  }
  
  return nil
}

func (lock *Lock) remove() error {
  err := os.Remove(lock.FilePath)
  if err != nil {
    return err
  }
  return nil
}
