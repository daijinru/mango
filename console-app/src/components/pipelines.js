import {loader} from './loader';
import {useState, useEffect} from 'react';
import { getState } from '../hooks/useSP';

function PipelinesColumnHead() {
  const data = ['ID', 'Status', 'Source', 'Ref', 'WebURL'];
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

export function PipelinesColumnList() {
  const [loading, setLoading] = useState(false)
  const {data, render: pipelinesColumnRender} = PipelinesColumnHead();
  const projectID = getState("projectID")
  const [list, setList] = useState([])
  useEffect(() => {
    setLoading(true)
    if (!projectID) return
    mango.api.request({url: `/api/v1/user/${projectID}/pipelines`}).then(res => {
      setList(res.map(d => mango.utils.dataCharsToObj(d)))
      setLoading(false)
    })
  }, [projectID])
  return {
    render() {
      return (
        loading ? loader() :
        <table className="table table-bordered table-hover table-sm">
          <caption>Project Pipelines</caption>
          {pipelinesColumnRender()}
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
                      className="btn btn-sm btn-primary text-nowrap"
                    >
                      nothing now
                    </button>
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