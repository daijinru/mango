package utils

import (
	"bufio"
	"fmt"
	"gopkg.in/yaml.v2"
	"io"
	"log"
	"os"
	"path/filepath"
	"reflect"
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

func StructToMap(m interface{}) map[string]interface{} {
	out := map[string]interface{}{}
	if m == nil {
		return out
	}
	typ := reflect.TypeOf(m)
	value := reflect.ValueOf(m)
	value = reflect.Indirect(value)
	if typ.Kind() == reflect.Pointer {
		// tips: it equivalent to *Ptr. @2022/11/29
		typ = typ.Elem()
	}
	for i := 0; i < typ.NumField(); i++ {
		tag := typ.Field(i).Tag.Get("json")
		// todo: It panics if the Value was obtained by accessing unexported struct fields. "official note"
		field := value.Field(i).Interface()
		if tag != "" && tag != "-" {
			if value.Field(i).Type().Kind() == reflect.Struct {
				out[tag] = StructToMap(field)
			} else {
				out[tag] = field
			}
		}
	}
	return out
}

func ExpandMapToString(m map[string]interface{}) map[string]string {
	out := make(map[string]string)
	for k, v := range m {
		out[k] = fmt.Sprintf("%v", v)
	}
	return out
}
