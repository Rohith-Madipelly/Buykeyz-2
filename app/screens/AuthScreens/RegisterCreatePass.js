import { Alert,  Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch } from 'react-redux'
import GlobalStyles from '../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import TextStyles from '../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR } from '../../components/UI/config/AppContants'
import CustomTextInput from '../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'
import { LoginPageYupSchema } from '../../formikYupSchemas/Auth/LoginPageYupSchema'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/UI/Buttons/CustomButton'
import { createPasswordAPI, UserLoginApi } from '../../network/ApiCalls'
import AsyncStorage_Calls from '../../utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import { PasswordYupSchema } from '../../formikYupSchemas/Auth/PasswordYupSchema'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const LoginPage = ({ route }) => {
    const { params } = route;
    const token = params?.token || '';
    const email = params?.email || '';

    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
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
            //   email: ZInitialValues?.login?.email || "",
            //   password: ZInitialValues?.login?.password || "",
            email: "",
            password: "",
        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: PasswordYupSchema,
        validateOnBlur:false,
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
            const res = await createPasswordAPI(values,token);
            if (res) {
                toast.show(res.data.message)
                setTimeout(() => {
                    { navigation.navigate('RegisterAgreement', { token: token }); }
                }, 50);
            }
        } catch (error) {
            console.log("error console", error.response.status)
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
                    seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                                    animation={"bounceIn"}
                                    source={require("../../assets/images/appLogo/buykeyzlogo.png")}
                                    contentFit="cover"
                                    transition={1000}
                                    alt=''
                                />
                            </View>
                            <View style={{ flex: 0.7, marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginVertical: 30 }]}>Create new password</Text>

                                {/* <CustomTextInput
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
                                /> */}

<View>
    <Text>Password</Text>
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: `${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? "red" : GlobalStyles.InputBorderColor}`,
        marginVertical: 5,
    }}>
        <TextInput
            value={values.password}
            onChangeText={(e) => {
                const eWithoutSpaces = e.replace(/\s+/g, '');
                handleChange("password")(eWithoutSpaces);
                seterrorFormAPI();
            }}
            onBlur={handleBlur("password")}
            placeholder="Password"
            secureTextEntry={!show?.password}
            style={{
                height: 45,
                flex: 4,
                alignSelf: "center",
                textAlignVertical: "center"
            }}
        />
        <Pressable onPress={() => setShow({ password: !show?.password })}>
            {show?.password ? (
                <Entypo name="eye-with-line" size={20} color="black" />
            ) : (
                <Entypo name="eye" size={20} color="black" />
            )}
        </Pressable>
    </View>
    <Text style={{
        color: `${(errors.password && touched.password) || (errorFormAPI && errorFormAPI.passwordForm) ? "red" : GlobalStyles.InputBorderColor}`,
        marginLeft: 15
    }}>
        {(errors.password && touched.password) ? errors.password : (errorFormAPI && errorFormAPI.passwordForm) ? errorFormAPI.passwordForm : ``}
    </Text>
</View>


<View>
    <Text>Retype Password</Text>
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: `${(errors.retypePassword && touched.retypePassword) || (errorFormAPI && errorFormAPI.retypePasswordForm) ? "red" : GlobalStyles.InputBorderColor}`,
        marginVertical: 5,
    }}>
        <TextInput
            value={values.retypePassword}
            onChangeText={(e) => {
                const eWithoutSpaces = e.replace(/\s+/g, '');
                handleChange("retypePassword")(eWithoutSpaces);
                seterrorFormAPI();
            }}
            onBlur={handleBlur("retypePassword")}
            placeholder="Retype Password"
            secureTextEntry={!show?.retypePassword}
            style={{
                height: 45,
                flex: 4,
                alignSelf: "center",
                textAlignVertical: "center"
            }}
        />
        <Pressable onPress={() => setShow({ retypePassword: !show?.retypePassword })}>
            {show?.retypePassword ? (
                <Entypo name="eye-with-line" size={20} color="black" />
            ) : (
                <Entypo name="eye" size={20} color="black" />
            )}
        </Pressable>
    </View>
    <Text style={{
        color: `${(errors.retypePassword && touched.retypePassword) || (errorFormAPI && errorFormAPI.retypePasswordForm) ? "red" : GlobalStyles.InputBorderColor}`,
        marginLeft: 15
    }}>
        {(errors.retypePassword && touched.retypePassword) ? errors.retypePassword : (errorFormAPI && errorFormAPI.retypePasswordForm) ? errorFormAPI.retypePasswordForm : ``}
    </Text>
</View>

{/* 
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
                                /> */}
                                <View style={{ height: 10 }}>

                                </View>
                                <CustomButton
                                    // boxWidth={'95%'}
                                    onPress={() => { handleSubmit() }}
                                    style={{ marginTop: 50 }}>
                                    Sign up
                                </CustomButton>

                                {/* <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text style={[{ color: 'black', fontWeight: '400' }]}>Don't have an account yet? </Text><TouchableOpacity onPress={() => {
                                        navigation.navigate("RegisterEmail")
                                        resetForm()
                                        seterrorFormAPI()
                                    }} style={{}}><Text style={[{ color: 'black', fontWeight: '500' }]}> Create an account</Text></TouchableOpacity>
                                </View> */}
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