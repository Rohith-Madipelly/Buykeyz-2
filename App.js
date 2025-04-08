
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/redux/Store'
// import Screen from './app/screens/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
// import * as Notifications from 'expo-notifications';
import { createNavigationContainerRef,} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from './app/screens';


export default function App() {

  const navigationRef = createNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(true);


    const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ToastProvider
          placement="bottom"
          duration={5000}
          animationType='slide-in'
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          offset={50} // offset for both top and bottom toasts
          offsetTop={1}
          // offsetBottom={Metrics.rfv(70)}
          swipeEnabled={true}
        >
          {/* <NavigationContainer
          ref={navigationRef}
          onReady={() => setIsNavigationReady(true)}
        > */}
                {/* <Stack.Screen name="Splash1" component={Splash1} options={{ headerShown: false }} /> */}
         

          <Screen />
          {/* </NavigationContainer> */}

        </ToastProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
