import structure from '../../data/structure'
import { addFieldCat, addMultCat,createStructureEmpty,getFormFields,removeFieldCategory } from './helpers'
import types from './types'

const INITIAL_STATE={
  categoryStructures:structure,
  categoryStructure:{},
  formFields:[]
}

const structureReducer=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.FETCH_ALL_STRUCTURES:
      return state;

    case types.GET_STRUCTURE_CATEGORY:
      console.log("sest1",action.payload.data)
      return {...state,categoryStructure:action.payload.data.find(
        cat=>cat.category==action.payload.category
      )}
    case types.ADD_MULTIPLE_VALUE:

      console.log("sest",action.payload)
      console.log("sestest",action.payload.data)
      const newCatSt=
        addMultCat(action.payload)
      return {...state,
        categoryStructures:newCatSt,
        categoryStructure:newCatSt.filter(r=>r.category===action.payload.category)[0]
      }
    case types.ADD_FIELD_CATEGORY:
      const nCS=
        addFieldCat(action.payload)
      return {
        ...state,
        categoryStructures:nCS,
        categoryStructure:nCS.filter(r=>r.category==action.payload.category)[0]
      }
    case types.REMOVE_FIELD_CATEGORY:
      const rCF=removeFieldCategory(action.payload)  
      return{
        ...state,
        categoryStructures:rCF,
        categoryStructure:rCF.filter(r=>r.category==action.payload.category)[0]
      }
    case types.CREATE_STRUCTURE_EMPTY:
      const cSE=createStructureEmpty(action.payload)
      return{
        ...state,
        categoryStructures:cSE,
        categoryStructure:cSE.filter(r=>r.category==action.payload.category)[0]
      }
    case types.GET_FORM_FIELDS:
      const gFF=getFormFields(action.payload)
      return {
        ...state,
        formFields:gFF
      }
    
      
    
    default:
      return state;

  }
}

export default structureReducer