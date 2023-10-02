package runner

func GetStatus() (string, error) {
  exec := &Execution{}
  return exec.RunCommand("git", "status")
}

func GetLog() (string, error) {
  exec := &Execution{}
  return exec.RunCommand("git", "log")
}
