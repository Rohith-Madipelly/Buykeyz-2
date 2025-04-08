import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Entypo } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './AuthScreens/LoginPage';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
// SplashScreen.setOptions({
//     duration: 1000,
//     fade: true,
// });

export default function Screen() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [userStates, setUserStates] = useState(false)
    const dispatch = useDispatch();
    const loginSelector = useSelector((state) => state.login.isLogin);


    const navigationRef = createNavigationContainerRef();
    const [isNavigationReady, setIsNavigationReady] = useState(true);

    const Stack = createNativeStackNavigator();

    console.log("UserStatesStates ", loginSelector)

    const [fontsLoaded, fontErrors] = useFonts({
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    // useEffect(() => {
    //     setUserStates(loginSelector)
    // }, [loginSelector])

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                // await Font.loadAsync(Entypo.font);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);


    useEffect(() => {
        // Only proceed with navigation if the navigation is ready

        const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
            console.log('NOTIFICATION RECEIVED >');
            console.log(notification);
        });

        const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('NOTIFICATION RESPONSE RECEIVED');
            console.log(response.notification);

            const screenToNavigate = response.notification.request.content.data.screen || "Home";
            console.log("screenToNavigate>", screenToNavigate)

            if (navigationRef.isReady()) {
                try {
                    navigationRef.navigate(screenToNavigate || "Home");
                } catch (error) {
                    console.warn("Navigation error:", error);
                }
            }
            
        });

        return () => {
            subscription1.remove();
            subscription2.remove();
        };
    }, [isNavigationReady]);



    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    // const navigationRef = createNavigationContainerRef();
    // const [isNavigationReady, setIsNavigationReady] = useState(true);

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => setIsNavigationReady(true)}
        ><>
 
            <Stack.Navigator>
                {/* {userStates ? (
                    <>
                        <Stack.Group>

                        </Stack.Group>
                    </>) : (
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />

                        </Stack.Group>
                    </>
                )} */}
                      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />

            </Stack.Navigator>
            </>
        </NavigationContainer>
    );

}