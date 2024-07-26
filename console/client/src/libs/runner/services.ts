import {get, post} from './runner'
import { Application, ApplicationArgs } from './runner.types'

const getApplicationAll = () => {
    return get<any, Application>({url: '/v1/application/all'})
}

const getApplicationById = (id: number) => {
    return get<any, Application>({url: '/v1/applicaiton/' + id})
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

export const APPLICATION = {
    getAll: getApplicationAll,
    getById: getApplicationById,
    update: updateApplication,
    save: saveApplication,
}

