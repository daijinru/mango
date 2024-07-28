export interface RequestArgs {}
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

export interface Entity {
  id: number
}
export interface Pipeline extends Entity {
  projectId: number
  filename: string
  stages: string
  status: number
  startTime: number
  endTime: number
  createdAt: number
  stdout: string
}

export interface ApplicationArgs extends RequestArgs {
  id: number
  name: string
  gitRepository: string
  gitBranchName: string
  agentHost: string
  artifactRule: string
  user: string
  pwd: string
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
  createdAt: string
  updatedAt: string
}
export interface Agent extends Entity {
  name: string
  agentHost: string
  createdAt: string
  updatedAt: string

  monitor: Record<string, string>
}
