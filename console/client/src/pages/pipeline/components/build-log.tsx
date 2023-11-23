import React from "react"
import { useLocation } from "react-router-dom"
import qs from 'query-string'
import runner from "../../../libs/runner"
import { useLoader } from "../../../components/Loader/Loader"
import { Pipeline, PipelineArgs } from "../../../libs/runner.types"

export default () => {
  const location = useLocation()
  const queries = qs.parse(location.search)
  const [Loader, setLoaderOpen] = useLoader()
  const getPipelineStdout = async () => {
    setLoaderOpen(true)
    const id = queries.id as string
    const pid = queries.pid as string
    const pipelineResp = await runner.HttpUtils.get<any, Pipeline>({
      url: '/v1/pipeline/' + id
    })
    const filename = pipelineResp.data.filename;
    setLoaderOpen(false)
    stdoutPolling(pid, filename)
  }

  const stdoutPolling = async (pid: string, filename: string) => {
    setTimeout(async () => {
      const stdout = await runner.HttpUtils.post<PipelineArgs, any>({
        url: '/v1/pipeline/stdout',
        data: {
          pid,
          filename: filename,
        }
      })
      const stdoutWrapper = document.getElementById('Pipeline_Stdout')
      if (stdoutWrapper) {
        stdoutWrapper.innerHTML = stdout.data.message
        if ((stdout.data.message as string).includes('🥭 running completed!')) {
          return
        } else {
          stdoutPolling(pid, filename)
        }
      }
    }, 100)
  }

  React.useEffect(() => {
    getPipelineStdout()
  }, [])
  return (
    <>
      <Loader />
      <div>
        <pre id="Pipeline_Stdout"></pre>
      </div>
    </>
  )
}
