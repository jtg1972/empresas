//import products from '../data/products'
const findProductById=(products,id)=>{
  return products.find(product=>product.id==id)
}

const getBreadCrumb=(products,id)=>{
  let ultimoProducto=findProductById(products,id);
  console.log("up",ultimoProducto)
  let breadCrumb=[]
  breadCrumb.push(ultimoProducto);
  while (ultimoProducto.category!=0){
    ultimoProducto=findProductById(products,ultimoProducto.category);
    console.log("up",ultimoProducto)
    breadCrumb.unshift(ultimoProducto);
  }
  breadCrumb.unshift({id:0,name:"Categories"})
  console.log("bc",breadCrumb);
  return breadCrumb;

}
export default getBreadCrumb;