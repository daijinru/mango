import {get, post} from './runner'
import {AgentArgs, Application, ApplicationArgs, Agent, TaskArgs, Task} from './runner.types'

const getApplicationAll = () => {
    return get<any, Application[]>({url: '/v1/application/all'})
}

const getApplicationById = (id: number) => {
    return get<{id: number}, Application>(
      {
          url: '/v1/application/' + id
      }
    )
}

const updateApplication = (args: ApplicationArgs) => {
    return post<ApplicationArgs, Application>({
        url: '/v1/application/update',
        data: args,
    })
}

const saveApplication = (args: ApplicationArgs) => {
    return post<ApplicationArgs, Application>({
        url: "/v1/application/save",
        data: args,
    })
}

const deleteApplication = (id: number) => {
    return get<any, number>({
        url: `/v1/application/${id}/delete`,
    })
}

export const APPLICATION = {
    getAll: getApplicationAll,
    getById: getApplicationById,
    update: updateApplication,
    save: saveApplication,
    deleteById: deleteApplication,
}

const saveAgent = (args: AgentArgs) => {
    return post<AgentArgs, Agent>({
        url: '/v1/agent/save',
        data: args,
    })
}

const getAgentById = (id: number) => {
    return get<{id: number}, Agent>({
        url: `/v1/agent/${id}`
    })
}

const getAgentAll = () => {
    return get<any, Agent[]>({
        url: '/v1/agent/all',
    })
}

const getAgentMonitor = (id: number) => {
    return get<{id: number}, any>({
        url: `/v1/agent/${id}/monitor`
    })
}

const deleteAgent = (id: number) => {
    return get<any, number>({
        url: `/v1/agent/${id}/delete`
    })
}

export const AGENT = {
    save: saveAgent,
    getById: getAgentById,
    getAll: getAgentAll,
    getMonitor: getAgentMonitor,
    deleteById: deleteAgent,
}

const saveTask = (args: TaskArgs) => {
    return post<TaskArgs, Task>({
        url: '/v1/task/save',
        data: args,
    })
}

const updateTask = (args: TaskArgs) => {
    return post<TaskArgs, Task>({
        url: '/v1/task/update',
        data: args,
    })
}

const getTaskById = (id: number) => {
    return get<{id: number}, Task>({
        url: `/v1/task/${id}`,
    })
}

export const TASK = {
    save: saveTask,
    update: updateTask,
    getById: getTaskById,
}

