import React,{useState,useEffect} from 'react'
import { FaBlackberry, FaToggleOff } from 'react-icons/fa'
import { FcTreeStructure } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchProducts'
import StructureCategory from '../../components/StructureCategory'
import StructureField from '../../components/StructureField'
import { fetchAllStructures, getFormFields, getStructureCategory } from '../../redux/structure/actions'
import './styles.scss'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import { removeFieldCategory } from '../../redux/structure/actions'
import NewProduct from '../../components/NewProduct'
const mapToState=({structure})=>({
  strCategory:structure.categoryStructure,
  categoryStructures:structure.categoryStructures,
  formFields:structure.formFields
})

const DetailedProduct = () => {
  const dispatch=useDispatch();
  const {strCategory,categoryStructures,formFields}=useSelector(mapToState)
  const [category,setCategory]=useState(0)
  const [catName,setCatName]=useState("")
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
  let catList=[];
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
  },[category])

  
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

      <NewProduct 
        openDialog={openNewProductDialog}
        toggleDialog={toggleNewProductDialog}
        catName={catName}
        category={category}
        formFields={formFields}
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
    </div>
  )
}

export default DetailedProduct
