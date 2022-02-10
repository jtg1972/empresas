import React from 'react'
import { searchInvoices } from '../../redux/invoices/actions'
import AddFilter from '../AddFilter'
import Dialog from '../Dialog'
import AddDialogClientForm from '../DisplayClientsBlock/AddDialogClientForm'
import AddDialogInvoiceForm from '../DisplayClientsBlock/AddDialogInvoiceForm'
import AddDialogProductForm from '../DisplayClientsBlock/AddDialogProductForm'
import SearchClients from '../DisplayClientsBlock/DisplayClients/SearchClients'
import SearchInvoices from '../DisplayClientsBlock/DisplayInvoices/SearchInvoices'
import EditProductDetail from '../DisplayClientsBlock/EditProductDetail'
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
  addFilterDialogProps,
  addClientDialogProps,
  addInvoiceDialogProps,
  searchClientsDialogProps,
  searchInvoiceDialogProps,
  addProductDialogProps,
  editProductDetailDialogProps,
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
      <AddDialogClientForm
        {...addClientDialogProps}
      />
      <AddDialogInvoiceForm
        {...addInvoiceDialogProps}
      />
      <SearchClients
        {...searchClientsDialogProps}
      />
      <SearchInvoices
        {...searchInvoiceDialogProps}
      />
      <AddDialogProductForm
        {...addProductDialogProps}
      />
      <EditProductDetail
        {...editProductDetailDialogProps}
      />
    </>
  )
}

export default DialogsOfProductsDetails
