import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { setToken } from '../redux/actions/LoginAction';
import AsyncStorage_Calls from './AsyncStorage_Calls';


export const LogOutHandle = async (dispatch) => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {


            console.log("dvs",)
            dispatch(setToken(""));
          } catch (e) {
            console.log("error", e);
          }
        }
      }
    ],
    { cancelable: false }
  );
}


export const MainLogoutSystem = async (dispatch) => {

  AsyncStorage_Calls.getAsyncValue('Token', (error, token) => {
    if (error) {
      console.error('Error getting token:', error);
    } else {
      console.log("deleting this token", token)
    }
  })


  AsyncStorage_Calls.removeAsyncValue('Token', (error, token) => {
    if (error) {
      console.error('Error getting token:', error);
    } else {
      console.log("Done Done ", token)
    }
  })

  dispatch(setToken(""));
}

export const ServerTokenError_Logout = async (title = "Session Expired", message = "Your session has expired due to inactivity or token error. Please log in again to continue.", dispatch) => {
  Alert.alert(title, message, [
    {
      text: 'ok', onPress: async () => {
        try {
          await MainLogoutSystem(dispatch)
        } catch (e) {
          console.log("error", e);
        }
      }
    }],
    { cancelable: false })
}

export const TokenLogoutAlert = async (dispatch) => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('BuyKeys$:' + 'Token');
            dispatch(setToken(null));
          } catch (e) {
            console.log("error", e);
          }
        }
      }
    ],
    { cancelable: false }
  );
}
