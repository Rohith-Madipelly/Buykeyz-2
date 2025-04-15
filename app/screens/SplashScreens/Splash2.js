import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
  Extrapolate,
  Easing
} from 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../assets/svg/Icon';
import { setIsSplashScreenAction } from '../../redux/actions/AccountSetUpAction';

export default function Splash2() {
  const progress = useSharedValue(0); // Initialize progress value
  const KycPageNum = useSelector((state) => state?.AccountSetUp?.PageCount);
  const navigation = useNavigation();
  const loginSelector = useSelector((state) => state.login.isLogin);
const dispatch=useDispatch()

  useEffect(() => {
    // Set up an animation with different speeds
    progress.value = withRepeat(
      withTiming(1, {
        duration: 3000, // Total duration for one full cycle
        easing: Easing.linear,
      }),
      -1, // Repeat indefinitely
      false // Do not reverse the animation
    );
  }, []);

  // Define the interpolation of rotation values and speed
  const animatedStyles = useAnimatedStyle(() => {
    // Interpolate the rotation based on the progress
    const rotationValue = interpolate(
      progress.value,
      [0, 0.1, 0.9, 1],
      [0, 100, 750, 1020],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotate: `${rotationValue}deg` }],
    };
  });



  useFocusEffect(
    useCallback(() => {

      const timer = setTimeout(() => {
        console.log("KycPageNum <><><> fv <>", KycPageNum)

        if (KycPageNum <= 12) {
          console.log("Home", KycPageNum <= 12)

          if (loginSelector) {
            navigation.replace('BottomTabScreen')
          } else {
            navigation.replace('Login')
          }
          setTimeout(() => {
            dispatch(setIsSplashScreenAction(false))
            
          }, 200);
        }
        else {
          console.log("Home", KycPageNum <= 12)
          navigation.replace('NextScreener', {
            screen: 'AccountSetupComponent',
          });
        }



        // if(KycPageNum<=12){
        //   console.log("Home",KycPageNum<=12)
        //   navigation.replace('NextScreener', {
        //     screen: 'BottomTabScreen',
        //   });
        // }
        // else{
        //   console.log("Home",KycPageNum<=12)
        //   navigation.replace('NextScreener', {
        //     screen: 'AccountSetupComponent',
        //   });
        // }



        // if (KycPageNum > 11) {

        // } else {

        // }
        // navigation.replace("BottomTabScreen");
      }, 2500);
      return () => {
        clearTimeout(timer);
        // console.log('Splash is unfocused');
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#4A3AFF" }}>

      <View style={styles.container}>
        <StatusBar
          // barStyle={'dark-content'}
          barStyle={'light-content'}
          animated={true}
          backgroundColor="#4A3AFF"
        />

        <Animated.View style={[styles.box, animatedStyles]}>
          <Icon />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content vertically
    backgroundColor: '#4A3AFF'
  },
  box: {
    width: 100, // Width of the box
    height: 100, // Height of the box
    alignItems: 'center',
    justifyContent: 'center',
  },
});
