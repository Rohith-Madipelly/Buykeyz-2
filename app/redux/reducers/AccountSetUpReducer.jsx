import AsyncStorage from '@react-native-async-storage/async-storage';

const PageCount=""
try {
  // PageCount = AsyncStorage.getItem('BuyKeys:' + 'PageCount');
} catch (error) {
  console.log("Error in AsyncStorage.getItem",error)
}

const initialState = {
  // PageCount: PageCount || null,
  PageCount: PageCount || 1,
  isKycCompleted: PageCount ? true : false,
};



const AccountSetUpReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        PageCount: action.PageCount,
        isKycCompleted: action.PageCount ? true : false,
      };
    default:
      return state;
  }
};

export default AccountSetUpReducer;








