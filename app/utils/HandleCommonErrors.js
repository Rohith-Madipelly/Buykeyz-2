import { Alert, StyleSheet } from 'react-native'


const HandleCommonErrors = (error) => {
  if (error.response.status === 500) {
    Alert.alert("Server Error", "Something went wrong. Please try again later.");
  }
  else if (error.code === 'ECONNABORTED') {
    console.log('Request timed out. Please try again later.');
  }
  else if (error.request) {
    console.log("No Response Received From the Server.", error.request);
    if (error.request.status === 0 && error.request._response.includes('Unable to parse TLS packet header')) {
      Alert.alert("Server Unreachable", "Please try again later.");
    } else if (error.request.status === 0) {
      Alert.alert("No Network Found", "Please check your internet connection.");
    }
  }
  else {
    Alert.alert("Error in Setting up the Request.")
  }
}

export default HandleCommonErrors

const styles = StyleSheet.create({})

