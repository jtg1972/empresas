export const searchInvoices=({fields,
  searchField,
  fieldStructureType},invoices)=>{
    let res=[]
    if(fieldStructureType=="numeric"){
      res=invoices.filter(i=>
        i.id==fields[searchField])
    }else if(fieldStructureType=="date"){
      const searchDate1=new Date(fields["date1"])
      const searchDate2=new Date(fields["date2"])
      res=invoices.filter(i=>{
        let date=new Date(i[searchField])
        if(date>=searchDate1 && date<=searchDate2){
          return true
        }
        return false
      }
      )
      
    }
    console.log("res",res)
      return res;
  }