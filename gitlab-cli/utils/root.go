package utils

import (
	"bufio"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func GetLocalToken() []string {
	wd, e := os.Getwd()
	if e != nil {
		log.Fatal(e)
	}

	return readFile(filepath.Join(wd, "./token.local"))
}

func GetLocalUser() []string {
	wd, e := os.Getwd()
	if e != nil {
		log.Fatal(e)
	}
	return readFile(filepath.Join(wd, "./user.local"))
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
