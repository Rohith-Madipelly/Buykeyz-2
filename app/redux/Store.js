
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginReducer from "./reducers/LoginReducer";
import AccountSetUpReducer from './reducers/AccountSetUpReducer';
import fcmTokenReducer from './reducers/fcmTokenReducer';
// import AccountSetUpReducer from './reducers/AccountSetUpReducer'
// import fcmTokenReducer from './reducers/fcmTokenReducer';


// Combine reducers
const rootReducer = combineReducers({
    login: loginReducer, 
    AccountSetUp: AccountSetUpReducer, // Note: Use lowercase 'n' for consistency
    fcmTokenReducer:fcmTokenReducer
  });


// Configure the store

export const store = configureStore({
    reducer: rootReducer,
  });
 
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import loginReducer from './reducers/loginReducer';
// import NameReducer from './reducers/NameReducer'

// // Combine reducers if you have multiple reducers
// const rootReducer = combineReducers({
//   login: loginReducer,
//   Name:NameReducer,
//   // Add other reducers here
// });

// // Configure the Redux store with the combined reducer
// export const store = configureStore({
//   reducer: rootReducer,
//   // Other store configurations go here
// });














// import { createSlice } from '@reduxjs/toolkit';

// const loginSlice = createSlice({
//   name: 'login',
//   initialState: { isLoggedIn: false },
//   reducers: {
//     logIn: (state) => {
//       state.isLoggedIn = true;
//     },
//     logOut: (state) => {
//       state.isLoggedIn = false;
//     }
//   }
// });

// export const { logIn, logOut } = loginSlice.actions;
// export default loginSlice.reducer;
