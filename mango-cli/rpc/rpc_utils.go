package rpc

import "github.com/daijinru/mango/mango-cli/runner"

type STATUS int8
const (
  OK STATUS = 1
  AlreadyRunning STATUS = 6
  FailedCreate STATUS = 9
  FailedReading STATUS = 2
)

func AddPrefixMsg(msg string) string {
  return "🥭[" + runner.TimeNow() + "] " + msg
}