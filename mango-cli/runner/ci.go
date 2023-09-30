package runner

import (
	"container/list"
	"path/filepath"

	"github.com/daijinru/mango/mango-cli/utils"
	"gopkg.in/yaml.v3"
)

// To defined several work objects in each CI profile to call actual tasks.
type Job struct {
  Stage string `yaml:"Stage"`
  Scripts []interface{} `yaml:"Scripts"`
}

// The collections of CI methods, plz call NewCI() for initialization.
type CiConfig struct {
	Version string `yaml:"Version"`

  StagesMap map[string]*list.Element
  Stages *list.List  `yaml:"Stages"`

  Jobs []*Job `yaml:"Jobs"`
}

func (ci *CiConfig) NewCI() *CiConfig {
  ci.Version = ""
  ci.StagesMap = make(map[string]*list.Element)
  ci.Stages = list.New()
  return ci
}

// It is the entry that read CI profile from diff versions of YAML.
func (ci *CiConfig) ReadFromYaml(path string) (*CiConfig, error) {
  var YAML_NAME = "./meta-inf/.mango-ci.yaml"

  var client = &WorkspaceClient{}
  client.NewWorkSpaceClient(path)
  if !client.PathExists(YAML_NAME) {
    return nil, nil
  }
  ciPath := filepath.Join(client.Workspace, YAML_NAME)
  ciFile := utils.ReadFile(ciPath)

  var data map[string]interface{}
  err := yaml.Unmarshal(ciFile, &data)
  utils.ReportErr(err, "yaml unmarshal: %s")

  return readFromYamlVersion_1(ci, data)
}

func readFromYamlVersion_1 (ci *CiConfig,  data map[string]interface{}) (*CiConfig, error) {
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
            ci.StagesMap[job.Stage] = elem
          }
        }
      }
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
  return ci, nil
}


