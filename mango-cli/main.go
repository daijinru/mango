package main

import (
	"fmt"
	cmd "github.com/daijinru/mango/mango-cli/commands"
	"os"
)

func main() {
	if err := cmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
