import React from 'react'

const DisplayTableHeader = ({
  fields,
  searchProductsFilter
}) => {
  return (
    fields.length>0 && 
      <tr>
        {fields.map(c=>c.map(x=>
          <th>{x}</th>
        ))
        }
        <th>Editar producto</th>
        <th>Eliminar producto</th>
        
        
      </tr>
  )
}

export default DisplayTableHeader
