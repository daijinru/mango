package git

import "github.com/daijinru/mango/mango-cli/run"

func GetStatus() (string, error) {
	return run.RunCommand("git", "status")
}

func GetLog() (string, error) {
	return run.RunCommand("git", "log")
}
