import { message } from "antd";
import { RequestArgs } from "./runner.types";
import { Entity } from "./runner.types";

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
  method?: HttpMethod
  url: string,
  data?: { 
    [K in keyof T]: T[K]
  },
}

export type DataDefault = { message: string, status: string }
export const BASE_URL = window.location.protocol + '//' + window.location.host
function get<T extends RequestArgs, K/** response.data */>(option: RequestOption<T>): Promise<ResponseWrapper<K>> {
  option = Object.assign({}, option)
  return new Promise((resolve, reject) => {
    window.fetch(BASE_URL + option.url)
      .then(res => res.json())
      .then((res: ResponseWrapper<K>) => {
        if (!res.status) {
          message.warning('no status from the response: status, data, message')
          return null
        }
        if ((res.data as DataDefault).status === 'fail') {
          message.warning((res.data as DataDefault).message)
        }
        if (res.status === HttpStatus.OK) {
          resolve(res)
        }
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}
function post<T extends RequestArgs, K/** response.data */>(option: RequestOption<T>): Promise<ResponseWrapper<K>> {
  option = Object.assign({}, option)
  return new Promise((resolve, reject) => {
    window.fetch(
      BASE_URL + option.url,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(option.data),
      },
    )
    .then(res => res.json())
    .then((res: ResponseWrapper<K>) => {
      if (!res.status) {
        message.warning('no status from the response: status, data, message')
        return null
      }
      if ((res.data as DataDefault).status === 'fail') {
        message.warning((res.data as DataDefault).message)
      }
      if (res.status === HttpStatus.OK) {
        resolve(res)
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
    post
  }
}