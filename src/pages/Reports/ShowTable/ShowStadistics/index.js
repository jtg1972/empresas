import React from 'react'
import { useSelector } from 'react-redux'
import { resolvePath } from 'react-router'
import ShowGraph from './ShowGraph'
import './styles.scss'
const mapToState=({reports})=>({
  report:reports.runReportResults.nuevoReporte
})
const ShowStadistics = ({
  stadistics,
  group,
  groupValue
}) => {
  const {report}=useSelector(mapToState)
  const fields=report.queryFields
  const granTotalPercentage=()=>{
    const intro=[]
    const data=[stadistics.elementTotal,stadistics.granTotal-stadistics.elementTotal]
    const labels=["Total del Grupo","Super Total"]
    const graph=<ShowGraph
      style={{padding:"10px"/*fontSize:"14px",height:"100%",width:"auto"*/}} 
          data={data}
          labels={labels}
          label={group}/>
      
    intro.push(<p style={{textAlign:"center"}}>
      <strong style={{fontSize:"14px"}}>Percentage of Grand Total:</strong> <strong style={{fontSize:"15px"}}>{(stadistics.percentage*100).toFixed(2)}% ({stadistics.elementTotal}/{stadistics.granTotal})</strong>
        
      </p>)
    intro.push(<div className="canvas">{graph}</div>)
      return intro
  }
  const printPercentages=()=>{
    let resultado=[]
    console.log("fieldsss",fields)
    resultado.push(<div className="container">{granTotalPercentage()}</div>)
    fields.forEach(f=>{
      let graph=""
      const data=[]
      const labels=[]
      const label=f.displayName
      let nameVarGrandTotal="granTotal"
      let nameVarSubTotal="subTotal"
      let nameVarPercentage="percentage"
      if(f.declaredType=="number"){
        const intro=[]
        nameVarGrandTotal+=f.fieldName
        nameVarSubTotal+=f.fieldName
        nameVarPercentage+=f.fieldName
        data.push(stadistics[nameVarSubTotal])
        data.push(stadistics[nameVarGrandTotal]-stadistics[nameVarSubTotal])
        labels.push(f.displayName)
        labels.push("Others")
        graph=<ShowGraph
      style={{padding:"10px"/*fontSize:"14px",height:"100%",width:"auto"*/}} 
          data={data}
          labels={labels}
          label={label}/>
        console.log("vars",nameVarGrandTotal,nameVarSubTotal,nameVarPercentage)
        intro.push(<p style={{textAlign:"center"}}><span><strong style={{fontSize:"14px"}}>{f.displayName}</strong>: <strong style={{fontSize:"15px"}}>{stadistics[nameVarPercentage].toFixed(2)}% ({stadistics[nameVarSubTotal]}/{stadistics[nameVarGrandTotal]}) </strong></span></p>)
        intro.push(<div className="canvas">{graph}</div>)
        resultado.push(<div className="container">{intro}</div>)
      }else if(f.dataType=="multipleValue"){
          let g=[]
          const intro=[]
          f.values.forEach(x=>{
            nameVarGrandTotal+=f.fieldName
            nameVarGrandTotal+=x.value
            nameVarSubTotal+=f.fieldName
            nameVarSubTotal+=x.value
            nameVarPercentage+=f.fieldName
            nameVarPercentage+=x.value
            //console.log("vars",nameVarGrandTotal,nameVarSubTotal,nameVarPercentage)
            data.push(stadistics[nameVarSubTotal])
            
            labels.push(x.name)
            graph=<ShowGraph 
              data={data}
              labels={labels}
              label={label}
              /*style={{fontSize:"14px",height:"100%",width:"auto"}}*/ />
         
            intro.push(<p style={{textAlign:"center"}}><span><strong style={{fontSize:"14px"}}>{f.displayName} of {x.name}</strong>: <strong style={{fontSize:"15px"}}>{(stadistics[nameVarPercentage]*100).toFixed(2)}% ({stadistics[nameVarSubTotal]}/{stadistics[nameVarGrandTotal]})</strong> </span></p>)
            
            nameVarGrandTotal="granTotal"
            nameVarSubTotal="subTotal"
            nameVarPercentage="percentage"
    
          })
          intro.push(<div className="canvas">{graph}</div>)


          resultado.push(<div className="container">{intro}</div>)
      }

    }
    )
    //console.log("resultado",resultado)
    return <div style={{
      display:"grid",
      
      gridTemplateColumns:"1fr 1fr 1fr",
      gridAutoRows:"max-content"
    }}>{resultado}</div>
  }

  return (
    <div style={{backgroundColor:"white",
    color:"black",
    padding:"5px",
    marginBottom:"10px"
    }}>
      {/*<span>{granTotalPercentage()}</span>*/}
      {printPercentages()}
    </div>
  )
}

export default ShowStadistics
