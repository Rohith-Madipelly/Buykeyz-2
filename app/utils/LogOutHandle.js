import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { setToken } from '../redux/actions/LoginAction';


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
