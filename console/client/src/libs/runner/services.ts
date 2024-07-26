import {get, post} from './runner'
import {AgentArgs, Application, ApplicationArgs, Agent} from './runner.types'

const getApplicationAll = () => {
    return get<any, Application[]>({url: '/v1/application/all'})
}

const getApplicationById = (id: number) => {
    return get<number, Application>({url: '/v1/application/' + id})
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
    return get<number, Agent>({
        url: `/v1/agent/${id}`
    })
}

export const AGENT = {
    save: saveAgent,
    getById: getAgentById,
}

