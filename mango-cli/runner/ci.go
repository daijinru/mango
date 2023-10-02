package runner

import (
  "container/list"
  "fmt"
  "path/filepath"
  "os"
  "github.com/daijinru/mango/mango-cli/utils"
  "gopkg.in/yaml.v3"
)

// To defined several work objects in each CI profile to call actual tasks.
type Job struct {
  Stage string `yaml:"Stage"`
  Scripts []interface{} `yaml:"Scripts"`
}

// The collections of CI methods, plz call NewCI() for initialization.
type CiClient struct {
  Version string `yaml:"Version"`
  StagesMap map[string]*list.Element
  Stages *list.List  `yaml:"Stages"`
  Jobs []*Job `yaml:"Jobs"`
  // Directory for working currently
  Workspace *WorkspaceClient
  LockName string
}

type CiOption struct {
  // Local directory path, absolute or relative
  Path string
  LockName string
}

// Initialize a CI instance.
func (ci *CiClient) NewCI(option *CiOption) *CiClient {
  ci.Version = ""
  ci.StagesMap = make(map[string]*list.Element)
  ci.Stages = list.New()

  workspace := &WorkspaceClient{}
  workspace.NewWorkSpaceClient(option.Path)
  ci.Workspace = workspace

  if option.LockName != "" {
    workspace.NewLockFile(option.LockName)
    ci.LockName = option.LockName
  }

  return ci
}

// Only one process is allowed at a time in A physical machine,
// because the CI instance usually performs build or release tasks,
// and some cases of modifying files.
func (ci *CiClient) AreRunningLocally() (bool, error) {
  running, err := ci.Workspace.IfExistsLock()
  return running, err
}

func (ci *CiClient) CreateRunningLocally() (bool, error) {
  success, err := ci.Workspace.CreateLockFile()
  return success, err
}

func (ci *CiClient) CompletedRunningTask() (bool, error) {
  if err := ci.Workspace.DeleteLockFile(); err == nil {
    return true, err
  } else {
    return false, err
  }
}

type YAML_Config struct {
  Data map[string]interface{} `yaml:",inline"`
}

// It is the entry that read CI profile from diff versions of YAML.
func (ci *CiClient) ReadFromYaml() (bool, error) {
  var YAML_NAME = "./meta-inf/.mango-ci.yaml"

  if !ci.Workspace.PathExists(YAML_NAME) {
    return false, fmt.Errorf("file not exists: %s", YAML_NAME)
  }

  ciPath := filepath.Join(ci.Workspace.CWD, YAML_NAME)
  ciData, err := os.ReadFile(ciPath)
  if err != nil {
    return false, fmt.Errorf("error from os.ReadFile: %s", err)
  }

  var config YAML_Config
  err = yaml.Unmarshal(ciData, &config)
  utils.ReportErr(err, "yaml unmarshal: %s")
  ok, err := readFromYamlVersion_1(ci, config.Data)
  if ok {
    return ok, nil
  }
  return false, fmt.Errorf("read from yaml: %s", err)
}

func readFromYamlVersion_1 (ci *CiClient,  data map[string]interface{}) (bool, error) {
  for key, value := range data {
    switch key {
    case "Version":
      if version, ok := value.(string); ok {
        ci.Version = version
      }
    case "Stages":
      if stages, ok := value.([]interface{}); ok {
        for _, stage := range stages {
          if name, ok := stage.(string); ok {
            job := &Job{}
            job.Stage = name
            elem := ci.Stages.PushBack(job)
            ci.StagesMap[name] = elem
          }
        }
      }
    }
  }
  for key, value := range data {
    switch key {
    case "Version":
    case "Stages":
    default:
      if item, ok := value.(map[string]interface{}); ok {
        for key, value := range item {
          switch key {
          case "Stage":
            if stage, ok := value.(string); ok {
              job := &Job{}
              job.Stage = stage
              elem := ci.StagesMap[stage]
              for key, value := range item {
                switch key {
                case "Scripts":
                  if scripts, ok := value.([]interface{}); ok {
                    job.Scripts = scripts
                    elem.Value = job
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return true, nil
}
