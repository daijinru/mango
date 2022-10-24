package utils

import (
	"bufio"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

// GetLocalToken 从项目根目录 token.local 文件获取 token
func GetLocalToken() []string {
	wd, e := os.Getwd()
	if e != nil {
		log.Fatal(e)
	}

	return readFile(filepath.Join(wd, "./token.local"))
}

// GetLocalUser 从项目根目录 user.local 文件获取用户配置信息
func GetLocalUser() []string {
	wd, e := os.Getwd()
	if e != nil {
		log.Fatal(e)
	}
	return readFile(filepath.Join(wd, "./user.local"))
}

// ConvertArrayToStr 拼接字符串数组 []string 返回单一 string
func ConvertArrayToStr(arr []string) string {
	merged := ""
	for i := 0; i < len(arr); i++ {
		merged += arr[i]
	}
	return merged
}

func readFile(path string) []string {
	file, e := os.OpenFile(filepath.Join(path), os.O_RDONLY, 0)
	if e != nil {
		log.Fatal(e)
	}

	//if err := file.Close(); err != nil {
	//	log.Fatal(err)
	//}
	defer file.Close()

	reader := bufio.NewReader(file)
	res := make([]string, 0, 64)
	for {
		line, _, err := reader.ReadLine()
		if err == io.EOF {
			break
		}
		res = append(res, strings.Trim(string(line), ""))
	}

	return res
}
