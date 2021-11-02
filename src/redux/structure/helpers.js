
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