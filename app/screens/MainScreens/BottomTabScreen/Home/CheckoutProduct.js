import { Alert, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useToast } from 'react-native-toast-notifications'
import { GET_ALL_ADDRESSES_API, PAYOUT_CREATE_ORDER_API } from '../../../../network/ApiCalls'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import moment from 'moment'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import RazorPayModule from '../../../../components/RazorPayModule/RazorPayModule'
import { FontAwesome5 } from '@expo/vector-icons'


const CheckoutProduct = ({ route }) => {
    const productId = route.params?.productId || ""
    const quantity = route.params?.quantity || ""
    const productData = route.params?.productData || ""

    const insets = useSafeAreaInsets();
    // deliveryChargeStatus

    const [productItems, setProductItems] = useState(productId)
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [selectLocation, setSelectLocation] = useState("")
    const [openAddress, setOpenAddress] = useState(false)


    const [APIData, setAPIData] = useState(false)
    const [APIData2, setAPIData2] = useState(false)
    const navigation = useNavigation()
    let tokenn = useSelector((state) => state.login.token);
    const [errorFormAPI, seterrorFormAPI] = useState({})
    const scrollViewRef = useRef()
    const toast = useToast()


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // if (isConnected) {
        ApiCaller()
        // }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getLocationsfromapi()
        }, [])
    )

    const [allLocations, setAllLocations] = useState("")
    const getLocationsfromapi = async () => {
        try {
            const res = await GET_ALL_ADDRESSES_API(tokenn)
            if (res.data) {
                // console.log("res GET_ALL_ADDRESSES_API", res.data.allAddresses)
                setAllLocations(res.data?.allAddresses)
                if (res.data?.allAddresses.length > 0) {
                    setSelectLocation(res.data?.allAddresses[0])
                } else {
                    setSelectLocation('')
                }
            }
        } catch (error) {
            if (error) {
                console.log("sadvhgacdj", error.response.data.message)
            }
        } finally {

        }
    }


    const ApiCaller = async () => {
        try {

            //   setSpinnerbool(true)
            const res = await GET_SINGLE_PRODUCT(productId, tokenn)
            if (res) {
                setAPIData(res.data.productDetails)
                setAPIData2(res.data.similarProducts)
            }


        } catch (error) {
            console.log(error)
            console.log(error.response.data)
            if (error.response) {
                if (error.response.status === 400) {
                    // Alert.alert(error.response.data.message) 
                    seterrorFormAPI({ product: `${error.response.data.message}` })
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 429) {
                    // Alert.alert(error.response.data.message,"Contact support")

                    Alert.alert(error.response.data.message, "Contact support", [

                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Continue to next page',
                            onPress: () => {
                                // PageHandler(3,dispatch)
                                navigation.navigate("VerificationCodePhoneNumber")
                            },
                        },
                        // { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])


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
                    console.log("Outofboxerror", error.response.data.message)

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



            if (error) {
            }
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

    const IncrementProduct = () => {
        if (productItems < APIData.quantity) {
            setProductItems(productItems + 1)
        } else {
            Alert.alert(`Only ${APIData.quantity} items are available`)
        }
    }

    const DecrementProduct = () => {
        if (productItems > 1) {
            setProductItems(productItems - 1)
        }
        else {
            Alert.alert("Your can not decrease less then 1")
        }
    }


    const [readMore, setReadMore] = useState(false)

    const [heightx, setHeight] = useState(0);
    const [selectedType, setSelectedType] = useState('online');



    // API call for Add to cart 
    const BuyProductAPI = async () => {
        try {
            var apiReqData = {
                productId: productId,
                type: selectedType,
                addressId: selectLocation._id,
                quantity: quantity,
            }
            setSpinnerbool(true)
            const res = await PAYOUT_CREATE_ORDER_API(apiReqData, tokenn)
            if (res) {
                console.log(" wekkj", res.data)
                var orderData = await res.data.orders
                console.log("dsnhvg ...............................", res.data, orderData)
                console.log("dsnhvg ...............................[]", res.data.razorPayKey)

                if (res.data.orders) {
                    console.log("avhdgcwj kk", res.data.orders)
                    RazorPayModule("", orderData, tokenn, navigation,res.data.razorPayKey)
                } else {
                    console.log
                    toast.hideAll()
                    toast.show(res.data.message)
                    setTimeout(() => {
                        navigation.replace("PlaceOrderSuccessfully", { message: `${res.data.message}` })
                    }, 20);

                }
            }

        } catch (error) {
            console.log(error)

            if (error.response) {
                if (error.response.status === 400) {
                    // Alert.alert(error.response.data.message) 
                    seterrorFormAPI({ product: `${error.response.data.message}` })
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    // Alert.alert(error.response.data.message, "Try to login again")
                    console.log("hdvcjs", error.response.data)
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data}` })
                }
                else if (error.response.status === 429) {
                    // Alert.alert(error.response.data.message,"Contact support")

                    Alert.alert(error.response.data.message, "Contact support", [

                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Continue to next page',
                            onPress: () => {
                                // PageHandler(3,dispatch)
                                navigation.navigate("VerificationCodePhoneNumber")
                            },
                        },
                        // { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])


                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                    Alert.alert(
                        "Something Went Wrong",
                        "Please try again later or try Online Pay."
                    );
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    console.log("Outofboxerror", error.response.data.message)

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



            if (error) {
            }
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


    const DeleteAddress = async (id) => {
        console.log("sdjbchs", id)
        if (selectLocation._id == id) {
            console.log("dhvshvjs")
        }
        try {
            setSpinnerbool(true)
            const res = await DELETE_ADDRESSES_API(id, tokenn)
            if (res) {
                console.log(" wekkj", res.data)
                getLocationsfromapi()
            }

        } catch (error) {
            console.log(error)

            if (error.response) {
                if (error.response.status === 400) {
                    // Alert.alert(error.response.data.message) 
                    seterrorFormAPI({ product: `${error.response.data.message}` })
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    // Alert.alert(error.response.data.message, "Try to login again")
                    console.log("hdvcjs", error.response.data)
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data}` })
                }
                else if (error.response.status === 429) {
                    // Alert.alert(error.response.data.message,"Contact support")

                    Alert.alert(error.response.data.message, "Contact support", [

                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Continue to next page',
                            onPress: () => {
                                // PageHandler(3,dispatch)
                                navigation.navigate("VerificationCodePhoneNumber")
                            },
                        },
                        // { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])


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
                    console.log("Outofboxerror", error.response.data.message)

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



            if (error) {
            }
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


    const hGST = false
    const hDC = productData.deliveryChargeStatus == "Active" ? true : false

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>

                <CustomToolKitHeader componentName={"Checkout"} />
                <View style={{ width: '100%', height: '100%', }}>
                    <ScrollView
                        ref={scrollViewRef}
                    // contentContainerStyle={{ height:'100%' }}
                    >
                        <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                setHeight(height);
                            }}>
                            <View style={[{ backgroundColor: 'white', width: '95%', margin: 3, borderRadius: 10, marginVertical: 5, paddingBottom: 10, }, GlobalStyles.productBoxdropDownShadow2]}>
                                <View style={{ margin: 3 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', }}>
                                        {/* {console.log("dvjhb",item)} */}
                                        <TouchableOpacity
                                            // onPress={() => { navigation.navigate("ProductItem", { productId: item.product }) }}
                                            style={{ width: '40%', height: Metrics.height * 0.17, overflow: 'hidden' }}
                                        >
                                            <LoadingImage
                                                source={{ uri: productData?.pictures[0] }}
                                                style={{
                                                    width: '100%', height: Metrics.height * 0.2,
                                                    contentFit: "center"
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <View
                                            style={{ width: '60%', height: Metrics.height * 0.17, }}
                                        >
                                            <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5 }} numberOfLines={2}>{productData.brand} {productData.name} {productData.model}</Text>
                                            {/* {APIData.brand} {APIData.name} {APIData.model} */}



                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                                <View>
                                                    <Text style={[TextStyles.TEXTSTYLE_C20, { color: '#E29547', width: '100%', fontWeight: 800, fontSize: 20, marginBottom: 2 }]}
                                                        numberOfLines={2}
                                                    >
                                                        ₹ {productData?.discountedPrice?.toLocaleString('en-IN') || ""}
                                                    </Text>
                                                    <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4' }]}
                                                        numberOfLines={2}
                                                    >
                                                        ₹ {productData?.originalPrice?.toLocaleString('en-IN') || ""}
                                                    </Text>
                                                </View>
                                                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                                    <View style={{ backgroundColor: 'red', alignItems: 'center', borderRadius: 3, }}>
                                                        <Text style={{
                                                            textAlign: 'center', textAlignVertical: 'center', padding: 3,
                                                            color: 'white', width: '100%', fontWeight: 800, fontSize: 12, marginBottom: 2, paddingLeft: 5,
                                                        }}>-{productData?.discount} %</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10 }}>

                                        <Text style={[{ fontWeight: 800 }]}>
                                            Order placed date : <Text style={{ fontWeight: 600 }}>
                                                {moment(productData.createdAt).format('DD-MM-YYYY')}</Text>
                                        </Text>


                                        {productData.estimatedDelivery && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                            Estimated Delivery date : <Text style={{ fontWeight: 600 }}>
                                                {productData.estimatedDelivery}
                                            </Text>
                                        </Text>}

                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Price
                                            </Text>}
                                            {productData.originalPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600, textDecorationLine: 'line-through', }}>
                                                    {productData?.originalPrice?.toLocaleString('en-IN')} ₹
                                                </Text>
                                            </Text>}
                                        </View>

                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Discounted (%)
                                            </Text>}
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600 }}>
                                                    {productData?.discount} %
                                                </Text>
                                            </Text>}
                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5), }]}>
                                                Discounted Price
                                            </Text>}
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600 }}>
                                                    {productData?.discountedPrice?.toLocaleString('en-IN')} ₹
                                                </Text>
                                            </Text>}
                                        </View>



                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Quantity
                                            </Text>}
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600 }}>
                                                    {quantity}
                                                </Text>
                                            </Text>}
                                        </View>

                                        {/* <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.gst && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                GST <Text style={{ color: 'green' }}></Text>
                                            </Text>}
                                            {productData.gst && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600, textDecorationLine: hGST ? "" : 'line-through', }}>
                                                    {(productData?.gst)}%
                                                </Text>
                                            </Text>}
                                        </View> */}

                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.deliveryCharge && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Delivery Charges {hDC ? "" : <Text style={{ color: 'green' }}>(Free)</Text>}
                                            </Text>}
                                            {productData.deliveryCharge && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600, textDecorationLine: hDC ? "" : 'line-through', }}>
                                                    {(productData?.deliveryCharge).toLocaleString('en-IN')} ₹
                                                </Text>
                                            </Text>}
                                        </View>



                                        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Total Amount
                                            </Text>}
                                            {productData.discountedPrice && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                <Text style={{ fontWeight: 600 }}>
                                                    {(productData?.discountedPrice * quantity + (hDC ? productData?.deliveryCharge : 0) + (hGST ? ((productData?.discountedPrice * productData?.gst) / 100) : 0)).toLocaleString('en-IN')} ₹
                                                </Text>
                                            </Text>}
                                        </View>

                                        {/* <Text style={[{ fontWeight: 400, fontSize: 14 }]} >
                                    <Text style={{ fontWeight: 900 }}>
                                        Delivery Address : </Text>{item.address} {item.landMark} {item.pincode}
                                </Text> */}

                                        {/* {item.status && <Text style={[{ fontWeight: 800, marginTop: Metrics.rfv(5) }]}>
                                    Delivery status : <Text style={{ fontWeight: 600 }}>
                                        {item.status}
                                    </Text>
                                </Text>} */}
                                        {/* <View style={{ backgroundColor: item.status == "Paid" ? "#008000" : '#cd1c18', padding: 5, borderRadius: 5, paddingHorizontal: 10, minWidth: 100 }}>
                                            <Text style={{ color: item.status == "Paid" ? "07005B" : '', textAlign: 'center' }}>Payment : {item.status}</Text>
                                        </View> */}
                                        {/* <View style={{ width: '100%', height: Metrics.height * 0.1, justifyContent: 'center', alignItems: 'center' }}> */}
                                        {/* <Pressable
                                        onPress={() => { }}
                                        style={{ backgroundColor: '#4A3AFF', padding: 10, borderRadius: 5, paddingHorizontal: 20, minWidth: 100 }}>
                                        <Text style={{ color: item.status == "Paid" ? "07005B" : '', textAlign: 'center', color: 'white', fontWeight: 700 }}>View Order Deatils</Text>
                                    </Pressable> */}
                                        {/* </View> */}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', width: '100%' }}
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                setHeight(heightx);
                            }}>
                            <View style={{ paddingHorizontal: 10, }}>
                                <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                    Select Delivery Type
                                </Text>
                                {/* <Text></Text> */}
                            </View>

                            <View style={[{ width: '100%', height: 50, alignSelf: 'center', marginVertical: 5, }]}>
                                <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: '100%', gap: 10 }}>
                                    <TouchableOpacity style={{
                                        width: "40%",
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: selectedType === 'online' ? 2 : 1,
                                        borderColor: selectedType === 'online' ? 'blue' : 'gray',
                                        borderRadius: 10
                                    }}
                                        onPress={() => setSelectedType('online')}
                                    >
                                        <Text>Online Pay</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width: "40%",
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: selectedType === 'cod' ? 2 : 1,
                                        borderColor: selectedType === 'cod' ? 'blue' : 'gray',
                                        borderRadius: 10
                                    }}
                                        onPress={() => setSelectedType('cod')}
                                    >
                                        <Text style={{ textAlign: 'center' }}> Cash on Delivery (COD)</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </View>

                        {selectLocation && <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                            <View style={[{ backgroundColor: 'white', width: '95%', margin: 3, borderRadius: 10, marginVertical: 5, paddingBottom: 10, }, GlobalStyles.productBoxdropDownShadow2]}>
                                <View style={{ margin: 3 }}>
                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[{ fontWeight: 800 }]}>
                                                Delivering to
                                            </Text>
                                            <TouchableOpacity style={{}}
                                                onPress={() => { navigation.navigate("AddDeliveryAddress") }}
                                            >
                                                <Text style={[{ fontWeight: 800, color: '#4A3AFF' }]} onPress={() => {
                                                    // setSelectLocation("")
                                                    scrollToTopY(scrollViewRef, heightx)
                                                    setOpenAddress(true)
                                                }}>
                                                    Change Address
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: 800, fontSize: 16 }}>{selectLocation?.addressName}</Text>
                                            <Text style={{ fontWeight: 700, fontSize: 14 }}>{selectLocation?.name}</Text>
                                            <Text style={{ fontSize: 12 }}>{selectLocation?.address}, {selectLocation?.area}, {selectLocation?.city}, {selectLocation?.state}, {selectLocation?.district}, {selectLocation?.pincode}</Text>
                                            <Text style={{ fontSize: 12 }}>{selectLocation?.phoneNumber}</Text>
                                            <Text style={{ fontSize: 12 }}>{selectLocation?.alternatePhoneNumber}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>}
                        {openAddress || !selectLocation ? <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                            <View style={[{ backgroundColor: 'white', width: '95%', margin: 3, borderRadius: 10, marginVertical: 5, paddingBottom: 10, }, GlobalStyles.productBoxdropDownShadow2]}>
                                <View style={{ margin: 3 }}>
                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={[{ fontWeight: 800 }]}>
                                                Select Delivery Address
                                            </Text>
                                            <TouchableOpacity style={{}}
                                                onPress={() => {
                                                    if (allLocations.length < 4) {
                                                        navigation.navigate("AddDeliveryAddress")
                                                    } else {
                                                        Alert.alert("You can only add up to 4 addresses.")
                                                    }
                                                }}
                                            >
                                                <Text style={[{ fontWeight: 800, color: '#4A3AFF' }]}>
                                                    + Add Address
                                                </Text>
                                            </TouchableOpacity>
                                        </View>


                                        <ScrollView style={{ margin: 5, }}>
                                            {allLocations && allLocations.map((item, index) => {
                                                return (
                                                    <View key={index} style={{
                                                        width: '100%', backgroundColor: '#4A3AFF26', marginVertical: 4, borderRadius: 10, padding: 10,
                                                        borderWidth: selectLocation?._id == item?._id ? 1 : 0,
                                                        borderColor: '#4A3AFF'
                                                    }}>
                                                        <View style={{ flexDirection: 'row' }}>

                                                            <TouchableOpacity style={{ width: '90%' }} onPress={() => {
                                                                setSelectLocation(item)
                                                                setOpenAddress(false)
                                                                scrollToTopY(scrollViewRef, 0)
                                                            }}>
                                                                <Text style={{ fontWeight: 800, fontSize: 16, color: '#4A3AFF' }}>{item.addressName}</Text>
                                                                <Text style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</Text>
                                                                <Text style={{ fontSize: 12 }}>{item.address}, {item.area}, {item.city}, {item.state}, {item.district}, {item.pincode}</Text>
                                                                <Text style={{ fontSize: 12 }}>{item.phoneNumber}</Text>
                                                                <Text style={{ fontSize: 12 }}>{item.alternatePhoneNumber}</Text>
                                                            </TouchableOpacity>

                                                            <View style={{ justifyContent: 'center', alignItems: "center", gap: 25, }}>

                                                                <TouchableOpacity onPress={() => { DeleteAddress(`${item._id}`) }}>
                                                                    <FontAwesome5 name={'trash'} size={18} color={'red'} />
                                                                </TouchableOpacity>
                                                                {/* <TouchableOpacity>
                                                                <FontAwesome name={'pencil'} size={18} color={'blue'} />
                                                            </TouchableOpacity> */}
                                                            </View>

                                                        </View>
                                                    </View>
                                                )
                                            })}

                                            {allLocations && allLocations.length <= 0 && (<View style={{ justifyContent: 'center', alignItems: 'center', height: 160 }}>
                                                <Text >
                                                    No Address found. Please add your address
                                                </Text>
                                            </View>)}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View> : ""}


                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <CustomButton
                                boxWidth={'90%'}
                                onPress={() => {
                                    console.log("ec", selectLocation._id)
                                    if (selectLocation._id) {
                                        BuyProductAPI()
                                    } else {
                                        Alert.alert("", "Please add Delivery address")
                                    }
                                }}
                                style={{ marginTop: 50 }}>{selectedType == "Online" ? "Pay Now" : "Oder Now"}</CustomButton>
                        </View>

                        <View style={{ height: 300 }}>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default CheckoutProduct

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
})