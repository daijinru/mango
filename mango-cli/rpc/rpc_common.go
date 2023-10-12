package rpc

type STATUS int8
const (
  OK STATUS = 1
  AlreadyRunning STATUS = 6
  FailedCreate STATUS = 9
  FailedReading STATUS = 2
  FailedExit STATUS = 3
  FailedQuery STATUS = 5
)

type PipelineInfo struct {
  Tag string
  Running bool
  Content string
}
type PipReply struct {
  Status int8
  Message string
  Data PipelineInfo
}
type CreatePipArgs struct {
  Tag string
  Path string
}
type QueryPipArgs struct {
  Tag string
  DateTime string
  Path string
  Filename string
}
type PipsPagination struct {
  Total int
  Filenames []string
  Tag string
}
type PipListReply struct {
  Status int8
  Message string
  Data PipsPagination
}
