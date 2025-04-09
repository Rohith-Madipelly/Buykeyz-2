import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from 'react-redux'
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
import { resendRegisterOpt, UserLoginApi, UserRegisterOTPApi, verifyOTPAPI } from '../../network/ApiCalls'
import AsyncStorage_Calls from '../../utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import CustomCheckBox from '../../components/UI/Inputs/CustomCheckBox'
import { RegisterPageYupSchema } from '../../formikYupSchemas/Auth/RegisterPageYupSchema'
import CustomOtpInput4 from '../../components/UI/Inputs/CustomOtpInput4'
import { VerifyOtpYupSchema } from '../../formikYupSchemas/Auth/VerifyOtpYupSchema'
import CustomOtpInput from '../../components/UI/Inputs/CustomOtpInput'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const RegisterVerifty = ({ route }) => {
    const { params } = route;
    const token = params?.token || '';
    const email = params?.email || '';

    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [isChecked, setChecked] = useState(false);
    const [clearOtp, setClearOtp] = useState(false);
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRefresh = () => {
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    const insets = useSafeAreaInsets();
    console.log("insets", insets)




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
            otp: ""
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: VerifyOtpYupSchema,
        validateOnBlur: false,
        validate: values => {
            const errors = {};
            return errors;
        },

    })

    const submitHandler = async (values) => {
        seterrorFormAPI()
        setSpinnerbool(true)
        setShow({ password: false })
        try {
            const res = await verifyOTPAPI(values, token);
            if (res) {
                toast.hideAll()
                toast.show(res.data.message)
                setTimeout(() => {
                    { navigation.navigate('RegisterCreatePass', { token: token }); }
                    setSpinnerbool(false)
                }, 50);
            }

        } catch (error) {
            console.log("error console", error.response.status, " error.response", error.response.data.message)
            if (error.response) {
                if (error.response.status === 400) {
                    // CustomAlerts_OK(error.response.data.message, "", () => {
                    //     setTimeout(() => {
                    //         navigation.navigate("SignAgreement", { token: token })
                    //     }, 500);
                    // })
                    Alert.alert(error.response.data.message, "", [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Login'), // Navigate to Login screen
                        },
                    ],
                        { cancelable: false })
                }
                else if (error.response.status === 403) {
                    seterrorFormAPI({ otp: `${error.response.data.message}` })
                    setTimeout(() => {
                        resetForm({
                            values: { otp: '' },
                            //   // errors: { name: 'Something special' }, 
                        })
                    }, 200)
                }
                else if (error.response.status === 404) {
                    console.log("Error With 404.")
                    seterrorFormAPI({ otp: `${error.response.data.message}` })
                }

                else if (error.response.status === 500) {
                    Alert.alert(error.response.data.message)
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 429) {
                    Alert.alert(error.response.data.message)
                    console.log("Error With 429.", error)
                }
                else {
                    Alert.alert(error.response.data.message, "code")
                    console.log("An error occurred response.")
                }
            }
            else {
                HandleCommonErrors(error)
            }

            setSpinnerbool(false)
        }
        finally {
            setSpinnerbool(false)
        }

    }


    const ResendOtpApiCaller = async () => {
        try {
            const res = await resendRegisterOpt(token)
            if (res.data) {
                toast.hideAll()
                toast.show(res.data.message)
            }
        } catch (error) {
            console.log("Error")
            Alert.alert(error.response.data.message)
        }
    }







    const [disabled, setDisabled] = useState(true);
    const [timer, setTimer] = useState(45);

    const handleResend = () => {
      if (disabled) return;

      ResendOtpApiCaller();
      resetForm();
      seterrorFormAPI();

      setDisabled(true);
      setTimer(45); // 45 seconds delay
    };

    useEffect(() => {
      let interval;
      if (disabled && timer > 0) {
        interval = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
      } else if (timer === 0 && disabled) {
        setDisabled(false);
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [timer, disabled]);

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
                            {/* <View style={{ flex: 0.15, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image
                                    style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                                    animation={"bounceIn"}
                                    source={require("../../assets/images/appLogo/buykeyzlogo.png")}
                                    contentFit="cover"
                                    transition={1000}
                                    alt=''
                                />
                            </View> */}
                            <View style={{ flex: 0.7, justifyContent: 'center', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginBottom: 10 }]}>{`Verification code`}</Text>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 35 }]}>We have sent the verification code to your email address.</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                                    <CustomOtpInput
                                        value={values.otp}
                                        length={6}
                                        keyboardType="number-pad"
                                        onOtpSubmit={(otp) => {
                                            // console.log("otp vachinda", otp);
                                            seterrorFormAPI() //Clear's All API errors
                                            handleChange("otp")(otp)
                                        }}
                                        onChangeText={(index, value) => {
                                            // console.log("index", index, ">value", value)
                                        }}
                                        // errorMessage={errorFormAPI.otp}
                                        errorMessage={`${(errors.otp && touched.otp) ? `${errors.otp}` : (errorFormAPI && errorFormAPI.otp) ? `${errorFormAPI.otp}` : ``}`}

                                        errorBoxid={errorFormAPI ? [0, 1, 2, 3,] : ""}
                                    // onClear={clearOtp}
                                    />
                                </View>



                                <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={()=>{handleResend()}} disabled={disabled}
                                        >
                                        <Text style={{ color: disabled ? 'gray' : 'black', fontWeight: '500' }}>
                                            {disabled ? `Resend in ${timer}s` : 'Resend'} 
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => { ResendOtpApiCaller() }}
                                    >
                                        <Text style={{ color: disabled ? 'gray' : 'black', fontWeight: '500' }}>
                                            {'Resend'}
                                        </Text>
                                    </TouchableOpacity>
                                </View> */}

                                <CustomButton
                                    // boxWidth={'95%'}
                                    onPress={() => {
                                        // if(isChecked){
                                        handleSubmit()
                                        // }else{
                                        //     Alert.alert("Please Select the Terms and Conditions")
                                        // }
                                    }}
                                    bgColor={`${isValid ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                                    style={{ marginTop: 50 }}>
                                    Next
                                </CustomButton>


                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterVerifty

const styles = StyleSheet.create({})