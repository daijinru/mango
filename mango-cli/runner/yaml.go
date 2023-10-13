package runner

import (
	"container/list"
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

// To defined several work objects in each CI profile to call actual tasks.
type Job struct {
  Stage string `yaml:"Stage"`
  Scripts []interface{} `yaml:"Scripts"`
}

type YamlReader struct {
  Version string
  StagesMap map[string]*list.Element
  Stages *list.List
  Jobs []*Job
  File []byte

  FilePath string
}

func NewYamlReader(path string) (*YamlReader, error) {
  return &YamlReader{
    StagesMap: make(map[string]*list.Element),
    Stages: list.New(),
    FilePath: filepath.Join(path, "mango-ci.yaml"),
  }, nil
}

func (YR *YamlReader) Read() error {
  filePath := YR.FilePath
  _, err := os.Stat(filePath)
  if err != nil && os.IsNotExist(err) {
    return fmt.Errorf("the yaml file not exists: %s", err)
  }

  bytes, err := os.ReadFile(filePath)
  if err != nil {
    return fmt.Errorf("failed to read yaml file: %s", err)
  }

  var config map[string]interface{}
  err = yaml.Unmarshal(bytes, &config)
  if err != nil {
    return err
  }

  for key, value := range config {
    switch key {
    case "Version":
      if version, ok := value.(string); ok {
        YR.Version = version
      }
    case "Stages":
      if stages, ok := value.([]interface{}); ok {
        for _, stage := range stages {
          if name, ok := stage.(string); ok {
            job := &Job{}
            job.Stage = name
            elem := YR.Stages.PushBack(job)
            YR.StagesMap[name] = elem
          }
        }
      }
    }
  }
  for key, value := range config {
    switch key {
    case "Version":
    case "Stages":
    default:
      if item, ok := value.(map[string]interface{}); ok {
        // fmt.Println(item)
        for key, value := range item {
          switch key {
          case "stage":
            if stage, ok := value.(string); ok {
              job := &Job{}
              job.Stage = stage
              elem := YR.StagesMap[stage]
              for key, value := range item {
                switch key {
                case "scripts":
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
  return nil
}
