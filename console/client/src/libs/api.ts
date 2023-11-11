import runner, { HttpMethod } from './runner'
import { Project, RequestArgs } from './runner.types'

export function listProjects() {
  return runner.HttpUtils.get<RequestArgs, Project[]>({
    method: HttpMethod.GET,
    url: '/v1/project/all',
  })
}
