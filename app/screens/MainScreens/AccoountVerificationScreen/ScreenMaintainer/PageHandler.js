import { setAccountPage } from "../../../../redux/actions/AccountSetUpAction";
import AsyncStorage_Calls from "../../../../utils/AsyncStorage_Calls";



export const PageHandler=(pageNumber,dispatch)=>{
 
    AsyncStorage_Calls.setAsyncValue("pageNumber", JSON.stringify(pageNumber), function (res, status) {
      if (status) {
          dispatch(setAccountPage(pageNumber));
       
      }
  })
  }
 