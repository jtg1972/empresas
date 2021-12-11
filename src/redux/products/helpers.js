import { orderBusiness } from "../business/business.helpers"

export const fetchCategories=(data,payload)=>{
  console.log("payload",payload)
  if(payload==0){
    return data
  }else{
    const cats=data.filter(cat=>
      cat.category==payload
    )
    const catOrdered=orderBusiness(cats);
    return catOrdered;
  }
}

export const searchCategories=(data,payload)=>{
  console.log("dataddad",data)
  const filteredData=data.filter(cat=>cat.name.includes(payload))
  const orderedFilteredData=orderBusiness(filteredData);
  return orderedFilteredData
}



export const getCategories=(categories,category)=>{
  return categories.filter(cat=>{
    console.log("Comp",cat.category,category)
    return cat.category==category
  })
}

export const getSubcategories=(categories,category)=>{
  const currentCat=categories.filter(cat=>{
    if(cat.id==category && cat.type==0){
      return true
    }
  })
  if(currentCat.length==1)
    return [category]
  
  const subCats=getCategories(categories,category)
  let res=[]
  subCats.forEach(sc=>{
    if(sc.type==0)
      res=[...res,sc.id]
    else if(sc.type==1)
      res=[...res,...getSubcategories(categories,sc.id)]
  })
  
  console.log("Res",res);
  return res;
}

const findProductById=(products,id)=>{
  return products.find(product=>product.id==id)
}

const getBreadCrumb=(products,id)=>{
  console.log("produbreadcrumb",products,id)
  let ultimoProducto=findProductById(products,id);
  console.log("up",ultimoProducto)
  let breadCrumb=[]
  breadCrumb.push(ultimoProducto);
  ultimoProducto=findProductById(products,ultimoProducto.category);
  while (ultimoProducto){ //&& ultimoProducto.category!=0 && ultimoProducto.category!=null){
    
    console.log("up",ultimoProducto)
    breadCrumb.unshift(ultimoProducto);
    ultimoProducto=findProductById(products,ultimoProducto.category);
  }
  //breadCrumb.unshift({id:0,name:"Categories",type:1,category:null})
  console.log("bc",breadCrumb);
  return breadCrumb;

}
export default getBreadCrumb;
/*en el ejemplo seria
subcats=1 alimentos porque son de categoria cero
para cada subcats que en este caso seria alimentos
como alimentos es de tipo 1
res=[getsubcategories(categorias,)]

*/