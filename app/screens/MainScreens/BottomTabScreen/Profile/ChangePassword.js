import { Alert, Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../../../components/UI/config/AppContants'
import CustomTextInput from '../../../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { PasswordYupSchema } from '../../../../formikYupSchemas/Auth/PasswordYupSchema'
import { CHANGE_OLD_PASSWORD_API, createPasswordAPI } from '../../../../network/ApiCalls'
import { ChangePasswordYupSchema } from '../../../../formikYupSchemas/Auth/ChangePasswordYupSchema'
import { TokenLogoutAlert } from '../../../../utils/LogOutHandle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
const ChangePassword = () => {
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState({
        oldPassword: false,
        password: false,
        retypePassword: false,
    });

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
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
            oldPassword: "",
            password: "",
            retypePassword: "",
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: ChangePasswordYupSchema,
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
            const res = await CHANGE_OLD_PASSWORD_API(values, tokenn);
            if (res.data) {
                console.log("res", res.data)
                toast.show(res.data.message)
                resetForm()
                setTimeout(() => {
                    navigation.goBack()
                    // { navigation.navigate('RegisterAgreement', { token: tokenn }); }
                }, 50);
            }
        } catch (error) {
            console.log("error console", error.response.status)

            if (error.response.status === 400) {
                seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
            }
            else if (error.response.status === 401) {
                TokenLogoutAlert()
            }
            else if (error.response.status === 422) {
                seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <LoaderComponents
                visible={spinnerbool}
            />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Change Password"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        contentContainerStyle={{ flex: 1, }}
                    >
                        <View style={{ flex: 1, paddingHorizontal: LEFT_AND_RIGHT_PADDING }}>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                                    animation={"bounceIn"}
                                    source={require("../../../../assets/images/appLogo/buykeyzlogo.png")}
                                    contentFit="cover"
                                    transition={1000}
                                    alt=''
                                />
                            </View>





                            <CustomTextInput
                                boxWidth={'100%'}
                                label={'Old password'}
                                bgColor={'transparent'}
                                asterisksymbol={true}
                                placeholder='Old password'
                                name='oldPassword'
                                secure={!show?.oldPassword}
                                rightIcon={<Pressable onPress={() =>
                                    // setShow({ ...setShow, password: !show?.password })
                                    setShow({ oldPassword: !show?.oldPassword })
                                }>
                                    {show?.oldPassword ? (
                                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                                        <Entypo name="eye" size={20} color="black" />)
                                    }
                                </Pressable>
                                }
                                value={values.oldPassword}
                                onChangeText={(e) => {
                                    const eWithoutSpaces = e.replace(/\s+/g, '');
                                    handleChange("oldPassword")(eWithoutSpaces); seterrorFormAPI();
                                }}
                                onBlur={handleBlur("oldPassword")}
                                // validate={handleBlur("password")}
                                outlined
                                borderColor={`${(errors.oldPassword && touched.oldPassword) || (errorFormAPI && errorFormAPI.oldPasswordForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                errorMessage={`${(errors.oldPassword && touched.oldPassword) ? `${errors.oldPassword}` : (errorFormAPI && errorFormAPI.oldPasswordForm) ? `${errorFormAPI.oldPasswordForm}` : ``}`}
                            />

                            <CustomTextInput
                                boxWidth={'100%'}
                                label={'Password'}
                                bgColor={'transparent'}
                                asterisksymbol={true}
                                placeholder='Password'
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


                            <CustomTextInput
                                boxWidth={'100%'}
                                label={'Retype Password'}
                                bgColor={'transparent'}
                                asterisksymbol={true}
                                placeholder={'Retype Password'}
                                secure={!show?.retypePassword}
                                rightIcon={<Pressable onPress={() =>
                                    // setShow({ ...setShow, password: !show?.password })
                                    setShow({ retypePassword: !show?.retypePassword })
                                }>
                                    {show?.retypePassword ? (
                                        <Entypo name="eye-with-line" size={20} color="black" />) : (
                                        <Entypo name="eye" size={20} color="black" />)
                                    }
                                </Pressable>
                                }
                                value={values.retypePassword}
                                onChangeText={(e) => {
                                    const eWithoutSpaces = e.replace(/\s+/g, '');
                                    handleChange("retypePassword")(eWithoutSpaces); seterrorFormAPI();
                                }}
                                onBlur={handleBlur("retypePassword")}
                                // validate={handleBlur("password")}
                                outlined
                                borderColor={`${(errors.retypePassword && touched.retypePassword) || (errorFormAPI && errorFormAPI.retypePasswordForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                errorMessage={`${(errors.retypePassword && touched.retypePassword) ? `${errors.retypePassword}` : (errorFormAPI && errorFormAPI.retypePasswordForm) ? `${errorFormAPI.retypePasswordForm}` : ``}`}
                            />
                            <View style={{ flex: 0.7, justifyContent: 'flex-start', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <CustomButton
                                    // boxWidth={'95%'}
                                    bgColor={`${isValid ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                                    onPress={() => { handleSubmit() }}
                                    style={{ marginTop: 50 }}>
                                    Add Address
                                </CustomButton>
                                <View style={{ height: 400 }}>

                                </View>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({})