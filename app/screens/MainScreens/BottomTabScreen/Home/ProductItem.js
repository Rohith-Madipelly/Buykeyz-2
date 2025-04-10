import { Alert, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { GET_SINGLE_PRODUCT } from '../../../../network/ApiCalls'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import CustomImageCarousel from '../../../../components/UI/Carousels/CustomImageCarousel'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import TextStyles from '../../../../components/UI/config/TextStyles'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import { scrollToTop } from '../../../../utils/Scrolls'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ProductItem = ({ route }) => {

    console.log("dchsvj", route.params.data?.productId)

    const dataobject = route.params.data
    const productId2 = route.params.productId
    const productId = productId2 ? productId2 : route.params.data?.productId || route.params.data?.product || route.params.data?.product?._id || ""
    const [productItems, setProductItems] = useState(1)

    const [selectedStore, setSelectedStore] = useState("")

    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [APIData, setAPIData] = useState(false)
    const [APIData2, setAPIData2] = useState(false)
    const navigation = useNavigation()
    let tokenn = useSelector((state) => state.login.token);
    const [errorFormAPI, seterrorFormAPI] = useState({})
    const scrollViewRef = useRef()


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // if (isConnected) {
        ApiCaller()
        // }
    }, []);


    useEffect(() => {
        ApiCaller()
    }, [dataobject])



    const ApiCaller = async () => {
        try {

            //   setSpinnerbool(true)
            const res = await GET_SINGLE_PRODUCT(productId, tokenn)
            if (res) {
                console.log("dchvbdjhv", res.data.productDetails)
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
            Alert.alert("ou cannot decrease it to less than 1.")
        }
    }


    const [readMore, setReadMore] = useState(false)



    useEffect(() => {

        setTimeout(() => {
            scrollToTop(scrollViewRef)
        }, 200);
    }, [APIData])



    // API call for Add to cart 
    const BuyProductAPI = async () => {
        try {
            var apiReqData = {
                productId: APIData?._id || APIData?.productId,
                type: "Online",
            }
            setSpinnerbool(true)
            const res = await PAYOUT_CREATE_ORDER_API(apiReqData, tokenn)
            if (res) {
                console.log(" wekkj", res.data)
                var orderData = await res.data.orders
                console.log("dsnhvg", orderData)
                // RazorPayModule("", orderData, tokenn)
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
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>

                <CustomToolKitHeader
                    componentName={"Product Item "}
                    backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
                <View style={{ width: '100%', height: '100%', }}>
                    <ScrollView
                        ref={scrollViewRef}
                    // contentContainerStyle={{ height:'100%' }}
                    >
                        <View style={{ overflow: 'hidden', alignItems: 'center' }}>
                            {APIData && <CustomImageCarousel
                                width={Metrics.width}
                                height={Metrics.width >= 1032 ? 600 : Metrics.width}
                                bannersData={APIData.pictures}
                                autoPlay={false}
                                resizeMode={'center'}
                                // maxHeight={400}
                                onPress={(e) => {
                                    console.log("Hello e", e)
                                }}
                            />}
                        </View>

                        <View style={{ flex: 0.6, backgroundColor: '#FFFFFF' }}>
                            <View style={{ flex: 1, borderRadius: 8, }}>

                                {/* Product Header */}
                                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '60%' }}>
                                        <Text style={[TextStyles.TEXTSTYLE_C20, { color: '#121212', width: '100%', fontWeight: 800, fontSize: 20, marginBottom: 2 }]}
                                        // numberOfLines={4}
                                        >
                                            {/* {APIData.brand}   */}
                                            {APIData.name}
                                            {APIData.model}
                                        </Text>
                                        {/* {true ? <Text style={[TextStyles.TEXTSTYLE_C12, { color: '#2E7928', fontWeight: 800 }]}> No Cost EMI Available</Text> :
                                            <Text style={[TextStyles.TEXTSTYLE_C12, { color: '#A9A9A9', fontWeight: 800 }]}> No Cost EMI NOT Available</Text>} */}


                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ backgroundColor: '#FFEEDD', padding: 10, paddingHorizontal: 20, borderRadius: 8 }}>
                                            <Text style={[TextStyles.TEXTSTYLE_C14, { color: '#E29547', fontWeight: 800 }]}>{APIData?.brand || "Samsung"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Product main */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 }}>
                                    <View style={{ width: '70%', flexDirection: 'row' }}>

                                        <View>
                                            <Text style={[TextStyles.TEXTSTYLE_C20, { color: '#E29547', width: '100%', fontWeight: 800, fontSize: 20, marginBottom: 2 }]}
                                                numberOfLines={2}
                                            >
                                                ₹ {APIData?.discountedPrice?.toLocaleString('en-IN') || ""}
                                            </Text>
                                            <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4' }]}
                                                numberOfLines={2}
                                            >
                                                ₹ {APIData?.originalPrice?.toLocaleString('en-IN') || ""}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                            <View style={{ backgroundColor: 'red', alignItems: 'center', borderRadius: 3, }}>
                                                <Text style={{
                                                    textAlign: 'center', textAlignVertical: 'center', padding: 3,
                                                    color: 'white', width: '100%', fontWeight: 800, fontSize: 14, marginBottom: 2, paddingLeft: 5,
                                                }}>-{APIData?.discount} %</Text>
                                            </View>
                                        </View>



                                    </View>

                                    <View style={{ width: '26%',maxWidth:150 ,flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => { DecrementProduct() }}

                                            style={{ borderWidth: 1, borderColor: '#6D3AFF', borderRadius: 4, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#6D3AFF', fontWeight: 700 }}>-</Text>
                                        </TouchableOpacity>

                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ color: '#6D3AFF', fontWeight: 700, }}>{productItems}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => { IncrementProduct() }}
                                            style={{ borderWidth: 1, borderColor: '#6D3AFF', borderRadius: 4, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#6D3AFF', fontWeight: 700 }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Details box */}
                                <View style={{ padding: 5, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={[TextStyles.TEXTSTYLE_C14, { color: '#121212', width: '100%', fontWeight: 800, fontSize: 20, }]}
                                            numberOfLines={2}
                                        >Description:</Text>
                                    </View>
                                </View>
                                <View style={{ padding: 10, paddingTop: 2}}>
                                    <Text numberOfLines={readMore ? 0 : 2}>{APIData?.description}
                                    </Text>
                                    <Text style={{ fontWeight: 700 }} onPress={() => { setReadMore(!readMore) }}>{readMore ? "read less" : "read more"}</Text>

                                </View>

                                {/* Near by stores */}
                                {/* {APIData?.vendorName && false &&
                                    <>
                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ width: '70%' }}>
                                                <Text style={[TextStyles.TEXTSTYLE_C14, { color: '#121212', width: '100%', fontWeight: 800, fontSize: 18 }]}
                                                    numberOfLines={2}
                                                >Near By Store</Text>
                                            </View>
                                        </View>

                                        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>

                                            <TouchableOpacity
                                                style={{
                                                    paddingVertical: 10,
                                                    margin: 1, flexDirection: 'row',
                                                    // backgroundColor: selectedStore.productId == item.productId ? "#AAAAAA" : "", 
                                                    backgroundColor: "#AAAAAf",
                                                    borderRadius: 10
                                                }}
                                                onPress={() => {

                                                }}>
                                                <View style={{ width: '100%', paddingHorizontal: 3, flexDirection: 'row' }}>

                                                    <View style={{ paddingLeft: 10 }}>
                                                        <Text><Text style={{ fontWeight: 700 }}>Name :</Text> {APIData.vendorName || ""}</Text>
                                                        <Text><Text style={{ fontWeight: 700 }}>Address :</Text> {APIData.vendorAddress || ""}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>} */}

{console.log("APIData.status",APIData.status)}
                                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {APIData.status!="Out Of Stock"?<TouchableOpacity style={{ backgroundColor: '#4A3AFF', width: '80%', padding: 20, borderRadius: 10 }} onPress={() => {
                                        // BuyProductAPI()
                                        navigation.navigate("CheckoutProduct", { productId: productId, quantity: productItems, productData: APIData })
                                    }}>
                                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: 700 }}>Purchase Now</Text>
                                    </TouchableOpacity>:<TouchableOpacity style={{ backgroundColor: '#4A3AFF', width: '80%', padding: 20, borderRadius: 10 }} 
                                    disabled={true}
                                    onPress={() => {
                                        Alert.alert("")
                                        // BuyProductAPI()
                                        // navigation.navigate("CheckoutProduct", { productId: productId, quantity: productItems, productData: APIData })
                                    }}>
                                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', fontWeight: 700 }}>{APIData.status}</Text>
                                    </TouchableOpacity>}
                                </View>
                            </View>

                        </View>



                        <View style={[{
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 5
                        }]}>
                            <View>

                                <Text style={[TextStyles.TEXTSTYLE_B16, { color: ' #07005B' }]}>Similar products</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={{ alignContent: 'center', flexDirection: 'row' }}
                                    onPress={() => {
                                    }}
                                >
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[{
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }]}>



                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginBottom: 30
                                }}
                            >
                                {/* route.params.data?.productId */}
                                {APIData2 && APIData2.map((item, index) => {
                                    console.log("item", item.productId)
                                    if (item.productId == route.params.data?.productId) {
                                        return
                                    }
                                    return (<View
                                        key={index}
                                        style={[{ backgroundColor: 'white', width: '48%', margin: 3, borderRadius: 10, paddingBottom: 5 }, GlobalStyles.productBoxdropDownShadow2, {
                                            width: Metrics.width / 2.2,
                                            // height: Metrics.rfv(190),
                                            borderRadius: 8,
                                            // marginVertical: 7,
                                            marginHorizontal: 5,
                                            // backgroundColor: '#CFCFCF',
                                            flexDirection: 'row',
                                            position: 'relative',
                                            justifyContent: 'center',
                                        }]}>

                                        <TouchableOpacity style={{ margin: 3 }} onPress={() => { navigation.navigate("ProductItem", { data: item, productId: false }) }}>

                                            <LoadingImage
                                                source={{ uri: item.picture }}
                                                style={{ width: '100%', height: Metrics.height * 0.17, resizeMode: "center" }}
                                            />
                                            <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5, marginBottom: 3 }} numberOfLines={3}>{item.name}</Text>
                                            <Text style={[TextStyles.TEXTSTYLE_C20, {
                                                color: '#E29547', width: '100%', fontWeight: 800, fontSize: 16, marginBottom: 2, paddingLeft: 5,
                                                // marginTop:5 
                                            }]}
                                                numberOfLines={2}
                                            >
                                                ₹ {item?.discountedPrice?.toLocaleString('en-IN') || ""}
                                            </Text>
                                            {/* <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4', paddingLeft: 5, }]}>
                          {item?.originalPrice?.toLocaleString('en-IN') || ""} ₹ </Text> */}
                                        </TouchableOpacity>
                                    </View>)
                                }
                                )}

                            </ScrollView>




                        </View>
                        <View style={{ height: Metrics.rfv(180) }}>

                        </View>

                        {/* <View style={{ flex: 0.3, height: 400 }}>
                        <View style={{ width: '100%', paddingHorizontal: 15, backgroundColor: '#F7F7F7' }}>
                            <View style={{ width: '70%' }}>
                                <Text style={[TextStyles.TEXTSTYLE_C14, { color: '#07005B', width: '100%', fontWeight: 800, fontSize: 20, }]}
                                    numberOfLines={2}
                                >Similar products</Text>
                            </View>

                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginBottom: 30
                                }}
                            >
                                {APIData2 && APIData2.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log("hdvch")
                                            navigation.navigate("ProductItem", { data: item, productId: false })

                                        }}
                                        key={index} style={{
                                            width: Metrics.width / 2.2,
                                            height: Metrics.rfv(190),
                                            borderRadius: 8,
                                            // marginVertical: 7,
                                            marginHorizontal: 5,
                                            // backgroundColor: '#CFCFCF',
                                            flexDirection: 'row',
                                            position: 'relative',
                                            justifyContent: 'center',

                                        }}>
                                        <Image
                                            // source={require('../../../assets/Product pic (1).png')}
                                            source={{ uri: item.picture }}
                                            style={{ resizeMode: 'contain', width: "90%", height: Metrics.rfv(100), position: 'absolute', borderRadius: 8, zIndex: 10, position: 'absolute', top: '10%' }}
                                        />
                                        <View style={{ width: '100%', height: '70%', backgroundColor: 'white', position: 'absolute', bottom: 0, borderRadius: 8, justifyContent: 'space-between' }}>
                                            <View>

                                            </View>
                                            <View style={{ padding: 10, justifyContent: 'flex-end', bottom: 10 }}>
                                                <Text style={[TextStyles.TEXTSTYLE_B12, { color: ' #AAAAAA' }]}>{item?.brand}</Text>
                                                <Text style={[TextStyles.TEXTSTYLE_B12, {}]}>₹ {item?.discountedPrice?.toLocaleString('en-IN')}</Text>
                                            </View>

                                        </View>



                                    </TouchableOpacity>))}

                            </ScrollView>
                        </View>
                    </View> */}

                    </ScrollView>
                </View>
            </View>
        </View>

    )
}

export default ProductItem

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
})