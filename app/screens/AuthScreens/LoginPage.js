import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import TextStyles from '../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../components/UI/config/AppContants'
import CustomTextInput from '../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'
import { LoginPageYupSchema } from '../../formikYupSchemas/Auth/LoginPageYupSchema'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/UI/Buttons/CustomButton'
import { UserLoginApi } from '../../network/ApiCalls'
import AsyncStorage_Calls from '../../utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { fcmTokenAction } from '../../redux/actions/fcmTokenAction'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MainLogoutSystem } from '../../utils/LogOutHandle'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginPage = () => {

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [spinnerbool, setSpinnerbool] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [expoPushToken, setExpoPushToken] = useState('');


    let fcmTokenRedux = useSelector((state) => state?.fcmTokenReducer?.fcmToken || "");
    // console.log("fcmTokenRedux >>", fcmTokenRedux)
    const onRefresh = () => {
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    const insets = useSafeAreaInsets();




    async function registerForPushNotificationsAsync() {
        let token;

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                // alert('Failed to get push token for push notification!');
                return;
            }
            try {
                const projectId =
                    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                console.log("project id ", projectId)
                if (!projectId) {
                    throw new Error('Project ID not found');
                }
                // token = (
                //   await Notifications.getExpoPushTokenAsync({
                //     projectId,
                //   })
                // ).data;

                token = (await Notifications.getDevicePushTokenAsync()).data;

                dispatch(fcmTokenAction(token))
            } catch (e) {
                token = `${e}`;
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }




    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => {
                console.log(token)
                token && setExpoPushToken(token)
                if (token) {
                    setFieldValue('fcmToken', token)
                    dispatch(fcmTokenAction(token))
                } else {
                    setFieldValue('fcmToken', "null")
                }
            })
            .catch((err) => { console.log(err) })
        console.log("Registering  for push notification..")
    }, [])

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        setErrors,
        isValid,
        setValues,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            //   email: ZInitialValues?.login?.email || "",
            //   password: ZInitialValues?.login?.password || "",
            email: "",
            password: "",
            fcmToken: "",
            type:Platform.OS
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: LoginPageYupSchema,
        validateOnBlur: false,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



console.log("values.type",values.type)
    const submitHandler = async (values) => {
        seterrorFormAPI()
        setSpinnerbool(true)
        setShow({ password: false })

        try {
            const res = await UserLoginApi(values);
            console.log("dsjhvsh", res.data)
            if (res.data) {
                const token = res.data.token
                const message = res.data.message

                if (res.data.kycStatus == "agreement") {
                    toast.show(message)
                    CustomAlerts_OK(message, "But, Please read and agree our agreement", () => {
                        setTimeout(() => {
                            navigation.navigate("RegisterAgreement", { token: token })
                        }, 500);
                    })
                }
                // 
                // else if (res.data.kycStatus == "address") {
                //     toast.show(message)
                //     CustomAlerts_OK(message, "But, Please add your address", () => {
                //         setTimeout(() => {
                //             navigation.navigate("AddAddressScreen", { token: token })
                //         }, 500);
                //     })
                // }
                // Done
                else if (res.data.kycStatus == "home") {
                    AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(res.data.token), function (res, status) {
                        if (status) {
                            toast.show(message)
                            dispatch(setToken(token));
                        }
                    })
                }
                else {
                    AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(res.data.token), function (res, status) {
                        if (status) {
                            toast.show(message)
                            dispatch(setToken(token));
                        }
                    })
                }
            }
        } catch (error) {
            console.log("error console", error.response.data.message)
            if (error.response.status === 400) {
                if (error.response.data.message == "Invalid user, please register") {
                    seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                } else if (error.response.data.message == "Password is wrong") {
                    seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
                } else {
                    seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
            } else if (error.response.status === 301) {
                console.log(error.response.data)
                CustomAlerts_OK("Email is already existed. ", "You need to create your password. Please verify the otp, then you can create your password", () => {
                    setTimeout(() => {
                        navigation.navigate("AddAddressScreen", { token: token })
                    }, 500);
                })
                seterrorFormAPI({ emailForm: `${error.response.data.message}` })
            }
            else {
                HandleCommonErrors(error)
            }
        }
        finally {
            setSpinnerbool(false)
        }
    }
   
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <LoaderComponents
                visible={spinnerbool}
            />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        contentContainerStyle={{ flex: 1, }}
                    >
                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                                    animation={"bounceIn"}
                                    source={require("../../assets/images/appLogo/buykeyzlogo.png")}
                                    contentFit="cover"
                                    transition={1000}
                                    alt=''
                                />
                            </View>
                            <View style={{ flex: 0.7, justifyContent: 'center', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginBottom: 10 }]}>Login</Text>

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    label={'Email address'}
                                    placeholder={'Enter email address'}
                                    bgColor={'transparent'}
                                    asterisksymbol={true}
                                    value={values.email}
                                    onChangeText={(e) => {
                                        // handleChange("email")(e)
                                        const eWithoutSpaces = e.replace(/\s+/g, '');
                                        const eToLowerCaseText = eWithoutSpaces.toLowerCase(); handleChange("email")(eToLowerCaseText);
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("email")}
                                    // validate={handleBlur("email")}
                                    keyboardType={'email-address'}
                                    outlined
                                    borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                    errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                                />

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    label={'Password'}
                                    bgColor={'transparent'}
                                    asterisksymbol={true}
                                    placeholder={'Please Enter Your Password'}
                                    name='password'
                                    secure={!show?.password}
                                    rightIcon={<Pressable onPress={() =>
                                        // setShow({ ...setShow, password: !show?.password })
                                        setShow({ password: !show?.password })
                                    }>
                                        {show?.password ? (
                                            <Entypo name="eye-with-line" size={20} color="black" />) : (
                                            <Entypo name="eye" size={20} color="black" />)
                                        }
                                    </Pressable>
                                    }
                                    value={values.password}
                                    onChangeText={(e) => {
                                        const eWithoutSpaces = e.replace(/\s+/g, '');
                                        handleChange("password")(eWithoutSpaces); seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("password")}
                                    // validate={handleBlur("password")}
                                    outlined
                                    borderColor={`${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                    errorMessage={`${(errors.password && touched.password) ? `${errors.password}` : (errorFormAPI && errorFormAPI.passwordForm) ? `${errorFormAPI.passwordForm}` : ``}`}
                                />


                                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("ForgetPassPage")
                                        resetForm()
                                        seterrorFormAPI()
                                    }}>
                                        <Text style={[{ color: 'black', fontWeight: '400' }]}>Forgot password?</Text>
                                    </TouchableOpacity>
                                </View>

                                <CustomButton
                                    // boxWidth={'95%'}
                                    bgColor={`${isValid ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                                    onPress={() => { handleSubmit() }}
                                    style={{ marginTop: 50 }}>
                                    Login
                                </CustomButton>



                                <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text style={[{ color: 'black', fontWeight: '400' }]}>Don't have an account yet? </Text><TouchableOpacity onPress={() => {
                                        navigation.navigate("RegisterPage")
                                        resetForm()
                                        seterrorFormAPI()
                                    }} style={{}}><Text style={[{ color: 'black', fontWeight: '500' }]}> Create an account</Text></TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({})