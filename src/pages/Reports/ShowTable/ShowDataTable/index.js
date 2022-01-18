import React from 'react'
import { useSelector } from 'react-redux'

const mapToState=({reports})=>({
  report:reports.runReportResults.nuevoReporte
})

const ShowDataTable = ({data}) => {
  const {report}=useSelector(mapToState)
  const {queryFields}=report
  return (
    <table>
      <tr>
        {queryFields.map(f=>{
          return <th>{f.displayName}</th>
        })}
      </tr>
    {data.map(pfs=>
      (
      <tr>
        {queryFields.map(c=>
          <td>{pfs[c.fieldName]}</td>)
        }
        
      </tr>)
    
    )}
    </table>
  )
}

export default ShowDataTable
