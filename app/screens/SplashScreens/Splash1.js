import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react';

import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';


const gifAsset = Asset.fromModule(require('../../assets/gifs/BuyKeys SplashScreen.gif'));

const Splash1 = () => {

    const navigation = useNavigation(); 

    useFocusEffect(
        useCallback(() => {
            const timer = setTimeout(() => {
                navigation.replace("Splash2");
            }, 3000);
            return () => {
                clearTimeout(timer);
                // console.log('Splash is unfocused');
            };
        }, [])
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor="#F7F7F7"
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7' }}>

                <Image
                    source={gifAsset.localUri || gifAsset.uri}
                    style={{ width: '100%', height: 250, marginTop: 100 }}
                />

            </View>
        </SafeAreaView>
    )
}

export default Splash1

const styles = StyleSheet.create({})