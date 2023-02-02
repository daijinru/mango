import { useEffect, useState } from "react";
import {loader} from './loader.js';
import useSP, {broadcast} from "../hooks/useSP.js";
import mango from '../mango'

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
  const {data, render: projectsColumnRender} = ProjectsColumnHead();
  const [,] = useSP('projectID', null);

  const gotoPipelines = async k => {
    broadcast('projectID', list[k].ID);
  }
  useEffect(() => {
    mango.api.request({url: '/api/v1/user/projects'}).then(res => {
      setList(res.map(d => mango.utils.dataCharsToObj(d)));
      setLoading(false);
    }).catch(error => {
      console.error(error)
    })
  }, [])

  const onCreatePipeline = () => {
    
  }
  return {
    render: () => {
      return (
        loading ? loader() :
        <table className="table table-bordered table-hover table-sm">
          <caption>User Projects</caption>
          {projectsColumnRender()}
          <tbody>
            {list.map((v, k) => {
              return (
                <tr key={k}>
                  {data.map((h, i) => {
                    return (<td key={i} data-key={h}>{v[h]}</td>)
                  })}
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        type="button" className="btn btn-sm btn-info"
                        onClick={onCreatePipeline.bind(this)}>Create Pipeline</button>
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

      )
    }
  }
}