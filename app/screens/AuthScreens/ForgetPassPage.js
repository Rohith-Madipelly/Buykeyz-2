import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
import { FORGOT_PASSWORD_SEND_OTP_API, UserLoginApi, UserRegisterOTPApi } from '../../network/ApiCalls'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import CustomCheckBox from '../../components/UI/Inputs/CustomCheckBox'
import { RegisterPageYupSchema } from '../../formikYupSchemas/Auth/RegisterPageYupSchema'
import BackIcon from '../../assets/svg/BackIcon'
import { ForgetYupSchema } from '../../formikYupSchemas/Auth/ForgetYupSchema'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const ForgetPassPage = () => {

    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [isChecked, setChecked] = useState(false);

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
            email: "",
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: ForgetYupSchema,
        validateOnBlur: false,
        validate: values => {
            const errors = {};
            return errors;
        },

    });



    const submitHandler = async (values) => {
        seterrorFormAPI()
        setSpinnerbool(true)
        setShow({ password: false })
        try {
            const res = await FORGOT_PASSWORD_SEND_OTP_API(values);
            if (res.data) {
                console.log("res.", res.data)
                if (res.status === 200) {
                    toast.hideAll()
                    toast.show(res.data.message)
                    setTimeout(() => {
                        { navigation.navigate('ForgotOtpVerifty', { email: values.email, token: res.data.token }); }
                        setSpinnerbool(false)
                        toast.hideAll()
                    }, 500);
                }
            }
        } catch (error) {
            console.log("error console >", error.response.status, " error.response", error.response.data.message)
            // seterrorFormAPI({ emailForm: `${error.response.data.message}` })
            // if (error.response) {
            if (error.response.status === 402) {
                seterrorFormAPI({ emailForm: `${error.response.data.message}` })
            }
            else if (error.response.status === 422) {
                seterrorFormAPI({ emailForm: `${error.response.data.message}` })
            }
            // }
            else {
                HandleCommonErrors(error)
            }

            setSpinnerbool(false)
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

                            <TouchableOpacity style={{
                                position: 'absolute',
                                // marginTop: Metrics.rfv(20),
                                // marginLeft: LEFT_AND_RIGHT_PADDING,
                                 borderRadius: 30,
                                // backgroundColor: "red",
                                // padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                onPress={() => { navigation.goBack() }}>
                                <View style={{
                                    // position: 'absolute',
                                    marginTop: Metrics.rfv(20), marginLeft: LEFT_AND_RIGHT_PADDING,
                                    borderRadius: 30,
                                    backgroundColor: PRIMARY_LIGHT_COLOR,

                                }}>
                                    <BackIcon />

                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 0.1, justifyContent: 'flex-end', alignItems: 'center' }}>
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

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginBottom: 10 }]}>{`Forgot password?`}</Text>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 5 }]}>Enter your email address below.</Text>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 10 }]}>We will send a 4 digit verification code to verify your email address</Text>

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    label={'Email address'}
                                    placeholder={'Enter email address'}
                                    bgColor={'transparent'}
                                    asterisksymbol={true}
                                    value={values.email}
                                    autoFocus={true}
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




                                {/* <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("EmailVerificationForget")
                                        resetForm()
                                        seterrorFormAPI()
                                    }}>
                                        <Text style={[{ color: 'black', fontWeight: '400' }]}>Forgot password?</Text>
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

export default ForgetPassPage

const styles = StyleSheet.create({})