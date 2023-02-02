import { useEffect, useState } from "react";
import {loader} from './loader.js';
import { useProjectId } from "../hooks/project.js";

export function ProjectsColumnHead() {
    const data = ['ID', 'Name', 'Description', 'WebURL'];
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
  const [pid, setPid] = useProjectId()
  function gotoPipelines(k) {
    console.info(list, k)
  }
  useEffect(() => {
    mango.api.request({url: '/api/v1/user/projects'}).then(res => {
      const data = [];
      res.forEach(d => {
        data.push(mango.utils.dataCharsToObj(d));
      });
      setList(data);
      setLoading(false);
    }).catch(error => {
      console.error(error)
    })
  })
  const {data, render: projectsColumnRender} = ProjectsColumnHead();
  return {
    render: () => {
      return (
        loading ?  loader() :
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
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={gotoPipelines.bind(this, k)}
                    >Pipelines</button>
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