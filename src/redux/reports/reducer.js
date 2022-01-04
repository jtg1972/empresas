import reports from "../../data/reports"
import { getReportResults } from "./helpers"
import types from "./types"


const INITIAL_STATE={
  //queryFields:[],
  //queryGroups:[],
  reports:reports,
  queryFields:[],
  queryGroups:[],
  categoryReports:[],
  runReportResults:[],
  report:{}
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.CREATE_REPORT:
      return {
        ...state,
        reports:[...state.reports,action.payload]
      }
    case types.ADD_QUERY_FIELD:
     return {
       ...state,
       queryFields:[...state.queryFields,action.payload]
     }
    case types.REMOVE_QUERY_FIELD:
     return {
       ...state,
       queryFields:[...state.queryFields.filter(
        x=>x.fieldName!=action.payload
       )]
     }
    case types.ADD_QUERY_GROUP:
      return {
        ...state,
        queryGroups:[...state.queryGroups,action.payload]
      }
    case types.REMOVE_QUERY_GROUP:
      return {
        ...state,
        queryGroups:[...state.queryGroups.filter(
         x=>x.fieldName!=action.payload
        )]
      }
    case types.SELECT_CATEGORY_REPORTS:
      const cR=state.reports.filter(r=>
        r.category==action.payload
        )  
      return {...state,categoryReports:cR}
    case types.GET_REPORT:
      return {
        ...state,
        report:state.categoryReports.find(x=>{
          console.log("x,payload",x.name,action.payload,
          x.name===action.payload)
          return x.name===action.payload  
        }
        )
      }

    
    case types.RUN_REPORT:
      //params payload.productsFromStructure,
      //report
      console.log("acpayload",action.payload)
      const results=getReportResults(action.payload,state.report)     
      return {
        ...state,
        runReportResults:results   
      }
    default:
      return state
  }
}