import React from 'react'
import { useSelector } from 'react-redux'
import { resolvePath } from 'react-router'
import ShowGraph from './ShowGraph'
import './styles.scss'
const mapToState=({reports})=>({
  report:reports.runReportResults.nuevoReporte,
  headers:reports.runReportResults.headers,
  stats:reports.runReportResults.stats,
  dat1:reports.runReportResults.data
})
const ShowStadistics = ({
  stadistics,
  group,
  groupValue,
  i,
  index,
  arr,
}) => {
  
  const {dat1,report,headers,stats}=useSelector(mapToState)
  const fields=report.queryFields
  console.log("statssss",stats)
  
  const getHeaderNums=()=>{
    //let a=[]
    let conts=[]
    const ret={}
    Object.keys(headers).forEach((h1,ih)=>{
      //a.push({position:ih,index:arr.length-1})
      for(let p=0;p<arr.length;p+=2){
        
        if(p+1==arr.length-1){
          if(!conts.includes(headers[h1][p+1])){
            //a.push({position:ih,index:(arr.length/2)-1})
            //console.log("ih arrlenmenouno",ih,(arr.length/2)-1)
            //console.log("respr",stats[ih][(arr.length/2)-1]["elementTotal"])
            conts.push(headers[h1][p+1])
            ret[headers[h1][p+1]]=stats[ih][(arr.length/2)-1]["elementTotal"]
          }
          //console.log("conts headh1pmasuno",conts,headers[h1][p+1])


        }else{
          //console.log("conts headh1pmasuno",conts,headers[h1][p+1])
          if(headers[h1][p+1]!==arr[p+1]){
            //conts=[]
            break;
          }
        }
      }
      //console.log("a",a)
      //console.log() 
      //return a 
      
      
        
      
    })
    console.log("ret",ret)
    return ret
  }
  const getTotalesNums=(fieldName)=>{
    let conts=[]
    const ret={}
    Object.keys(headers).forEach((h1,ih)=>{
      //a.push({position:ih,index:arr.length-1})
      for(let p=0;p<arr.length;p+=2){
        
        if(p+1==arr.length-1){
          if(!conts.includes(headers[h1][p+1])){
            //a.push({position:ih,index:(arr.length/2)-1})
            //console.log("ih arrlenmenouno",ih,(arr.length/2)-1)
            //console.log("respr",stats[ih][(arr.length/2)-1]["elementTotal"])
            conts.push(headers[h1][p+1])
            const nombre="subTotal"+fieldName
            ret[headers[h1][p+1]]=stats[ih][(arr.length/2)-1][nombre]
          }
          //console.log("conts headh1pmasuno",conts,headers[h1][p+1])


        }else{
          //console.log("conts headh1pmasuno",conts,headers[h1][p+1])
          if(headers[h1][p+1]!==arr[p+1]){
            //conts=[]
            break;
          }
        }
      }
      //console.log("a",a)
      //console.log() 
      //return a 
      
      
        
      
    })
    console.log("ret",ret)
    return ret
  }

  const getLabelsGrandTotal=(object)=>{
    const titulos=[]
    Object.keys(object).forEach(obj=>{
      console.log("QGR",report["queryGroups"],group)
      console.log("obj",obj)
      const so=report["queryGroups"].find(x=>{
        
        return x.fieldName==group
      })
      let v1={}  
      if(so.declaredType!="number"){
        v1=so.values.find(s=>s.value==obj)
      }else{
        v1=so.values.find(s=>s.name==obj)
      }

      console.log("so v1",so,v1)
      if(so.declaredType=="number"){
        titulos.push(v1.value[0]+" <= x < "+v1.value[1])
      }else{
        titulos.push(v1.name)
      }
      
    })
    return titulos
  }

  const granTotalPercentage=()=>{
    const intro=[]
    if(Object.keys(headers).length>0){
    let graph=null
    const ghn=getHeaderNums();
    if(Object.keys(ghn).length>0){
    let d=[]
    for(let key in ghn){
      d.push(ghn[key])
    }
    let l=[]
    for(let key in ghn){
      l.push(key)
    }
    //const data=[stadistics.elementTotal,stadistics.granTotal-stadistics.elementTotal]
    const data=d
    //const labels=["Total del Grupo","Super Total"]
    const labels=getLabelsGrandTotal(ghn)
    graph=<ShowGraph
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
  }
    
  }

  const printGrandTotalNumericsFieldsNoGroups=()=>{
    let statApart=[]
    if(Object.keys(headers)==0){
      statApart.push(<p style={{margin:"5px",marginRight:"15px"}}>
        <strong style={{fontSize:"14px"}}>Total of Elements:</strong> <strong style={{fontSize:"15px"}}>{dat1.length}</strong>
          
        </p>)
      
      fields.forEach(f=>{
        if(f.declaredType=="number"){
            const piv="subTotal"+f.fieldName
            statApart.push(<p style={{margin:"5px",marginRight:"15px"}}>Total of {f.displayName}: {stats[piv]}</p>)
          
          
        }
      })
    }
    return statApart
  }
  const printPercentages=()=>{
    let resultado=[]
    console.log("arr1111",arr)
    //console.log("fieldsss",fields)
    if(Object.keys(headers).length>0){
      resultado.push(<div className="container">{granTotalPercentage()}</div>)
    }
      fields.forEach(f=>{
      let graph=""
      const data=[]
      let labels=[]
      const label=f.displayName
      let nameVarGrandTotal="granTotal"
      let nameVarSubTotal="subTotal"
      let nameVarPercentage="percentage"
      if(f.declaredType=="number"){
        if(Object.keys(headers).length>0){
        const intro=[]
        const gTN=getTotalesNums(f.fieldName)
        console.log("arrnumber",arr)
        nameVarGrandTotal+=f.fieldName
        nameVarSubTotal+=f.fieldName
        nameVarPercentage+=f.fieldName
        Object.keys(gTN).forEach(g=>{
          data.push(gTN[g])
          
        })
        labels=getLabelsGrandTotal(gTN)

        //data.push(stadistics[nameVarSubTotal])
        //data.push(stadistics[nameVarGrandTotal]-stadistics[nameVarSubTotal])
        //labels.push(f.displayName)
        //labels.push("Others")
        graph=<ShowGraph
      style={{padding:"10px"/*fontSize:"14px",height:"100%",width:"auto"*/}} 
          data={data}
          labels={labels}
          label={label}/>
        //console.log("vars",nameVarGrandTotal,nameVarSubTotal,nameVarPercentage)
        const mediaName="media"+f["fieldName"]
        intro.push(<p style={{textAlign:"center"}}><span><strong style={{fontSize:"14px"}}>{f.displayName}</strong>: <strong style={{fontSize:"15px"}}>{stadistics[nameVarPercentage].toFixed(2)}% ({stadistics[nameVarSubTotal]}/{stadistics[nameVarGrandTotal]}) </strong></span></p>)
        intro.push(<p style={{textAlign:"center"}}><strong>Media: {stadistics[mediaName].toFixed(2)}</strong></p>)

        intro.push(<div className="canvas">{graph}</div>)
        resultado.push(<div className="container">{intro}</div>)
        }
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
    return(<div>
      <div style={{
        display:"grid",
        
        gridTemplateColumns:"1fr 1fr 1fr",
        gridAutoRows:"max-content"
      }}>
        {resultado}
      </div>
      {printGrandTotalNumericsFieldsNoGroups()}
    </div>)
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
