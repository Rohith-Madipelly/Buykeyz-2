import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/UI/Buttons/CustomButton';
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar';
import GlobalStyles from '../../components/UI/config/GlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PlaceOrderSuccessfully = ({ route }) => {
    const message = route.params?.message || "";
    const [countdown, setCountdown] = useState(5)
    const [autoClick, setAutoClick] = useState(false)

    const dispatch = useDispatch();
    const navigation = useNavigation();


    const buttonHandler = () => {
        navigation.navigate("OrderTransactions")
        // ASO.setTokenJWT("Token", JSON.stringify(token), function (res, status) {
        //     if (status) {
        //         dispatch(setToken(token));
        //     }
        // })
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
    const insets = useSafeAreaInsets();
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
                    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 18 }}>
                        <View style={{ flex: 0.2 }}>

                        </View>

                        <View style={{ position: 'absolute', top: 20, left: 20 }}>

                            <TouchableOpacity onPress={() => { navigation.navigate("BottomTabScreen") }} style={{}}>
                                <Ionicons name="arrow-back" size={25} color="#07005B" />

                            </TouchableOpacity>
                        </View>

                        <LottieView
                            autoPlay loop
                            // ref={animation}
                            style={{
                                width: 200,
                                height: 200,
                                // backgroundColor: '#eee',
                            }}
                            source={require('../../assets/lottifile/Animation2.json')}
                        />
                        {/* <Text>Order placed successfully</Text> */}
                        <Text>{message}</Text>
                        {/* <Title TitleName="Order placed successfully"></Title>


                        <CustomSpan TextLine={message}
                            style={{
                                textAlign: 'center', // Centers text horizontally
                                textAlignVertical: 'center', // Centers text vertically (only for Android)
                                fontSize: 15,
                            }}></CustomSpan> */}

                        <CustomButton
                            boxWidth={'95%'}
                            onPress={buttonHandler}
                            // leftIcon={<Entypo
                            //   // style={styles.icon}
                            //   name={'login'} size={18} color={'white'} />}
                            //  bgColor={`${!isValid ? "rgba(220, 142, 128, 0.9)" : "rgba(242, 142, 128, 1)"}`}
                            // bgColor={"rgba(220, 142, 128, 0.9)"}
                            style={{ marginTop: 50 }}>Continue</CustomButton>
                        <Text> This page will be redirected in {countdown} seconds </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default PlaceOrderSuccessfully

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    ContentBox: {
        flex: 0.7,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',


        paddingTop: 36,
        paddingHorizontal: 17
    }
})