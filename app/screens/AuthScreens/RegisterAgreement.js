import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/UI/Buttons/CustomButton'
import { agreementAcceptAPI, showAgreementAPI, UserLoginApi } from '../../network/ApiCalls'
import { setToken } from '../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import CustomCheckBox from '../../components/UI/Inputs/CustomCheckBox'
import WebView from 'react-native-webview'
import LoaderComponents from '../../components/UI/Loadings/LoaderComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const RegisterAgreement = ({route}) => {
    const { params } = route;
    const token = params?.token || '';
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [Agreement, setAgreement] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const onRefresh = () => {
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    const insets = useSafeAreaInsets();
    console.log("insets", insets)


    const AgreementAcceptAPICaller = async () => {
        setSpinnerbool(true)
        try {
            const res = await agreementAcceptAPI(token);
            if (res.data) {
                toast.hideAll()
                toast.show(res.data.message)
                setTimeout(() => {
                    { navigation.replace('SuccessfullyAccount', { token: token }); }
                }, 200);
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

    const ApiCaller = async (values) => {
        setSpinnerbool(true)
        try {
            const res = await showAgreementAPI(token);
            if (res.data) {
                // console.log(">>>.", res.data)
                setAgreement(res.data.agreement)
            }
        } catch (error) {
            console.log("error console status", error.response.status, "error message", error.response.data.message)
            if (error.response) {
                if (error.response.status === 400) {
                    seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
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
    useFocusEffect(
        useCallback(() => {
            ApiCaller()
        }, [])
    )

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <LoaderComponents
                visible={spinnerbool}
            />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>

                <View
                    style={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                     contentContainerStyle={{ flex: 1 }}>

                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[TextStyles.TEXTSTYLE_PARA_20, { marginBottom: 5, textAlign: 'center' }]}>Agreement</Text>
                            </View>
                            <View style={{ flex: 0.89, justifyContent: 'center', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>
                                {/* <Text style={[TextStyles.TEXTSTYLE_HEADING_H1, { marginBottom: 10 }]}>Login</Text> */}

                                {Agreement && <WebView
                                    // style={styles.container}
                                    // style={[{ marginHorizontal: 20, marginVertical: 10, marginBottom: 20 }, styles.AgreementContent]}
                                    originWhitelist={['*']}
                                    source={{ html: `${Agreement}` }}
                                    injectedJavaScript={`
                        document.body.style.fontSize = '40px';
                        document.body.style.padding = '30px';
                        document.body.style.marginBottom = '30px';
                        document.body.style.lineHeight = '1.6';
                        true; // Note: This is required for the injected JS to execute properly
                      `}
                                />}


                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View>
                    <View style={{ marginLeft: 20, marginTop: 5 }}>
                        <CustomCheckBox
                            value={isChecked}
                            boxWidth={'100%'}
                            content={<Text>I agree to the agreement</Text>}
                            onValueChange={() => { setChecked(!isChecked) }}
                        />

                    </View>
                    <CustomButton
                        // boxWidth={'95%'}
                        // bgColor={`${ isChecked ? Colors.primary900 : "#C3BFF9"}`}
                         bgColor={`${ isChecked ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                        onPress={() => {
                            if (isChecked) {
                                AgreementAcceptAPICaller()
                            } else {
                                Alert.alert("Please Select the Terms and Conditions")
                            }
                        }}
                        style={{ marginTop: 50 }}>
                        Agreed
                    </CustomButton>
                </View>
            </View>
        </View>
    )
}

export default RegisterAgreement

const styles = StyleSheet.create({})