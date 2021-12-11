import React from 'react'

const DisplaySubcategoriesCombo = ({
  subCategories,
  setCategory,
  setIsSearching
}) => {
return(
  subCategories.length>0 
  && 
  <div className="containerCombo">
    <div className="scrollCombo">
    {subCategories.map((sc,i)=>
      <div 
        className={
          sc.type==1
            ?"combo"
            :"combo"
        } 
        key={i}
        onClick={()=>{
          //if(sc.type==1){
            setIsSearching(false);
            setCategory(sc.id);
          //}
        }}
      >
        {sc.name} 
        {sc.type==1 
          ? "(category)" 
          :"(product)"
        }
      </div>)}
    </div>
  </div>
)
}

export default DisplaySubcategoriesCombo
