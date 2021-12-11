import React from 'react'
import AddFilter from '../AddFilter'
import Dialog from '../Dialog'
import EditProduct from '../EditProduct'
import NewProduct from '../NewProduct'
import SearchSubcategories from '../SearchSubcategories'
import StructureCategory from '../StructureCategory'
import StructureField from '../StructureField'

const DialogsOfProductsDetails = ({
 /*category,
  setCategory,
  catName,
  setCatName,
  setBreadCrumb,
  breadCrumb,
  toggleDialog,
  openDialog,*/
  searchSubcategoriesProps,

  /*openDialogStructure,
  toggleDialogStructure,
  fieldName,
  category,*/
  structureCategoryProps,

  category,


  /*openDialogField,
  toggleDialogField,
  category,*/
  dialogFieldProps,

  formFields,
  
  /*openEditProductDialog,
  toggleEditProductDialog,
  editFields,
  formFields,*/
  editProductProps,

  /*openNewProductDialog,
  toggleNewProductDialog,*/
  newProductProps,

  /*openAddFilterDialog,
  toggleAddFilterDialog,
  setHasAddFilter,
  hasAddFilter,
  values,
  setValues*/
  addFilterDialogProps


}) => {
  return (
    <>
      <SearchSubcategories
        {...searchSubcategoriesProps}
      />
      
      <StructureCategory
        /*openDialog={openDialogStructure}
        toggleDialog={toggleDialogStructure}
        multipleFieldName={fieldName}
        category={category}*/
        {...structureCategoryProps}
      />
      <StructureField
        /*openDialog={openDialogField}
        toggleDialog={toggleDialogField}
    
        category={category}*/
        {...dialogFieldProps}
        
      />
      <EditProduct
        /*openDialog={openEditProductDialog}
        toggleDialog={toggleEditProductDialog}
        fieldsJson={editFields}
        formFields={formFields}*/
        {...editProductProps}
      />

      <NewProduct 
        /*openDialog={openNewProductDialog}
        toggleDialog={toggleNewProductDialog}
        //catName={catName}
        category={category}
        formFields={formFields}*/
        {...newProductProps}
      />
      <AddFilter
        {...addFilterDialogProps}      
        /*openDialog={openAddFilterDialog}
        toggleDialog={toggleAddFilterDialog}
        setHasAddFilter={setHasAddFilter}
        hasAddFilter={hasAddFilter}
        values={values}
        setValues={setValues}*/
      />

    </>
  )
}

export default DialogsOfProductsDetails
