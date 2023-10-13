package runner

import (
	"os"
	"path/filepath"
)

// It's the working directory client.
type Workspace struct {
  CWD string `json:"Worksapce"`
}

// Specify a path and use it to initialize current workspace, add CWD to the instance.
func NewWorkSpace(path string) (*Workspace, error) {
  homeDir, err := os.UserHomeDir()
  if err != nil {
    return nil, err
  }
  absPath := filepath.Join(homeDir, path)

  wd, err := chWorkspace(filepath.Join(absPath, ".mango"))
  if err != nil {
    return nil, err
  }
  return &Workspace{
    CWD: wd,
  }, nil
}

func chWorkspace(path string) (string, error) {
  err := os.Chdir(path)
  if err != nil {
    return "", err
  }

  err = PathExists(path)
  if err != nil {
    return "", err
  }

  wd, err := os.Getwd()
  if err != nil {
    return "", err
  }

  return wd, nil
}

func PathExists(path string) error {
  _, err := os.Stat(path)
  if err != nil && os.IsNotExist(err) {
    return err
  }
  return nil
}

// func (client *WorkspaceClient) ListDirectories(path string) ([]string, error) {
//   var directories []string

//   files, err := os.ReadDir(path)
//   if err != nil {
//     return nil, err
//   }

//   for _, file := range files {
//     if file.IsDir() {
//       directories = append(directories, file.Name())
//     }
//   }

//   return directories, nil
// }

// func (client *WorkspaceClient) LsFiles(path string) ([]string, error) {
//   var out []string

//   files, err := os.ReadDir(path)
//   if err != nil {
//     return nil, err
//   }

//   for _, file := range files {
//       out = append(out, file.Name())
//   }

//   return out, err
// }
