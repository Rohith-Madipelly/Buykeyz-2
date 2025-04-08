
import React from 'react'
import { Alert } from 'react-native';
import { APP_NAME } from '../Enviornment';

export const CustomAlerts_OK = (Alert_Title = APP_NAME, Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        }, 
        {
            text: 'OK',
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);
}


export const CustomAlerts_Custom = (Alert_Title = APP_NAME, Alert_Msg, onOkCallBack,rightBtn) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: `${rightBtn}`,
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);
}
export const CustomAlerts_Retry = (Alert_Title = APP_NAME, Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'Retry',
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);
}



export const CustomAlerts_Continue = (Alert_Title = APP_NAME, Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'CONTINUE',
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);
}


export const CustomAlerts_LogOut = (Alert_Title = "Do you want to logout ?", Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'Log out',
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);
}


export const ServerError = (Alert_Title = APP_NAME, Alert_Msg, onOkCallBack) => {
    Alert.alert(Alert_Title, Alert_Msg, [
        {
            text: 'cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'CONTINUE',
            onPress: () => {
                if (onOkCallBack) {
                    onOkCallBack();  // Safely call the callback if provided
                } else {
                    console.log('OK Pressed');
                }
            }
        },
    ]);

}







const showAlert = () =>
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );




