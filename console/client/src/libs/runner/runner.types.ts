export interface RequestArgs {
  id?: number
}
export interface PipelineArgs extends RequestArgs {
  pid: number | string
  filename?: string
}
export interface ProjectArgs extends RequestArgs {
  name: string
  path: string
  agentId: string;
}
export interface AgentArgs extends RequestArgs {
  name: string
  agentHost: string
}
export interface TaskArgs extends RequestArgs {
  name: string
  command: string
  sourceType?: string
}
export interface ApplicationArgs extends RequestArgs {
  name: string
  gitRepository: string
  gitBranchName: string
  agentHost: string
  artifactRule: string
  user: string
  pwd: string
}

export interface Entity {
  id: number
  createdAt: number
  updatedAt: string
}
export interface Pipeline extends Entity {
  projectId: number
  filename: string
  stages: string
  status: number
  startTime: number
  endTime: number
  stdout: string
}
export interface Application extends Entity {
  name: string
  gitRepository: string
  gitBranchName: string
  agentHost: string
  artifactRule: string
  artifactVersion: string
  user: string
  pwd: string
}
export interface Agent extends Entity {
  name: string
  agentHost: string
  monitor: Record<string, string>
}
export interface Task extends Entity {
  name: string
  command: string
  sourceType: string
}
