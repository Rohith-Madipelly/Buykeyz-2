import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { UserLoginApi } from '../../network/ApiCalls'
import AsyncStorage_Calls from '../../utils/AsyncStorage_Calls'
import { setToken } from '../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../utils/HandleCommonErrors'
import Metrics from '../../utils/resposivesUtils/Metrics'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SuccessfullyAccount = ({ route }) => {
    const { params } = route;
    const token = params?.token || 'nan';


    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();

    const [countdown, setCountdown] = useState(5); // Initial countdown in seconds
    const [autoClick, setAutoClick] = useState(false);

    const buttonHandler = () => {
        AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(token), function (res, status) {
            if (status) {
                dispatch(setToken(token));
            }
        })

    }



    useEffect(() => {
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    // Stop countdown and trigger auto-click
                    setAutoClick(true);
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(countdownInterval);
    }, []);



    const handleClick = () => {
        // Your button click logic
        Alert.alert('Button clicked!');
        // Reset autoClick state if you want to avoid multiple clicks
        setAutoClick(false);
    };

    // Auto-click the button if autoClick state is true
    useEffect(() => {
        if (autoClick) {
            buttonHandler()
        }
    }, [autoClick]);



    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
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
                            <View style={{ flex: 0.7, marginHorizontal: LEFT_AND_RIGHT_PADDING }}>

                                <Text style={[TextStyles.TEXTSTYLE_PARA_20, { marginBottom: 10, textAlign: 'center' }]}>{`Your email address verification has been completed successfully`}</Text>
                                {/* <Text style={[TextStyles.TEXTSTYLE_PARA_12, { marginBottom: 5 }]}>Enter your email address below.</Text> */}

                                <View style={{}}>
                                    <CustomButton
                                        // boxWidth={'95%'}
                                        onPress={() => { buttonHandler() }}
                                        style={{ marginTop: 50 }}>
                                        Continue
                                    </CustomButton>
                                    <Text style={{ textAlign: 'center' }}> This page will be redirected in {countdown} seconds</Text>
                                </View>

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

export default SuccessfullyAccount

const styles = StyleSheet.create({})