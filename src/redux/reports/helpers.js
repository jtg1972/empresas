import { findRenderedComponentWithType } from "react-dom/test-utils"

export const getReportResults=(
  productsFromStructure,
  report)=>{
    console.log("REPORTTTT",report)
    //console.log("arggss",productsFromStructure,report)
    const sortResults=productsFromStructure.sort((a,b)=>{
      console.log("ab",a,b)
      console.log("reportttt",report)
      let conds=report.queryGroups.map(key=>{
        //console.log("abkeys",a[key.fieldName],b[key.fieldName])
        //console.log("akybky",a[key.fieldName],b[key.fieldName],a[key.fieldName]>b[key.fieldName])
        if(a[key.fieldName]>b[key.fieldName]){
          return 1
        }
        else if(a[key.fieldName]<b[key.fieldName]){
          return -1
        }
      })
        /*if(payload[key].order=="asc"){
          console.log("akybky",a[key],b[key],a[key]>b[key])
          if(a[key]>b[key]){
            return 1
          }
          else if(a[key]<b[key]){
            return -1
          }
          else{
            return 0
          }
        }  else if(payload[key].order=="desc"){
          if(a[key]<b[key]){
            return 1
          }
          else if(a[key]>b[key]){
            return -1
          }
          else{
            return 0
          }
        }
        else{
          return 0;
        }
  
      })*/
      //console.log("conds",conds)
      let prev=conds[0];
      let respuesta
      let i=0;
      for(i=0;i<conds.length;i++){
          prev=conds[i]
          if(prev!==0){
            respuesta=prev
            break;
          }else{
            respuesta=prev;
          }
      }
      return respuesta
    })

    //console.log("res",sortResults,report.queryGroups)
    const createGroupsObject=createObjectGroup(sortResults,report.queryGroups,0)
    ver={}
    headers={}
    statsFinal={}
    const dr=displayReport(createGroupsObject,"",[])
    const st=getStats(createGroupsObject,[],report.queryFields)
    console.log("resultadofinal",ver,headers,statsFinal)
    //console.log(st)
   return ver
  }

  const createObjectGroup=(db=[],queryGroups=[],i=0)=>{
    let resultado={}
    console.log("entro aquui")
    
    let qg=queryGroups[i]
    if(qg==undefined){
      return db
    }
    let group=qg.fieldName;
    resultado[group]={}
    resultado[group]['data']=db
    console.log("querygrouppp",qg)
    if(qg.declaredType=="number"){
      const ord=ordena(db,group)
      console.log("ord",ord)
      resPrevio={}
      findMenor(ord,group,qg["intervalRange"])
      console.log("groupNum",resPrevio)
      const keys=Object.keys(resPrevio)
      keys.forEach(k=>{
        resultado[group][k]=createObjectGroup(resPrevio[k],queryGroups,i+1)
      })
      //resultado[group]={...resultado[group],...groupNum}

    }else if(qg.dataType="multipleValue"){
      qg.values.forEach(v=>{
        const sg=db.filter(d=>{
          //console.log('dgroup,v.value',d[group],v.value)
          return d[group]==v.value
        })
        resultado[group][v.value]=createObjectGroup(sg,queryGroups,i+1)

      })
        //console.log("sg",sg)
        
        
  
      
     }
    //console.log("resultado",resultado)
    return resultado
  }
  const ordena=(db,group)=>{
    const ordered=db.sort((a,b)=>{
      if(a[group]>b[group])
        return 1
      else 
        return -1
    })
    return ordered
  }
  let resPrevio={}

  const findMenor=(ordered=[],group,range)=>{
    if(ordered.length==0){
      return []
    }else{
    console.log("ordered",ordered,ordered.length,group,ordered[0][group])
    const primero=ordered[0][group]
    const limiteInferior=Math.floor(primero/range)*range
    const limiteSuperior=limiteInferior+range
    const listaGrupo=[]
    let rep=0
    ordered.forEach(o=>{
      console.log("comp",o[group],limiteSuperior,limiteInferior)
      if(o[group]>=limiteInferior && 
        o[group]<limiteSuperior){
          listaGrupo.push(o)
          rep++
          //ordered.shift()
      } 
    })
    console.log("listagroup ordered",listaGrupo,ordered)
    const ord=ordered.slice(rep)
    console.log("ord",ord)
    /*for(let j=0;j<rep;j++){
      ordered.shift();
      console.log("orderedpop",ordered)
    }*/
    const titulo=group+limiteInferior+"tolessthan"+limiteSuperior
    if(listaGrupo.length>0){
      resPrevio={...resPrevio,[titulo]:listaGrupo}
    }
    findMenor(ord,group,range)
    
  }
  }

  const displayReport=(reportResults)=>{
    return getTitle(reportResults,"",[])
    /*
    let resultado={}
    console.log("rr",reportResults)
    let reporte=""
    let i=0
    if(typeof reportResults=='object'){
    
    Object.keys(reportResults).forEach(k=>{
      if(k=="data")
        return
      resultado[i]={}
      resultado[i].title=[]
      resultado[i].data=[]
      
      resultado[i].title.push("<p>"+k+"</p>")
      if(Array.isArray(reportResults[k])){
        
        
        resultado[i].data=reportResults[k].map(q=>
          q
        )
        i++;
      }
        
      else{
          resultado[i]=displayReport(reportResults[k])
      
      }
    })}
    
    else{
      resultado[i].data=reportResults.map(r=>
        r
      )
      i++
      
    }
    return resultado*/
  }

  let ver
  let headers
  let indexResp=-1
  const getTitle=(reportResults,tit,argh)=>{
    console.log("groupResult",reportResults)
    let ti=""
    let h=argh
    console.log("argh",argh)
    if(Array.isArray(reportResults)){
      console.log("tit",tit)
      console.log("reportResults",reportResults)
      console.log("reportResultkey",Object.keys(reportResults))
      //ver={...ver,tit:reportResults}
      //console.log("ver",ver)
      if(reportResults.length>0){
      indexResp++;
      console.log("indexresp",indexResp)
      
      ver={...ver,[indexResp]:reportResults}
      headers={...headers,[indexResp]:argh}
      }

      return {}
    }
    let i=0
    const keys=Object.keys(reportResults)
    let resultado=[]
    
    let j=0;
    let res;
    let subkeys;
    console.log("no es un arreglo")
    
    //for(i=0;i<keys.length;i++){
    keys.forEach((key,i)=>{
      
      ti=tit+keys[i]
      console.log("keypush",key)
      h.push(key)
      console.log("tit keys[i]",tit,keys[i],ti)
      console.log("key,i",key,i)
      const obj=reportResults[key]
      subkeys=Object.keys(reportResults[key])
      console.log("reportresultkeyi,subkeys",reportResults[key],subkeys)
      if(subkeys.length>0){
        subkeys.forEach((sk,j)=>{
          if(sk!=="data"){
            //getStats(reportResults[key]["data"],reportResults[key])
            let j=[...h];
            j.push(sk)
            console.log("j h",j,h)
            let tc=ti+sk
            console.log("subkey j subkey.length",sk,j,subkeys.length)
            console.log("rrkeysubkeyij",reportResults[key][sk])
            return getTitle(reportResults[key][sk],tc,j)
          }
        })
      }
    })
  }
  let statsFinal={}
  let statsIndex=0
  const getStats=(reportResults,statsArg,reporte)=>{
    if(!Array.isArray(reportResults)){//typeof reportResults=="object"){
    
    console.log("reporresult supergrupo grupo",reportResults)
    const keys=Object.keys(reportResults)
    
    let statsArray=statsArg

    keys.map(k=>{
      let piv;
      if(isFinal(reportResults[k])){
        const globalRecords=reportResults[k]["data"]
        let len=globalRecords.length
        console.log("globalResult len ",globalRecords,len )
        const subkeys=Object.keys(reportResults[k])
        let innerRecords
        console.log("subkeys",subkeys)
        if(subkeys.length>1){
          subkeys.forEach(sk=>{
            if(sk!=="data"){
                console.log("no es final")
                piv=[...statsArray]
                piv.push(getStat(globalRecords,reportResults[k][sk],k+": "+sk,reporte))
                console.log("piv",piv)
                
                statsFinal={...statsFinal,[statsIndex]:piv}
                console.log("statsFinal",statsFinal)

                return getStats(reportResults[k][sk],piv,reporte)
              
            }
          })
        }else{
          console.log("statsFinal",statsFinal)
          //statsIndex++;
          piv=[...statsArray]
          getStats(reportResults[k][subkeys[0]],k+": "+subkeys[0],piv,reporte)
        }
      }/*else{
          console.log("rrk",reportResults[k])
          
          
          
        }*/
    })
    }else{
      statsIndex++;
    }
  }

  const isFinal=(arg)=>{
    console.log("argwerqw",arg)
    const keys=Object.keys(arg);
    
    const op=keys.includes("data")
    if(op){
      console.log("finalkhkjh")
      return true
    }else{
      console.log("no final")
      return false
    }
  }
  const getStat=(global,element,titulo,report)=>{
    let globalTotalElements=global.length
    let elementTotal
    let key=""
    console.log("report",report)
    console.log("global element",global,element)
    let stat={}
    if(!Array.isArray(element)){
      key=Object.keys(element)[0]
      stat=getFieldsStadistics(report,global,element[key]["data"])
      elementTotal=element[key]["data"].length
      console.log(titulo,"elements/total %",elementTotal,globalTotalElements,elementTotal/globalTotalElements)
      
      return {
        granTotal:globalTotalElements,
        elementTotal,
        percentage:elementTotal/globalTotalElements,
        ...stat
      }

    }else{
      stat=getFieldsStadistics(report,global,element)
      elementTotal=element.length
      console.log(titulo+" elements/total %",elementTotal,globalTotalElements,elementTotal/globalTotalElements)
      return {
        granTotal:globalTotalElements,
        elementTotal,
        percentage:elementTotal/globalTotalElements,
        ...stat
      }


    }

   
  }

  const getFieldsStadistics=(report,grupo,subgrupo)=>{
    let keys=[]
    let stadistics={}
    report.forEach(r=>{
      
      const name=r["fieldName"]
      const type=r["declaredType"]
      const dataType=r["dataType"]
      if(type=="number"){
        stadistics={
          ...stadistics,
          ...getNumberStadistics(name,grupo,subgrupo)
        }
      }
      if(dataType=="multipleValue"){
        stadistics={
          ...stadistics,
          ...getMultipleValueStadistics(name,r["values"],grupo,subgrupo)
        }
      }
    

    })
    return stadistics

  }

  const getNumberStadistics=(name,grupo,subgrupo)=>{
    console.log("grupo subgrupo",grupo,subgrupo)
    const granTotal=grupo.reduce((acc,val)=>acc+val[name],0)
    const subTotal=subgrupo.reduce((acc,val)=>acc+val[name],0)
    const percentage=subTotal/granTotal
    const suma=subgrupo.reduce((acc,val)=>acc+val[name],0)
    const media=suma/subgrupo.length
    const granTotalTitle="granTotal"+name
    const subTotalTitle="subTotal"+name
    const percentageTitle="percentage"+name
    const mediaTitle="media"+name
    return {[granTotalTitle]:granTotal,[subTotalTitle]:subTotal,
    [percentageTitle]:percentage,
    [mediaTitle]:media}

  }

  const getMultipleValueStadistics=(name,values,grupo,subgrupo)=>{
    let granResponse={}
    const granTotal=subgrupo.length
    console.log("grantotal",granTotal,grupo,subgrupo)
    let subTotal
    console.log("Nameee",name)
    values.forEach(v=>{

      
      console.log("v vvalue",v,v["value"])
      subTotal=subgrupo.reduce((acc,current)=>{
        if(current[name]==v["value"])
          return acc+1
        else  
          return acc
      },0)
      console.log("subtotal",subTotal)
      const granTotalTitle="granTotal"+name+v["value"]
      const subTotalTitle="subTotal"+name+v["value"]
      const percentageTitle="percentage"+name+v["value"]
      const percentage=subTotal/granTotal
      granResponse={
        ...granResponse,
        [granTotalTitle]:granTotal,
        [subTotalTitle]:subTotal,
        [percentageTitle]:percentage}
    })
    return granResponse
  }