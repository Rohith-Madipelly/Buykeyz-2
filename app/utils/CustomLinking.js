import { StyleSheet, Linking } from 'react-native'

export const CustomLinking = (url,info) => {

    try {
        Linking.openURL(url)   
        // .catch((err) => console.error('An error occurred', err));
    } catch (error) {
        console.error('An error occurred', err)
    }
}



const styles = StyleSheet.create({})