package runner

import (
  "fmt"
  "os"

  "github.com/daijinru/mango/mango-cli/utils"
)

// It's the working directory client.
type WorkspaceClient struct {
  CWD string `json:"Worksapce"`
  LockFile *LockFile `json:"LockFile"`
}

// Specify a path and use it to initialize current workspace, add CWD to the instance.
func (client *WorkspaceClient) NewWorkSpaceClient(path string) (*WorkspaceClient, error) {
  workspace, err := client.chWorkspace(path)
  client.CWD = workspace
  return client, err
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
  if (err != nil && os.IsNotExist(err)) {
    return false
  }
  return true
}

type LockFile struct {
  Timestamp string
  Name string
  LockFilePath string
}
// Specify an id to initialize the LockFile instance, which is build-in the WorkspaceClient,
// must be executed before using FileLock operations.
func (client *WorkspaceClient) NewLockFile(name string) *WorkspaceClient {
  suffix := ".lock"
  lockFile := &LockFile{
    Name: name,
    Timestamp: utils.TimeNow(),
    LockFilePath: name + suffix,
  }
  client.LockFile = lockFile
  return client
} 

func (client *WorkspaceClient) IfExistsLock() (bool, error) {
  _, err := os.Stat(client.LockFile.LockFilePath)
  if err == nil {
    return true, nil
  } else if os.IsNotExist(err) {
    return false, nil
  } else {
    return false, fmt.Errorf("unable to check file: %v", err)
  }
}

func (client *WorkspaceClient) CreateLockFile() error {
  lockFile := client.LockFile
  if _, err := os.Stat(lockFile.LockFilePath); err == nil {
    return nil
  } else if os.IsNotExist(err) {
    file, err := os.Create(lockFile.LockFilePath)
    if err != nil {
      return fmt.Errorf("failed to create file: %v", err)
    }
    defer file.Close()
    return nil
  } else {
    return fmt.Errorf("unable to check file: %v", err)
  }
}

func (client *WorkspaceClient) DeleteLockFile() error {
  lockFile := client.LockFile
  if _, err := os.Stat(lockFile.LockFilePath); err == nil {
    err := os.Remove(lockFile.LockFilePath)
    if err != nil {
      return fmt.Errorf("lock file cannot be deleted: %v", err)
    }
  }
  return nil
}

var (
  PID_FILE_NAME = ".pid.lock"
)
