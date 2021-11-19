import React,{useState,useEffect} from 'react'
import { FaBlackberry, FaToggleOff } from 'react-icons/fa'
import { FcTreeStructure } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchProducts'
import StructureCategory from '../../components/StructureCategory'
import StructureField from '../../components/StructureField'
import { fetchAllStructures, getFormFields, getStructureCategory,getProductsFromStructure, deleteProduct, getAllProductsFromCategoryDown, deleteAllFilters } from '../../redux/structure/actions'
import './styles.scss'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import { removeFieldCategory } from '../../redux/structure/actions'
import NewProduct from '../../components/NewProduct'
import { addProduct, getProductCategories } from '../../redux/products/actions'
import {BsPencilFill} from 'react-icons/bs'
import EditProduct from '../../components/EditProduct'
import AddFilter from '../../components/AddFilter'

const mapToState=({structure,product})=>({
  strCategory:structure.categoryStructure,
  categoryStructures:structure.categoryStructures,
  formFields:structure.formFields,
  productsAmount:structure.products.length,
  productsFromStructure:structure.productsFromStructure,
  subCategories:product.subCategories,
  products:structure.products,
  productsFromFilter:structure.productsFromFilter
})

const DetailedProduct = () => {
  const dispatch=useDispatch();
  const {strCategory,
    categoryStructures,
    formFields,
    productsAmount,
    productsFromStructure,
    subCategories,
    products,
    productsFromFilter
  }=useSelector(mapToState)
  const [category,setCategory]=useState(0)
  const [catName,setCatName]=useState("")
  const [hasAddFilter,setHasAddFilter]=useState(false)
  const [breadCrumb,setBreadCrumb]=useState([{
    id:0,
    name:"Categories"
  }]);
  const [fieldName,setFieldName]=useState("");
  const [openDialog,setOpenDialog]=useState(false);
  const toggleDialog=()=>setOpenDialog(!openDialog)
  const [openDialogStructure,setOpenDialogStructure]=useState(false)
  const toggleDialogStructure=()=>setOpenDialogStructure(!openDialogStructure)
  const [openDialogField,setOpenDialogField]=useState(false)
  const toggleDialogField=()=>setOpenDialogField(!openDialogField)
  const [openNewProductDialog,setOpenNewProductDialog]=useState(false)
  const toggleNewProductDialog=()=>setOpenNewProductDialog(!openNewProductDialog)
  const [openEditProductDialog,setOpenEditProductDialog]=useState(false)
  const toggleEditProductDialog=()=>setOpenEditProductDialog(!openEditProductDialog)
  const [openAddFilterDialog,setOpenAddFilterDialog]=useState(false)
  const toggleAddFilterDialog=()=>setOpenAddFilterDialog(!openAddFilterDialog)
  const[camposState,setCamposState]=useState([])
  const[editFields,setEditFields]=useState({})
  const [values,setValues]=useState({})
  
  let catList=[];
  let campos=[];
  useEffect(()=>{
    dispatch(fetchAllStructures());
    dispatch(getStructureCategory({category:0,
      data:categoryStructures}));
      catList=breadCrumb.map(g=>g.id);
    console.log(catList);
    dispatch(getFormFields({
        data:categoryStructures,
        categories:catList
      }))
      dispatch(getProductsFromStructure)
    dispatch(getProductsFromStructure({category:0}))
    if(productsFromStructure.length>0){
      const productFields=productsFromStructure[0]
      campos=Object.keys(productFields)
      console.log("Campos",campos) 
      setCamposState(campos)
     }else{
      setCamposState([])
    }
 
  },[])

  useEffect(()=>{
    dispatch(getStructureCategory({category,
      data:categoryStructures}));

    catList=breadCrumb.map(g=>g.id);
    console.log(catList);
    dispatch(getFormFields({
      data:categoryStructures,
      categories:catList
    }))
    
    if(productsFromStructure.length>0){
      const productFields=productsFromStructure[0]
      campos=Object.keys(productFields)
      console.log("Campos",campos) 
      setCamposState(campos)
     }else{
       setCamposState([])
     }
     dispatch(getProductCategories(category))
     console.log("scateg",subCategories)
     dispatch(getAllProductsFromCategoryDown({subCategories}))
  },[category])

  useEffect(()=>{
    if(productsFromStructure.length>0){
      const productFields=productsFromStructure[0]
      campos=Object.keys(productFields)
      console.log("Campos",campos) 
      setCamposState(campos)
     }else{
      setCamposState([])
    }
 
  },[productsFromStructure])

  useEffect(()=>{
    dispatch(getAllProductsFromCategoryDown({subCategories}))
  },[subCategories])

  const displayTypes=(values)=>
    values.map(v=><span>{v.name} &nbsp;</span>)

  return (
    <div className="detailedProduct">
      
      <div className="breadcrumb">
        {breadCrumb.map(cat=>
          <div className="pill">
          
            <span onClick={()=>{
              console.log("cid",cat.id);
              setCatName(cat.name)
              setCategory(cat.id)
              toggleDialog()
              /*dispatch(getStructureCategory({
                category:cat.id,
                data:categoryStructures
              }))*/
              dispatch(getFormFields({
                data:categoryStructures,
                categories:catList
              }))
            }}>
              {cat.name}
            </span> 
            
            
          </div>
        )}
      </div>
        
        <FormButton style={{
          width:"auto",
          backgroundColor:"orange",
          color:"black",
          marginBottom:"10px"
        }}
        onClick={()=>{
          toggleDialogField()
        }
        }>Anadir campo a {catName}</FormButton>
        <FormButton style={{
          width:"auto",
          backgroundColor:"orange",
          color:"black",
          marginBottom:"10px",
          marginLeft:"10px"
        }}
        onClick={()=>{
          console.log("Añadir producto ",catName,category);
          toggleNewProductDialog()
        }
        }>Anadir producto a {catName}</FormButton>
      <SearchSubcategories
        category={category}
        setCategory={setCategory}
        catName={catName}
        setCatName={setCatName}
        setBreadCrumb={setBreadCrumb}
        breadCrumb={breadCrumb}
        toggleDialog={toggleDialog}
        openDialog={openDialog}
      />
      
      <StructureCategory
        openDialog={openDialogStructure}
        toggleDialog={toggleDialogStructure}
        catName={catName}
        multipleFieldName={fieldName}
        category={category}
      />
      <StructureField
        openDialog={openDialogField}
        toggleDialog={toggleDialogField}
        catName={catName}
        category={category}
        
      />
      <EditProduct
        openDialog={openEditProductDialog}
        toggleDialog={toggleEditProductDialog}
        fieldsJson={editFields}
        formFields={formFields}
      />

      <NewProduct 
        openDialog={openNewProductDialog}
        toggleDialog={toggleNewProductDialog}
        catName={catName}
        category={category}
        formFields={formFields}
      />
      <AddFilter
        openDialog={openAddFilterDialog}
        toggleDialog={toggleAddFilterDialog}
        setHasAddFilter={setHasAddFilter}
        hasAddFilter={hasAddFilter}
        values={values}
        setValues={setValues}
      />

    {strCategory!==undefined && 
    <div>
      {/*<h1>{strCategory.name}</h1>*/}
      <div>
        <table>
          <tr>
            <th>Field Name</th>
            <th>Displayed Name</th>
            <th>Type</th>
            <th>Values to select</th>
            <th>Add value</th>
            <th>Remove field</th>
          </tr>
          
          {strCategory.fields && strCategory.fields.length>0
          && strCategory.fields.map(f=>
          <tr>
            <td>{f.fieldName}</td>
            <td>{f.displayName}</td>
            <td>{f.dataType=="singleValue"?"Single":"Multiple"}</td>
            <td>{f.values!==undefined && displayTypes(f.values)}</td>
            <td>
            {f.dataType=="multipleValue" &&
            <span>
              <FcTreeStructure 
                onClick={()=>{
                  toggleDialogStructure()
                  setFieldName(f.fieldName);
                  setCategory(strCategory.category)
                }}
              />
            </span>
            }
            </td>
            <td style={{textAlign:"center"}}>
            <IoIosRemoveCircleOutline
              onClick={()=>{
                dispatch(removeFieldCategory({
                  data:categoryStructures,
                  category:strCategory.category,
                  fieldName:f.fieldName
                }))
              }}
            />
            </td>
          </tr>)}
        </table>
        
        </div>
        
      </div>}
      <table>
        
        {camposState.length>0?
        <p style={{marginBottom:"5px",marginTop:"5px",padding:"5px",color:"white",backgroundColor:"black"}}>Productos</p>:
   <p style={{marginBottom:"5px",marginTop:"5px",padding:"5px",color:"white",backgroundColor:"black"}}>There are not products in this category</p>}
        <FormButton style={{background:"orange",color:"black",
      marginBottom:"5px"}} onClick={()=>toggleAddFilterDialog()}>Add Filter</FormButton>
          <FormButton style={{background:"orange",color:"black",
      marginBottom:"5px"}} onClick={()=>{
        dispatch(deleteAllFilters())
        setValues({})
        dispatch(getProductCategories(category))
        console.log("scateg",subCategories)
        dispatch(getAllProductsFromCategoryDown({subCategories}))
      }}>Delete All Filters</FormButton>
      
            {camposState.length>0 && 
            <tr>
              {camposState.map(c=>
                <th>{c}</th>)
              }
              <th>Editar producto</th>
              <th>Eliminar producto</th>
            
            </tr>} 
        {productsFromStructure.map(pfs=>{
          return(
            <tr>
              {camposState.map(c=>
                <td>{pfs[c]}</td>)
              }
              <td style={{textAlign:"center"}}
                onClick={()=>{
                  setEditFields(pfs)
                  toggleEditProductDialog();
                  
                }}>
                <BsPencilFill></BsPencilFill>
              </td>
              <td style={{textAlign:"center"}}>
                <IoIosRemoveCircleOutline
                onClick={()=>{
                  dispatch(deleteProduct({
                    id:pfs.id,
                    category:pfs.category

                  }))
                }}/></td>
              
            </tr>
          )
        })}
         
      
      </table>
    </div>
  )
}

export default DetailedProduct
