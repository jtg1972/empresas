import { createContext } from "react"

export const addMultCat=(payload)=>{
  console.log("def",payload)
  const resultado=payload.data.map(st=>{
    
    if(st.category!=payload.category){
      return st
    
    }else{
      const newFields=st.fields.map(fd=>{
        if(fd.fieldName!=payload.multipleField){
          return fd;
        }else{
          return {...fd,values:[...fd.values,{
            name:payload.value.name,
            value:payload.value.value
          }]}
        }        
        

      })
      return {...st,fields:newFields}
    }

  })
  console.log("resultado",resultado);
  return resultado;
  
}

export const addFieldCat=(payload)=>{
  const resultado=payload.data.map(cat=>{
    if(cat.category!=payload.category){
      return cat
    }else{
      let fields={...payload.value}
      if(payload.value.dataType=="multipleValue"){
        fields={...fields,values:[]}
      }
      cat.fields.push(fields)
      return cat;
    }
  }) 
  console.log("resultado",resultado)
  return resultado; 
}

export const removeFieldCategory=(payload)=>{
  console.log("paydev",payload);
  const resultado=payload.data.map((cat)=>{
    if(cat.category!=payload.category){
      return cat
    }else{
      
      const nuevoFields=cat.fields.filter(f=>{
        console.log("fieldName, fn",payload.fieldName,f.fieldName)
        return f.fieldName!=payload.fieldName
      })
      
      return {...cat,fields:nuevoFields}
    }
  })
  console.log("resultado",resultado);
  return resultado;
}

export const createStructureEmpty=payload=>{
  const exists=payload.data.find(cat=>
    cat.category==payload.category)
  console.log("exists",exists);
  if(exists){
    return payload.data
  }else{
    payload.data.push({
      category:payload.category,
      fields:[]
    })
    return payload.data
  }
}

export const getFormFields=(payload)=>{
  const fields=payload.data.filter(cat=>payload.categories.includes(cat.category))
  return fields
}

export const editProduct=(products,payload)=>{
  const newProducts=products.map(p=>{
    if(p.id!=payload.id){
      return p
    }else{
      return payload
    }
  })
  return newProducts
}

export const getAllProductsFromCategoryDown=(products,payload)=>{
  const newProductAllSubcategories=products.filter(p=>payload.subCategories.includes(p.category))
  return newProductAllSubcategories
}


export const fetchFilterResults=(data,payload)=>{
  
  
  const finalResults=data.filter(record=>{
    const results=Object.keys(payload).map(k=>{
      if(!payload[k].operator){
        return record[k].includes(payload[k])
      }else if(payload[k].operator=="mayor"){
        return record[k]>parseFloat(payload[k].val)
      }
      else if(payload[k].operator=="menor"){
        return record[k]<parseFloat(payload[k].val)
      }
      else if(payload[k].operator=="igual"){
        return record[k]==parseFloat(payload[k].val)
      }

    })  
    return !results.includes(false)
    
  })
  console.log("Finalresults",finalResults)
  return finalResults
}