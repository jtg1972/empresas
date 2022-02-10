import React from 'react'
import { useSelector } from 'react-redux'

const mapToState=({structure})=>({
  productsFromStructure:structure.productsFromStructure
})
const DisplayTitle = () => {
  const {productsFromStructure}=
  useSelector(mapToState)
  return (
    productsFromStructure.length>0
      ?
      <p className="titleLabel">
        Products
      </p>
      :
      <p className="titleLabel">
        There are not elements in this category
      </p>
  )
}
export default DisplayTitle