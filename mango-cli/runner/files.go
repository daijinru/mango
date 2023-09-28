package runner

import (
	"fmt"
	"os"

	"github.com/daijinru/mango/mango-cli/utils"
)

// It's the working directory client.
type WorkspaceClient struct {
	Workspace string `json:"Worksapce"`
  Projects []string `json:"Projects"`
}

func (client *WorkspaceClient) ChWorkspace(path string) (string, error) {
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
	workspace, err := client.ChWorkspace(path)
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
	utils.ReportErr(err)
	if (err != nil && os.IsNotExist(err)) {
		return false
	}
	return true
}
