import { useEffect, useState } from "react";
import {loader} from './loader.js';
import useSP, {broadcast} from "../hooks/useSP.js";
import mango from '../mango'
import {PipelinesColumnHead} from './pipelines.js'

export function ProjectsColumnHead() {
    const data = ['ID', 'Name', 'WebURL', 'DefaultBranch'];
    return {
      data,
      render: () => {
        return (
          <thead>
            <tr>
              {data.map((h, k) => (<th key={k} scope="col">{h}</th>))}
              <th>Actions</th>
            </tr>
          </thead>
        )
      }
    }
}

export function ProjectsColumnList() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  
  useSP('projectID', null);
  const isRunningPip = useSP('runningPipeline', false)

  const [runningPip, setRunningPip] = useState([])

  const {data, render: projectsColumnRender} = ProjectsColumnHead()
  const {data: pipColumnHead, render: pipColumnRender} = PipelinesColumnHead()

  useEffect(() => {
    mango.api.request({url: '/api/v1/user/projects'}).then(res => {
      setList(res.map(d => mango.utils.dataCharsToObj(d)));
      setLoading(false);
    }).catch(error => {
      console.error(error)
    })
  }, [])

  const gotoPipelines = async k => {
    broadcast('projectID', list[k].ID);
  }

  const onCreatePipeline = (pid, ref) => {
    broadcast('runningPipeline', true)
    mango.api.request({
      url: '/api/v1/user/pipeline',
      method: 'post',
      body: {
        pid,
        ref,
      }
    }).then(res => {
      const createPipInfo = res.map(d => mango.utils.dataCharsToObj(d))
      if (createPipInfo.length < 1) return
      const pipInfoEle = createPipInfo[0]

      const timer = setInterval(() => {
        mango.api.request({url: `/api/v1/user/${pipInfoEle["ProjectID"]}/pipeline/${pipInfoEle["ID"]}`}).then(res => {
          const runningPipInfo = res.map(d => mango.utils.dataCharsToObj(d))
          setRunningPip(runningPipInfo)
          if (runningPipInfo[0]['Status'] === 'success') {
            clearInterval(timer)
          }
        })
      }, 200)
    })
  }
  return {
    render: () => {
      return (
        loading ? loader() :
        <div>
          <table className="table table-bordered table-hover table-sm">
            <caption>User Projects</caption>
            {projectsColumnRender()}
            <tbody>
              {list.map((v, k) => {
                return (
                  <tr key={k}>
                    {data.map((h, i) => {
                      return (<td key={i} data-key={h}>{
                        h === 'WebURL' ? <a href={v[h]} target="_blank">{v[h]}</a> : v[h]
                      }</td>)
                    })}
                    <td width="300">
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button" className="btn btn-sm btn-info"
                          onClick={onCreatePipeline.bind(this, v['ID'], v['DefaultBranch'])}>Create Pipeline</button>
                        <button type="button" className="btn btn-sm btn-success">WebIDE</button>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={gotoPipelines.bind(this, k)}
                        >Pipelines</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {isRunningPip ?
            <table className="table table-bordered table-hover table-sm">
              <caption>the running pipeline</caption>
              {pipColumnRender()}
              <tbody>
                {runningPip.map((v, k) => {
                  return (
                    <tr key={k}>
                      {pipColumnHead.map((h, i) => {
                        return (<td key={i} data-key={h}>{
                          h === 'Status' ?
                            v[h] !== 'success' ?
                            <div className="spinner-border text-primary" role="status"></div>
                            : <button type="button" className="btn btn-success btn-sm">Success</button>
                          : v[h]
                        }</td>)
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            : <div></div>
          }
        </div>
      )
    }
  }
}