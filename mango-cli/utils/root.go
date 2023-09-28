package utils

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"reflect"

	// "gopkg.in/yaml.v2"
)

type Config struct {
	Token    string `yaml:"token"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
	BaseUrl  string `yaml:"baseUrl"`
}

func ReportErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func CheckType(args ...interface{}) {
	var argType string = reflect.TypeOf(args[0]).Kind().String()
	var argName string = "unknown variable name"

	if len(args) > 1 && args[1] != nil {
		argName = args[1].(string)
	}

	switch argType {
		case "int":
			if args[0] == 0 {
				ReportErr(errors.New(argName + ": type is int but it is 0"))
			}
		case "string":
			if (args[0] == "") {
				ReportErr(errors.New(argName + ": type is string but it is empty"))
			}
		default:
			return
	}
}

// func PathExists(path string) bool {
// 	_, err := os.Stat(path)
// 	if err == nil {
// 		return true
// 	}
// 	if os.IsNotExist(err) {
// 		return false
// 	}
// 	return false
// }

// func ReadLocalConfig() *Config {
// 	wd, e := os.Getwd()
// 	if e != nil {
// 		log.Fatal(e)
// 	}
	
// 	if !PathExists("./config.yaml") {
// 		log.Fatal("The config.yaml does not exist, plz add it to the root directory of the project which executing the Mango CLI.")
// 	}

// 	yamlFile := readFile(filepath.Join(wd, "./config.yaml"))
// 	var config *Config
// 	// unmarshal(in []byte, out interface{})
// 	err := yaml.Unmarshal(yamlFile, &config)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	return config
// }

// ConvertArrayToStr 拼接字符串数组 []string 返回单一 string
func ConvertArrayToStr(arr []string) string {
	merged := ""
	for i := 0; i < len(arr); i++ {
		merged += arr[i]
	}
	return merged
}

func ReadFile(path string) []byte {
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

// func StructToMap(obj interface{}) map[string]interface{} {
// 	result := make(map[string]interface{})

// 	objValue := reflect.ValueOf(obj)
// 	objType := objValue.Type()

// 	for i := 0; i < objValue.NumField(); i++ {
// 		field := objType.Field(i)
// 		fieldValue := objValue.Field(i)

// 		result[field.Name] = fieldValue.Interface()
// 	}

// 	return result
// }

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
