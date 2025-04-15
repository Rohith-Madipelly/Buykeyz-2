import AsyncStorage_Calls from "../../utils/AsyncStorage_Calls";

var token = ""
try {
  AsyncStorage_Calls.getAsyncValue('Token', (error, data) => {
    if (error) {
      console.error('Error getting data:', error);
    } else {
      if (data != null) {
        console.log("shvc", data)
        token = data
      } else {
      }
    }
    // setAppIsReady(true);
  });
} catch (error) {
  // console.log(error)
}

const initialState = {
  token: token || "",
  isLogin: token ? true : false,
  isSplash:true
};



console.log("initialState of LoginReducer", initialState)

const LoginReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
        isLogin: action.token ? true : false,
      }
    case "SET_SplashScreen":
      return {
        ...state,
        isSplash: action.isSplash ? true : false,
      }
    default:
      return state;
  }
};

export default LoginReducer;
