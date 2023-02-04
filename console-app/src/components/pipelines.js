import {loader} from './loader';
import {useState, useEffect} from 'react';
import useSP from '../hooks/useSP';
import mango from '../mango'

export function PipelinesColumnHead() {
  const data = ['ID', 'ProjectID', 'Status', 'Source', 'Ref', 'WebURL'];
  return {
    data,
    render: () => {
      return (
        <thead>
          <tr>
            {data.map((h, k) => (<th key={k} scope="col">{h}</th>))}
          </tr>
        </thead>
      )
    }
  }
}

export function PipelinesColumnList() {
  const [loading, setLoading] = useState(false)
  const {data, render: pipelinesColumnRender} = PipelinesColumnHead();
  const projectID = useSP('projectID', null)
  // const projectID = getState("projectID")
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
      )
    }
  }
}
