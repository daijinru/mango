package runner

import (
	"fmt"
	"os"
	"time"

	"github.com/daijinru/mango/mango-cli/utils"
)

// It's the working directory client.
type WorkspaceClient struct {
  Workspace string `json:"Worksapce"`
  Projects []string `json:"Projects"`
}

func (client *WorkspaceClient) chWorkspace(path string) (string, error) {
  err := os.Chdir(path)
  if err != nil {
    return "", err
  }

  if (!client.PathExists(path)) {
    return "", fmt.Errorf("path not exist: %s", path)
  }

  dir, err := os.Getwd()
  if err != nil {
    return "", fmt.Errorf("no access: %s", path)
  }

  return dir, nil
}

func (client *WorkspaceClient) NewWorkSpaceClient(path string) (*WorkspaceClient, error) {
  workspace, err := client.chWorkspace(path)
  utils.ReportErr(err)
  client.Workspace = workspace
  return client, err
}

func (client *WorkspaceClient) ListDirectories(path string) ([]string, error) {
  var directories []string

  files, err := os.ReadDir(path)
  if err != nil {
    return nil, err
  }

  for _, file := range files {
    if file.IsDir() {
      directories = append(directories, file.Name())
    }
  }

  return directories, nil
}

func (client *WorkspaceClient) LsFiles(path string) ([]string, error) {
  var out []string

  files, err := os.ReadDir(path)
  if err != nil {
    return nil, err
  }

  for _, file := range files {
      out = append(out, file.Name())
  }

  return out, err
}

func (client *WorkspaceClient) PathExists(path string) bool {
  _, err := os.Stat(path)
  utils.ReportErr(err, "path not exists: %s")
  if (err != nil && os.IsNotExist(err)) {
    return false
  }
  return true
}

type LockFile struct {
  Timestamp string
  Name string
  Exists bool
}

func (client *WorkspaceClient) IfExistsLock(name string) (bool, error) {
  lockFilePath := name + ".lock" 
  _, err := os.Stat(lockFilePath)
  if err == nil {
    return true, nil
  } else if os.IsNotExist(err) {
    return false, nil
  } else {
    return false, fmt.Errorf("unable to check file: %v", err)
  }
}

func (client *WorkspaceClient) CreateLockFile(name string) (*LockFile, error) {
  lockFile := &LockFile{
    Name: name,
    Timestamp: TimeNow(),
    Exists: true,
  }
  lockFilePath := lockFile.Name + ".lock"
  if _, err := os.Stat(lockFilePath); err == nil {
    return lockFile, nil
  } else if os.IsNotExist(err) {
    file, err := os.Create(lockFilePath)
    if err != nil {
      return nil, fmt.Errorf("failed to create file: %v", err)
    }
    defer file.Close()
    return lockFile, nil
  } else {
    return nil, fmt.Errorf("unable to check file: %v", err)
  }
}

func (fileLock *LockFile) DeleteLockFile() error {
  lockFilePath := fileLock.Name + ".lock"
  if _, err := os.Stat(lockFilePath); err == nil {
    err := os.Remove(lockFilePath)
    if err != nil {
      return fmt.Errorf("lock file cannot be deleted: %v", err)
    }
  }
  fileLock.Exists = false
  return nil
}

func TimeNow() string {
  return time.Now().Format("01-02-2006 15:04:05")
}


