export interface RequestArgs {}
export interface PipelineArgs extends RequestArgs {
  pid: number | string
  filename?: string
}
export interface ProjectArgs extends RequestArgs {
  name: string
  path: string
  agentId: number;
}
export interface AgentArgs extends RequestArgs {
  baseUrl: string
  token?: string
}

export interface Entity {}
export interface Pipeline extends Entity {
  id?: number
  projectId: number
  filename: string
  stages: string
  status: number
  startTime: number
  endTime: number
  createdAt: number
  stdout: string
}
export interface Project extends Entity {
  id?: number
  name: string
  path: string
  createdAt: string
  updatedAt: string
  agentId: number;
}
export interface Agent extends Entity {
  id?: number
  baseUrl: string
  token?: string
  createdAt: string
}
