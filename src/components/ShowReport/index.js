import React from 'react'
import { useSelector } from 'react-redux'
import structure from '../../data/structure'

const mapToState=({reports})=>({
  structureReport:reports.report,
  reportResults:reports.runReportResults
})

const ShowReport = () => {
  const {
    structureReport,
    reportResults
  }=useSelector(mapToState)

  

  return (
    <div>
  
    </div>
  )


}

export default ShowReport
