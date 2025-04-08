import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector, } from 'react-redux'
import GlobalStyles from '../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextStyles from '../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../components/UI/config/AppContants'
import CustomTextInput from '../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'

import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/UI/Buttons/CustomButton'
import { UserRegisterOTPApi } from '../../network/ApiCalls'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import CustomCheckBox from '../../components/UI/Inputs/CustomCheckBox'
import { RegisterPageYupSchema } from '../../formikYupSchemas/Auth/RegisterPageYupSchema'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const RegisterPage = () => {
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [isChecked, setChecked] = useState(false);

    let fcmTokenRedux = useSelector((state) => state?.fcmTokenReducer?.fcmToken||"");


    console.log("fcmTokenRedux >>", fcmTokenRedux)

    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()


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
            fullName: "",
            email: "",
            phoneNumber: "",
            iAgree: "",
            fcmToken: fcmTokenRedux || "" 
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: RegisterPageYupSchema,
        validateOnBlur: false,
        validate: values => {
            const errors = {};
            return errors;
        },

    });

    const submitHandler = async (values) => {
        if (isChecked) {
            seterrorFormAPI()
            setSpinnerbool(true)
            try {
                const res = await UserRegisterOTPApi(values);
                if (res.data) {
                    if (res.status === 200) {
                        console.log("res.data", res.data)
                        toast.show(res.data.message)
                        setTimeout(() => {
                            { navigation.navigate('RegisterVerifty', { email: values.email, token: res.data.token }); }
                            setSpinnerbool(false)
                        }, 50);
                    }
                    else if (res.status === 202) {
                        seterrorFormAPI({ emailForm: res.data.message })
                        toast.show(res.data.message)
                        CustomAlerts_OK(res.data.message, "Tap OK to proceed to the login screen.", () => {
                            // toast.show("Moving to Login")
                            setTimeout(() => {
                                { navigation.navigate('Login', { email: email }); }
                            }, 500);
                        })
                    }
                    else {
                        Alert.alert("Error Missing", "res.status")
                    }
                }
            } catch (error) {
                console.log("error console", error.response.status, " error.response", error.response.data.message)
                if (error.response) {
                    if (error.response.status === 400) {
                        seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
                    }
                    else if (error.response.status === 401) {
                        seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
                    }
                    else if (error.response.status === 404) {
                        seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                    }
                    else if (error.response.status === 422) {
                        if (error.response.data.message == "Email already existed, please login") {
                            seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                        }
                        else if (error.response.data.message == "Phone number already existed, please login") {
                            seterrorFormAPI({ phoneNumberForm: `${error.response.data.message}` })
                        }
                    }
                    else if (error.response.status === 301) {
                        navigation.navigate('VerificationCode', { email: values.email })
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
        } else {
            Alert.alert("Please Select the Terms and Conditions")
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
                           contentContainerStyle={{ flex:1, }}
                       >
                        <View style={{ flex: 1, }}>

                            <View style={{ flex: 0.7, justifyContent: 'center', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginBottom: 10 }]}>{`Signup \nEmail Verification`}</Text>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 5 }]}>Enter your email address below.</Text>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 10 }]}>We will send a 4 digit verification code to verify your email address</Text>
                                <CustomTextInput
                                    boxWidth={'100%'}
                                    label={'Full name'}
                                    placeholder={'Enter full name'}
                                    bgColor={'transparent'}
                                    asterisksymbol={true}
                                    value={values?.fullName}
                                    onChangeText={(e) => {
                                        handleChange("fullName")(e)
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("fullName")}
                                    // validate={handleBlur("fullName")}
                                    outlined
                                    borderColor={`${(errors?.fullName && touched?.fullName) || (errorFormAPI && errorFormAPI?.fullNameForm) ? "red" : GlobalStyles?.InputBorderColor}`}
                                    errorMessage={`${(errors?.fullName && touched?.fullName) ? `${errors?.fullName}` : (errorFormAPI && errorFormAPI?.fullNameForm) ? `${errorFormAPI?.fullNameForm}` : ``}`}
                                />

                                


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
                                    label={'Email Phone Number'}
                                    placeholder={'Enter phoneNumber'}
                                    bgColor={'transparent'}
                                    asterisksymbol={true}
                                    value={values.phoneNumber}
                                    onChangeText={(e) => {
                                        // Remove any non-numeric characters
                                        let numericValue = e.replace(/[^0-9]/g, '');

                                        // Limit to 10 digits
                                        numericValue = numericValue.slice(0, 10);

                                        // Only call handleChange if the numeric value is not empty
                                        if (numericValue !== '') {
                                            handleChange('phoneNumber')(numericValue);
                                        } else {
                                            handleChange('phoneNumber')(''); // Reset to empty if cleared
                                        }
                                        // Reset any error message if needed
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("phoneNumber")}
                                    // validate={handleBlur("phoneNumber")}
                                    keyboardType={'phone-pad'}
                                    outlined
                                    borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                    errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                />


                                <View style={{ marginLeft: 10, marginTop: 5 }}>


                                    <CustomCheckBox
                                        value={isChecked}
                                        boxWidth={'100%'}

                                        content={<Text>I agree to the <Text
                                            style={{ color: 'blue', textDecorationLine: 'underline' }}
                                            onPress={() => {
                                                console.log("djvhshc");
                                                navigation.navigate('TermsandConditions');
                                            }}>terms and conditions</Text>.</Text>}

                                        onValueChange={() => {
                                            setChecked(!isChecked)
                                        }}
                                        errorMessage={`${(errors.iAgree && touched.iAgree) ? `${errors.iAgree}` : (errorFormAPI && errorFormAPI.iAgreeForm) ? `${errorFormAPI.iAgreeForm}` : ``}`}
                                    />

                                </View>
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
                                    bgColor={`${isValid && isChecked ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                                    style={{ marginTop: 50 }}>
                                    Next
                                </CustomButton>

                                <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text style={[{ color: 'black', fontWeight: '400' }]}>Already registered ?</Text><TouchableOpacity onPress={() => {
                                        navigation.navigate("Login")
                                        resetForm()
                                        seterrorFormAPI()
                                    }} style={{}}><Text style={[{ color: 'black', fontWeight: '500' }]}> Login</Text></TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default RegisterPage

const styles = StyleSheet.create({})