export interface RequestArgs {
  id?: number
}

export interface PipelineArgs extends RequestArgs {
  applicationId: number
  tasks: TaskArgs[]
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
  createdAt: string
  updatedAt: string
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
export interface Pipeline extends Entity {
  commands: string
  status: number
  applicationId: number
  artifactId: number
  startTime: string
  endTime: string
  stdout: string
  filename: string
}
