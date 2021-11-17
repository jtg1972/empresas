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
/*en el ejemplo seria
subcats=1 alimentos porque son de categoria cero
para cada subcats que en este caso seria alimentos
como alimentos es de tipo 1
res=[getsubcategories(categorias,)]

*/