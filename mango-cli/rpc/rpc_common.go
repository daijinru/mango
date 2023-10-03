package rpc

type STATUS int8
const (
  OK STATUS = 1
  AlreadyRunning STATUS = 6
  FailedCreate STATUS = 9
  FailedReading STATUS = 2
  FailedExit STATUS = 3
)
