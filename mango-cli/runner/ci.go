package runner

import (
	"container/list"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"syscall"
	"time"

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
  Logger *utils.Logger
  Pipeline *Pipeline
}

type CiOption struct {
  // Local directory path, absolute or relative
  Path string
  LockName string
  LogName string
  Tag string
}

// Initialize a CI instance.
func (ci *CiClient) NewCI(option *CiOption) (*CiClient, error) {
  ci.Version = ""
  ci.StagesMap = make(map[string]*list.Element)
  ci.Stages = list.New()

  workspace := &WorkspaceClient{}
  workspace.NewWorkSpaceClient(option.Path)
  ci.Workspace = workspace

  writer := &utils.Writer{}
  logFileDir, err := url.JoinPath(workspace.CWD, "./meta-inf/logs/")
  if err != nil {
    return nil, fmt.Errorf("failed to join path for LogFileDir: %s", logFileDir)
  }
  err = os.MkdirAll(logFileDir, 0755)
  if err != nil {
    return nil, fmt.Errorf("faled to make directory: %s", logFileDir)
  }
  logFilePath, err := url.JoinPath(logFileDir, "ci.info.log")
  if err == nil {
    writerOption := &utils.WriterOption{
      FilePath: logFilePath,
    }
    writer.NewWriter(*writerOption)
    ci.Logger = &utils.Logger{
      Writer: writer,
    }
  }

  if option.LockName != "" {
    workspace.NewLockFile(option.LockName)
    ci.LockName = option.LockName
  }

  var Pipeline_Tag string = option.Tag
  if option.Tag == "" {
    Pipeline_Tag = utils.GenerateUUIDFileName()
  }
  Pipeline_Path, err := url.JoinPath(workspace.CWD, "./meta-inf/pipelines/")
  if err != nil {
    return ci, err
  }
  ci.Pipeline, err = NewPipeline(Pipeline_Tag, Pipeline_Path)
  return ci, err
}

type Pipeline struct {
  Tag string
  FilePath string
  Filename string
  File *os.File
  Directory string
}

func NewPipeline(tag, path string) (*Pipeline, error) {
  err := os.MkdirAll(path, 0755)
  if err != nil {
    return nil, err
  }
  now := time.Now().Format("20060102_150405")
  filename := fmt.Sprintf("%s_%s", tag, now)
  filePath := filepath.Join(path, filename + ".txt")

  return &Pipeline{
    Tag: tag,
    FilePath: filePath,
    Filename: filename,
    Directory: path,
  }, nil
}

func (pip *Pipeline) IfLogFileExists() (*os.File, error) {
  _, err := os.Stat(pip.FilePath)
  if err != nil && os.IsNotExist(err) {
    _, err := os.Create(pip.FilePath)
    if err != nil {
      return nil, err
    }
  }

  if pip.File == nil {
    pip.File, err = os.OpenFile(pip.FilePath, os.O_APPEND|os.O_WRONLY, 0644)
    if err != nil {
      return nil, err
    }
  }
  return pip.File, nil
}

func (pip *Pipeline) AppendInfoLocally(text string) error {
  file, err := pip.IfLogFileExists()
  if err != nil {
    return err
  }

  _, err = file.WriteString(fmt.Sprintf("[%s] %s", utils.TimeNow(), text))

  return err
}

func (pip *Pipeline) AppendErrorLocally(cause error, command string) error {
  file, err := pip.IfLogFileExists()
  if err != nil {
    return err
  }

  errorMsg := fmt.Sprintf("[Failed] [Tag:%s] [Filename:%s] [Error:%s] [occured:%s]", pip.Tag, pip.Filename, cause.Error(), command)
  _, err = file.WriteString(errorMsg)

  return err
}

func (pip *Pipeline) Close() error {
  if pip.File != nil {
    err := pip.File.Close()
    return err
  }
  return nil
}

func (pip *Pipeline) List() ([]string, error) {
  files, err := os.ReadDir(pip.Directory)
  if err != nil {
    return nil, err
  }
  
  filenames := make([]string, 0)
  for _, file := range files {
    if file.IsDir() {
      continue
    }
    filenames = append(filenames, file.Name())
  }
	sort.Slice(filenames, func(i, j int) bool {
		file1 := filepath.Join(pip.Directory, filenames[i])
		file2 := filepath.Join(pip.Directory, filenames[j])
		info1, _ := os.Stat(file1)
		info2, _ := os.Stat(file2)
		return info1.ModTime().Before(info2.ModTime())
	})

  filteredFilenames := make([]string, 0)
  for _, filename := range filenames {
    if strings.Contains(filename, pip.Tag) {
      filteredFilenames = append(filteredFilenames, filename)
    }
  }
  return filteredFilenames, nil
}

// Only one process is allowed at a time, a directory.
// Checking if lock file exists, if not, return false,
// if it exists, read PID from the lock file, and return rue if the process(from PID) is present.
func (ci *CiClient) AreRunningLocally() (bool, error) {
  existed, err := ci.Workspace.IfExistsLock()
  if existed {
    bytes, err := os.ReadFile(ci.Workspace.LockFile.LockFilePath)
    if err != nil {
      return false, err
    }
    pid, err := strconv.Atoi(string(bytes))
    if err != nil {
      return false, err
    }
    process, err := os.FindProcess(pid)
    if err != nil {
      return false, fmt.Errorf("failed to inspect to process: %v", err)
    }

    err = process.Signal(syscall.Signal(0))
    if err == nil {
      return true, nil
    }

    err = ci.CompletedRunningTask()
    if err != nil {
      return false, err
    }
    return false, nil
  }
  
  if err != nil {
    return false, err
  }
  
  return false, nil
}

func (ci *CiClient) CreateRunningLocally() (bool, error) {
  success, err := ci.Workspace.CreateLockFile()
  if success {
    pid := os.Getpid()
    err := os.WriteFile(ci.Workspace.LockFile.LockFilePath, []byte(strconv.Itoa(pid)), 0644)
    if err != nil {
      return false, err
    }
    return true, err
  }
  return false, err
}

func (ci *CiClient) CompletedRunningTask() error {
  err := ci.Workspace.DeleteLockFile()
  return err
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
  if err != nil {
    return false, fmt.Errorf("error from yaml.Unmarshal: %s", err)
  }
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
        // fmt.Println(item)
        for key, value := range item {
          switch key {
          case "stage":
            if stage, ok := value.(string); ok {
              job := &Job{}
              job.Stage = stage
              elem := ci.StagesMap[stage]
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
  return true, nil
}
