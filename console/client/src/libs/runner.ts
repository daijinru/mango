import { RequestArgs } from "./runner.types";

export enum HttpMethod {
  GET='get',
  POST='post',
  PUT='put',
  DELETE='delete'
}
export type ResponseWrapper<T> = {
  status: number
  message: string
  data: T
}
export enum HttpStatus {
  OK=200,
  BAD=400,
  unAuth=401,
}
export type RequestOption<T extends RequestArgs> = {
  method: HttpMethod
  url: string,
  data: {
    [K in keyof T]: T[K]
  },
}

export const BASE_URL = window.location.protocol + '//' + window.location.host
function get<T extends RequestArgs>(option: RequestOption<T>) {
  option = Object.assign({}, option)
  return new Promise((resolve, reject) => {
    window.fetch(BASE_URL + option.url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.status === HttpStatus.OK) {
          resolve(res.data)
        } else {
          resolve(res.message)
        }
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

export default {
  HttpUtils: {
    get,
  }
}