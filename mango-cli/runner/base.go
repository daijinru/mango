package runner

func GetStatus() (string, error) {
	return RunCommand("git", "status")
}

func GetLog() (string, error) {
	return RunCommand("git", "log")
}
