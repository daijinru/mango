package mangoctl

import (
	"fmt"
	"mangoctl/lib"
	"os"
)

func main() {
	if err := lib.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
