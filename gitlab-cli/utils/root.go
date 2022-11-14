package utils

import (
	"bufio"
	"gopkg.in/yaml.v2"
	"io"
	"log"
	"os"
	"path/filepath"
)

type Config struct {
	Token    string `yaml:"token"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

func ReportErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func ReadLocalConfig() *Config {
	wd, e := os.Getwd()
	if e != nil {
		log.Fatal(e)
	}

	yamlFile := readFile(filepath.Join(wd, "./config.yaml"))
	var config *Config
	// unmarshal(in []byte, out interface{})
	err := yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		log.Fatal(err)
	}
	return config
}

// ConvertArrayToStr 拼接字符串数组 []string 返回单一 string
func ConvertArrayToStr(arr []string) string {
	merged := ""
	for i := 0; i < len(arr); i++ {
		merged += arr[i]
	}
	return merged
}

func readFile(path string) []byte {
	file, e := os.OpenFile(filepath.Join(path), os.O_RDONLY, 0)
	if e != nil {
		log.Fatal(e)
	}

	defer file.Close()

	reader := bufio.NewReader(file)
	var res []byte
	for {
		line, err := reader.ReadByte()
		if err == io.EOF {
			break
		}
		res = append(res, line)
	}
	return res
}
