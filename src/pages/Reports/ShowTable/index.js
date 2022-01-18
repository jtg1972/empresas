import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ShowDataTable from './ShowDataTable';
import ShowStadistics from './ShowStadistics';

const mapToState=({reports})=>({
  headers:reports.runReportResults.headers,
  data:reports.runReportResults.data,
  stats:reports.runReportResults.stats,
  report:reports.runReportResults.nuevoReporte

})


const ShowTable = () => {

  const{headers,data,stats,report}=useSelector(mapToState);
  const [headerIndex,setHeaderIndex]=useState(0)
  const [headersPrint,setHeadersPrint]=useState({})
  console.log("headerssss",headers,typeof headers)

  const getStatistics=(i,index,group,groupValue)=>{
    console.log("stadistics",stats[i][index])
    let resultado=[];
    let total=[]
    
    const ms=<ShowStadistics 
      stadistics={stats[i][index]}
      group={group}
      groupValue={groupValue}
    />
    Object.keys(stats[i][index]).forEach(key=>{
      //console.log("key",key,stats[i][index][key])
      resultado.push(<span>{key}:{stats[i][index][key]}&nbsp;</span>)
    })
    //total.push(<div style={{display:"flex",flexWrap:"wrap"}}>{resultado}</div>)
    total.push(ms)
    return total
  }
  const displayValue=(var1,value,index)=>{
    console.log("var value",var1,value)
    const qg=report.queryGroups.find(q=>{
      return q.fieldName==var1
    })
    console.log("qggg",qg)
    let values={}
    if(qg.declaredType=="number"){
      values=qg.values.find(v=>v.name==value)
      console.log("values",values)
      const resultado=[]  
      return <div style={{
        padding:"5px",
        backgroundColor:"black",
        color:"white",
        height:"auto"

      }}>Subgrupo {qg.displayName}: Greater or equal than {values["value"][0]} and lesser than {values["value"][1]} ({index/2+1})</div>
    }else if(qg.dataType=="multipleValue"){
      let values1=qg.values.find(v=>
        v.value==value)

      return <div
      style={{
        padding:"5px",
        backgroundColor:"black",
        color:"white"

      }}>Subgrupo {qg.displayName}: {values1.name} ({index/2+1})</div>
    }
  }

  const displayTitles=()=>{
    const title=[]
    let printed={}
    Object.keys(headers).forEach((h,i)=>{
      //console.log("h",h)
      const hvar=headers[h]
      //console.log("havar",hvar)
      
      hvar.forEach((c,index)=>{
        if(index%2==0){
          if(printed[c]!==undefined){
            if(printed[c]!==hvar[index+1]){
              //printed={...printed,[c]:hvar[index+1]}
              const stat1=getStatistics(i,index/2,c,hvar[index+1])
              
              title.push(<p>{displayValue(headers[h][index],hvar[index+1],index)}</p>)
              title.push(stat1)
              for(let x=index;x<hvar.length;x++){
                printed[hvar[x]]=undefined
              }
            }
          }else{
            printed={...printed,[c]:hvar[index+1]}
            const stat=getStatistics(i,index/2,c,hvar[index+1])

              title.push(<p>{displayValue(headers[h][index],hvar[index+1],index)}</p>)
              title.push(stat)
          }
        }
      }
      )
      const showData=showRecords(i)
      title.push(showData)
      

      
    })
    return <div style={{height:"auto"}}>{title}</div>
  }
  const showRecords=(i)=>{
    const records=data[i]
    const res=[]
    res.push(<ShowDataTable
      data={records}/>)
    
    return res
  }

  return (
    <div>
      {displayTitles()}
      
    </div>
  )
}
/*if(i%2==0){
          const keys=Object.keys(headersPrint)
          if(headersPrint[tit]!==undefined){
            if(headersPrint[tit]!=headers[headerIndex][i+1]){
              setHeadersPrint(ant=>(
                {...ant,
                [headers[tit]]: headers[headerIndex][i+1]
               }

              ))
              return <p>{headers[headerIndex][i]}: {headers[headerIndex][i+1]}</p>
            }
          }else{
            setHeadersPrint(ant=>(
              {...ant,
              [headers[tit]]: headers[headerIndex][i+1]
             }

            ))
            return <p>{headers[headerIndex][i]}: {headers[headerIndex][i+1]}</p>
          }
        }
      })}*/


export default ShowTable
