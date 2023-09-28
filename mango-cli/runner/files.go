package runner

import (
	"fmt"
	"os"

	"github.com/daijinru/mango/mango-cli/utils"
)

type WorkSpaceClient struct {
	Workspace string `json:"Worksapce"`
	Directories []string `json:"Directories"`
}

func (ws *WorkSpaceClient) NewWorkSpaceClient(path string) *WorkSpaceClient {
	var out = &WorkSpaceClient{}

	useWorkspace, err := worksapce(path)
	utils.ReportErr(err)
	out.Workspace = path

	if (!useWorkspace) {
		return out
	}
	directories, err := listDirectories(path)
	utils.ReportErr(err)
	out.Directories = directories

	return out
}

func listDirectories(path string) ([]string, error) {
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

func worksapce(path string) (bool, error) {
	err := os.Chdir(path)
	if err != nil {
		return false, err
	}
	
	_, err = os.Stat(path)
	if (os.IsNotExist(err)) {
		return false, fmt.Errorf("path not exist: %s", path)
	}

	_, err = os.Getwd()
	if err != nil {
		return false, fmt.Errorf("no access: %s", path)
	}

	return true, nil
}


