import { Alert, FlatList, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { GET_ALL_EMI_PLANS, GET_CHECKIN_API, SUBSCRIBE_TO_A_PLAN } from '../../../network/ApiCalls'
import GlobalStyles from '../../../components/UI/config/GlobalStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../components/UI/CustomToolKitHeader'
import { FlashList } from '@shopify/flash-list'
import { PageHandler } from '../AccoountVerificationScreen/ScreenMaintainer/PageHandler'


import RazorpayCheckout from 'react-native-razorpay'
import LoaderComponents from '../../../components/UI/Loadings/LoaderComponents'


const SubscriptionList = ({ route }) => {

    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [APIData, setAPIData] = useState([])
    const [checkinData, setCheckinData] = useState("")
    const navigation = useNavigation()
    let tokenn = useSelector((state) => state.login.token);

    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(APIData);


    // Filter data based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredData(APIData);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = APIData.filter(item =>
                item?.name?.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, APIData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiCaller()
    }, []);


    useEffect(() => {
        ApiCaller()
    }, [])




    const ApiCaller = async () => {
        try {

            //   setSpinnerbool(true)
            const res = await GET_ALL_EMI_PLANS(tokenn)
            const res2 = await GET_CHECKIN_API(tokenn)
            if (res.data) {
                setAPIData(res.data.allPlans)
                // setAPIData([1,2,3,4,5,6,7,8])
            }
            if (res2.data) {
                console.log("d>>>", res2.data)
                setCheckinData(res2.data)
            }

        } catch (error) {
            console.log("error console", error.response.status)
            if (error.response.status === 400) {
                seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
            }
            else {
                HandleCommonErrors(error)
            }
            setSpinnerbool(false)
        }
        finally {

            setTimeout(() => {
                setSpinnerbool(false)
            }, 50);

            setTimeout(() => {
                setRefreshing(false);
            }, 50)
        }
    }



    const selectedPlan = async (item) => {
        setSpinnerbool(true)
        console.log("dmnbd", item.planId)
        try {

        
            const res = await SUBSCRIBE_TO_A_PLAN(item._id, tokenn)
            console.log("dhcvjahsvd", res.data.razorPayKey)
            if (res.status == 200) {
                if (res.data.subscription) {


                    setTimeout(() => {


                        RazorpayCheckout.open({
                            key: res.data.razorPayKey,
                            subscription_id: res.data.subscription.id,
                            name: "Buykeyz",
                            description: "Monthly Subscription Plan",
                            prefill: {
                                email: "customer@example.com",
                                contact: "1234567890",
                            },
                            theme: {
                                color: "#F37254",
                            },
                        })
                            .then((data) => {
                                console.log("Payment successful:", data);
                                Alert.alert("Success", `Payment ID: ${data.razorpay_payment_id}`);

                                navigation.navigate("ManageSubscriptions")

                            })
                            .catch((error) => {
                                console.log("Payment failed:", error);
                                // Alert.alert("Payment Failed", error.description || "Something went wrong.");

                                const errorData = JSON.parse(error?.description);

                                if (errorData?.error?.reason === 'payment_cancelled') {
                                    // Payment was canceled by the user
                                    alert('You have canceled the payment.');
                                } else {
                                    // Handle other errors
                                    alert('Payment failed. Please try again.');
                                }
                                // Alert.alert("Payment Failed", error.description || "Something went wrong.");
                            });


                    }, 1000);
                }
            }
            if (res.status == 203) {
                console.log(">>>>>>>", res.data.userDetails.kycStatus)
                if (res.data.userDetails.kycStatus == "home") {
                    Alert.alert("Alert Home")
                }
                else if (res.data.userDetails.kycStatus === "personalDetails") {
                    PageHandler(1, dispatch)
                    navigation.navigate("AccountSetupComponent")
                } else if (res.data.userDetails.kycStatus === "panDetails") {
                    PageHandler(3, dispatch)
                    navigation.navigate("AccountSetupComponent")
                }
                else if (res.data.userDetails.kycStatus === "bankDetails") {
                    PageHandler(5, dispatch)
                    navigation.navigate("AccountSetupComponent")
                }
                else if (res.data.userDetails.kycStatus === "electricityVerification") {
                    PageHandler(7, dispatch)
                    navigation.navigate("AccountSetupComponent")
                }
                else if (res.data.userDetails.kycStatus === "agreement") {
                    PageHandler(9, dispatch)
                    setTimeout(() => {
                        navigation.navigate("AccountSetupComponent")
                    }, 100);
                }
            }
        }

        catch (error) {
            console.log("ro", error)
            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
            }
        }

        finally {
            setTimeout(() => {
                setSpinnerbool(false)
            }, 50);

            // setTimeout(() => {
            //     setRefreshing(false);
            // }, 50)
        }

        // console.log("checkinData?.userDetails?.accountStatus",checkinData?.userDetails?.accountStatus)

        //     if (checkinData?.userDetails?.accountStatus == false) {
        //         console.log("dshfvjsh")
        //         navigation.navigate("AccountSetupComponent")
        //     }else{
        //         console.log("sdkcdsjh")
        //         // navigation.navigate("payment")

        //     }

    }

    const [selectEMIPlan, setSelectEMIPlan] = useState("")

    const insets = useSafeAreaInsets();
    return (

        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Subscriptions"} backgroundColor={GlobalStyles.AppBackground} />
                <LoaderComponents
                visible={spinnerBool}
            />
                 <ScrollView
                    contentContainerStyle={{ backgroundColor: GlobalStyles.AppBackground }}
                >
                    {/* <View style={{ width: '100%', paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginTop: 5 }}>
                    <TextInput
                        placeholder="Search..."
                        value={searchQuery}
                        placeholderTextColor={"gray"}
                        onChangeText={(e)=>{setSearchQuery(e)}}
                        style={{
                            height: 40,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            marginBottom: 10,
                        }}
                    />
       
                </View> */}
                    <View style={{ paddingHorizontal: 10 }}>

                        <FlashList
                            data={filteredData}
                            // numColumns={2}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        selectedPlan(item)
                                        // setSelectEMIPlan(item)
                                    }}
                                    style={{
                                        flex: 1,
                                        margin: 10,
                                        padding: 15,
                                        // backgroundColor: '#f0f0f0',
                                        borderRadius: 10,
                                        borderWidth: 1.3,
                                        borderColor: '#4A3AFF'
                                    }}
                                >
                                    <Text style={{ color: '#4A3AFF', fontWeight: 700, textAlign: 'center' }}>{item.name}</Text>
                                    <View style={{ padding: 15, marginTop: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                                        {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Plan Details:</Text> */}
                                        {/* <Text style={{ fontSize: 16, marginVertical: 5 }}>Name: {item.name}</Text> */}
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Amount:</Text> {item.currency} {item.monthlyAmount}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Duration:</Text> {item.totalPlanDuration} months</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Description:</Text> {item.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={(
                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => { navigation.navigate("ManageSubscriptions") }}>
                                        <Text style={{ fontWeight: 700, color: "#4A3AFF", textDecorationLine: 'underline' }}>Manage Subscriptions</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                                    <Text>No items found</Text>
                                </View>
                            )}
                            estimatedItemSize={50}
                        />

                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default SubscriptionList

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
})