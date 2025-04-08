import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, Keyboard,  Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { APPROVE_AGREEMENT, showAgreementAPI } from "../../../../network/ApiCalls";
import { useToast } from "react-native-toast-notifications";
import CustomCheckBox from "../../../../components/UI/Inputs/CustomCheckBox";
import WebView from "react-native-webview";
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "../../../../components/UI/config/AppContants";
import GlobalStyles from "../../../../components/UI/config/GlobalStyles";
import CustomStatusBar from "../../../../components/UI/CustomStatusBar/CustomStatusBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextStyles from "../../../../components/UI/config/TextStyles";
import CustomButton from "../../../../components/UI/Buttons/CustomButton";
import LoaderComponents from "../../../../components/UI/Loadings/LoaderComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const AgreementSetup = () => {
    const navigation = useNavigation();
    const [Agreement, setAgreement] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [spinnerbool, setSpinnerbool] = useState(false)
    const dispatch = useDispatch();

    let tokenn = useSelector((state) => state.login.token);



    useEffect(() => {
        setSpinnerbool(true)
        APICaller()
    }, [])


    const toast = useToast()
    const AgreementAcceptAPICaller = async () => {
        setSpinnerbool(true)
        try {
            const res = await APPROVE_AGREEMENT(tokenn)
            if (res.data) {
                setTimeout(() => {
                    toast.hideAll()
                    toast.show(res.data.message)
                    navigation.navigate("SubscriptionList")
                }, 200);
            }

        } catch (error) {
            console.log(error)
            console.log("error console", error.response.data.message)

            // ToasterMessage("success", `Success`, `${error.response.data.message}`)

            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else if (error.response.status === 502) {
                    console.log("Internal Server Error", error)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    console.log("Outofboxerror", error.response.data.data)

                    //   ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    //   Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }
        }

        finally {
            setSpinnerbool(false)
        }
    }

    const APICaller = async () => {

        try {
            const res = await showAgreementAPI(tokenn)
            // console.log(res.data.agreement)
            setAgreement(res.data.agreement)
        } catch (error) {
            console.log(error)
            console.log("error console", error.response.data.message)
            // ToasterMessage("success", `Success`, `${error.response.data.message}`)

            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    console.log("Outofboxerror", error.response.data.data)

                    //   ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    //   Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }
        }
        finally {
            setSpinnerbool(false)
        }
    }

    const submitHandler = () => {
        AgreementAcceptAPICaller()
    }
    const insets = useSafeAreaInsets();

    return (
        <>
            <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
                <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
                <LoaderComponents
                    visible={spinnerbool}
                />
                <View style={{
                    flex: 1,
                    // marginTop: insets.top, marginBottom: insets.bottom
                }}>

                    <View
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                                               contentContainerStyle={{ flex:1, }}
                                                           >
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
                            bgColor={`${isChecked ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
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
        </>
    )
}

export default AgreementSetup

const styles = StyleSheet.create({
    TitleAgreement: {
        color: '#07005B',
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 33.89,
        letterSpacing: 0.0036,
    },
    AgreementContent: {
        fontWeight: 400,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 18,
    }
})