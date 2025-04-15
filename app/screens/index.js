import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './AuthScreens/LoginPage';
import RegisterPage from './AuthScreens/RegisterPage';
import RegisterVerifty from './AuthScreens/RegisterVerifty';
import RegisterCreatePass from './AuthScreens/RegisterCreatePass';
import RegisterAgreement from './AuthScreens/RegisterAgreement';
import SuccessfullyAccount from './ShareScreens/SuccessfullyAccount';
import ForgetPassPage from './AuthScreens/ForgetPassPage';
import ForgotOtpVerifty from './AuthScreens/ForgotOtpVerifty';
import ForgetNewPass from './AuthScreens/ForgetSetPass';
import TermsandConditions from './ShareScreens/TermsandConditions';
import BottomTabScreen from './MainScreens/BottomTabScreen';
import Edit_Account from './MainScreens/BottomTabScreen/Profile/Edit_Account';
import DeliveryAddress from './MainScreens/BottomTabScreen/Profile/DeliveryAddress';
import AddDeliveryAddress from './MainScreens/BottomTabScreen/Profile/AddDeliveryAddress';
import ChangePassword from './MainScreens/BottomTabScreen/Profile/ChangePassword';
import OrderTransactions from './MainScreens/BottomTabScreen/Profile/OrderTransactions';
import AsyncStorage_Calls from '../utils/AsyncStorage_Calls';
import { setToken } from '../redux/actions/LoginAction';
import OrderHistory from './MainScreens/BottomTabScreen/Profile/OrderHistory';
import PrivacyPolicy from './ShareScreens/PrivacyPolicy';
import DeleteAccountPolicy from './ShareScreens/DeleteAccountPolicy';
import ReturnAndRefendPolicy from './ShareScreens/ReturnAndRefendPolicy';
import RewardDetails from './MainScreens/BottomTabScreen/Rewards/RewardDetails';
import NotificationList from './MainScreens/BottomTabScreen/Home/NotificationList';
import AllCategories from './MainScreens/BottomTabScreen/Home/AllCategories';
import CategoriesProductItem from './MainScreens/BottomTabScreen/Home/CategoriesProductItem';
import ProductItem from './MainScreens/BottomTabScreen/Home/ProductItem';
import CheckoutProduct from './MainScreens/BottomTabScreen/Home/CheckoutProduct';
import PlaceOrderSuccessfully from './ShareScreens/PlaceOrderSuccessfully';
import SingleBranches from './MainScreens/BottomTabScreen/Home/SingleBranches';
import SubscriptionList from './MainScreens/Subscriptions/SubscriptionList';
import ManageSubscriptions from './MainScreens/Subscriptions/ManageSubscriptions';
import AccountSetupComponent from './MainScreens/AccoountVerificationScreen/ScreenMaintainer/AccountSetupComponent';
import RewardWinner from './MainScreens/BottomTabScreen/Rewards/RewardWinner';
import ViewInvoicesSubscriptions from './MainScreens/Subscriptions/ViewInvoicesSubscriptions';
import Splash1 from './SplashScreens/Splash1';
import Splash2 from './SplashScreens/Splash2';



// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
// SplashScreen.setOptions({
//     duration: 1000,
//     fade: true,
// });


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, // Show alert manually
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function Screen() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [userStates, setUserStates] = useState(false)
    const dispatch = useDispatch();
    const loginSelector = useSelector((state) => state.login.isLogin);
    const isSplashSelector = useSelector((state) => state.login.isSplash);


    const navigationRef = createNavigationContainerRef();
    const [isNavigationReady, setIsNavigationReady] = useState(true);

    const Stack = createNativeStackNavigator();

    console.log("UserStatesStates ", loginSelector)

    const [fontsLoaded, fontErrors] = useFonts({
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
        'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
    });

    useEffect(() => {
        setUserStates(loginSelector)
    }, [loginSelector])


    const verifyToken = async () => {
        AsyncStorage_Calls.getAsyncValue('Token', (error, token) => {
            if (error) {
                console.error('Error getting token:', error);
            } else {
                console.log("Is a user or not", token)
                if (token != null) {
                    console.log()
                    dispatch(setToken(token));
                }
            }
            setAppIsReady(true);
        });
    }

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                // await Font.loadAsync(Entypo.font);
                await verifyToken();
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

            const screenToNavigate = response?.notification?.request?.content?.data?.navigateTo || "Home";
            const screenToNavigateIos = response?.notification?.request?.trigger?.payload?.navigateTo || "Home";

            console.log(screenToNavigate, "screenToNavigate", "screenToNavigateIos", screenToNavigateIos)
            console.log("screenToNavigate> xx ", screenToNavigate)

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
    console.log("isSplashSelector",isSplashSelector)
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => setIsNavigationReady(true)}
            onLayout={onLayoutRootView}
        >
            <Stack.Navigator>
 
                {isSplashSelector&&<Stack.Screen name="Splash1" component={Splash1} options={{ headerShown: false }} />}
                {isSplashSelector&&<Stack.Screen name="Splash2" component={Splash2} options={{ headerShown: false }} />}


                {userStates ? (
                    <>
                        <Stack.Group>

                            {/* <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} /> */}
                            <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Edit_Account" component={Edit_Account} options={{ headerShown: false }} />
                            <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} options={{ headerShown: false }} />
                            <Stack.Screen name="AddDeliveryAddress" component={AddDeliveryAddress} options={{ headerShown: false }} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                            <Stack.Screen name="OrderTransactions" component={OrderTransactions} options={{ headerShown: false }} />
                            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
                            <Stack.Screen name="RewardDetails" component={RewardDetails} options={{ headerShown: false }} />
                            <Stack.Screen name="RewardWinner" component={RewardWinner} options={{ headerShown: false }} />
                            <Stack.Screen name="NotificationList" component={NotificationList} options={{ headerShown: false }} />
                            <Stack.Screen name="AllCategories" component={AllCategories} options={{ headerShown: false }} />
                            <Stack.Screen name="CategoriesProductItem" component={CategoriesProductItem} options={{ headerShown: false }} />
                            <Stack.Screen name="ProductItem" component={ProductItem} options={{ headerShown: false }} />
                            <Stack.Screen name="CheckoutProduct" component={CheckoutProduct} options={{ headerShown: false }} />
                            <Stack.Screen name="PlaceOrderSuccessfully" component={PlaceOrderSuccessfully} options={{ headerShown: false }} />
                            <Stack.Screen name="SingleBranches" component={SingleBranches} options={{ headerShown: false }} />
                            <Stack.Screen name="SubscriptionList" component={SubscriptionList} options={{ headerShown: false }} />
                            <Stack.Screen name="ManageSubscriptions" component={ManageSubscriptions} options={{ headerShown: false }} />
                            <Stack.Screen name="ViewInvoicesSubscriptions" component={ViewInvoicesSubscriptions} options={{ headerShown: false }} />
                            <Stack.Screen name="AccountSetupComponent" component={AccountSetupComponent} options={{ headerShown: false }} />
                        </Stack.Group>
                    </>) : (
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                            <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
                            <Stack.Screen name="RegisterVerifty" component={RegisterVerifty} options={{ headerShown: false }} />
                            <Stack.Screen name="RegisterCreatePass" component={RegisterCreatePass} options={{ headerShown: false }} />
                            <Stack.Screen name="RegisterAgreement" component={RegisterAgreement} options={{ headerShown: false }} />
                            <Stack.Screen name="SuccessfullyAccount" component={SuccessfullyAccount} options={{ headerShown: false }} />
                            <Stack.Screen name="ForgetPassPage" component={ForgetPassPage} options={{ headerShown: false }} />
                            <Stack.Screen name="ForgotOtpVerifty" component={ForgotOtpVerifty} options={{ headerShown: false }} />
                            <Stack.Screen name="ForgetSetPassword" component={ForgetNewPass} options={{ headerShown: false }} />
                        </Stack.Group>
                    </>
                )}

                <Stack.Screen name="TermsandConditions" component={TermsandConditions} options={{ headerShown: false }} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
                <Stack.Screen name="DeleteAccountPolicy" component={DeleteAccountPolicy} options={{ headerShown: false }} />
                <Stack.Screen name="ReturnAndRefendPolicy" component={ReturnAndRefendPolicy} options={{ headerShown: false }} />


            </Stack.Navigator>

        </NavigationContainer>
    );

}