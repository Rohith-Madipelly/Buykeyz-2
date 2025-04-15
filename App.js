
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
import * as Notifications from 'expo-notifications';

export default function App() {

  const navigationRef = createNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(true);


    const Stack = createNativeStackNavigator();



  useEffect(() => {
    // Register notification category actions
    Notifications.setNotificationCategoryAsync('message', [
      {
        identifier: 'reply',
        buttonTitle: 'Reply',
        options: { opensAppToForeground: true },
      },
      {
        identifier: 'mark_read',
        buttonTitle: 'Mark as Read',
        options: { opensAppToForeground: false },
      },
    ]);

    // Handle notification responses when the app is in the background/closed
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Check the action identifier that was clicked
      if (response.actionIdentifier === 'reply') {
        console.log('Reply action clicked');
        // Perform relevant action (e.g., open the app to reply)
      } else if (response.actionIdentifier === 'mark_read') {
        console.log('Mark as read action clicked');
        // Perform relevant action (e.g., mark message as read)
      }
    });

    // Clean up the notification listener when the component is unmounted
    return () => subscription.remove();
  }, []);


  Notifications.addNotificationResponseReceivedListener(response => {
    const actionId = response.actionIdentifier;
    const data = response.notification.request.content.data;
  
    if (actionId === 'reply') {
      console.log('User tapped Reply');
      // Maybe open a chat screen
    } else if (actionId === 'mark-as-read') {
      console.log('Marked as read:', data);
      // Trigger backend or local state update
    }
  });
  
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
