import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { ALL_ORDERS_API, ALL_ORDERS_TRANSACTIONS_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import moment from 'moment'
const OrderHistory = () => {
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [APIData, setAPIData] = useState(false)
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


    const ApiCaller = async () => {
        setSpinnerbool(true)
        try {
            const res = await ALL_ORDERS_API(tokenn);
            if (res.data) {
                console.log("res", res.data.allOrders[0])
                // toast.show(res.data.message)
                setAPIData(res.data.allOrders)

            }
        } catch (error) {
            console.log("error console", error.response.status)

            if (error.response.status === 400) {
                seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
            }
            else if (error.response.status === 401) {
                console.log("error.response.data.message", error.response.data.message)
                // TokenLogoutAlert()
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
                <CustomToolKitHeader componentName={"Order History"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ paddingHorizontal: 18 }}>


                        <FlashList
                            data={APIData || []}
                            // numColumns={2}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (
                                <View style={[{ backgroundColor: 'white', width: '99%', margin: 3, borderRadius: 10, marginVertical: 5, paddingBottom: 10 }, GlobalStyles.productBoxdropDownShadow2]}>
                                    <View style={{ margin: 3 }}>

                                        {/* <View style={{ position: 'absolute', left: 0, top: 0, zIndex: 10, backgroundColor: item.status == "Paid" ? "#008000" : '#cd1c18', padding: 5, borderRadius: 5, paddingHorizontal: 10, minWidth: 100 }}>
                                        <Text style={{ color: item.status == "Paid" ? "07005B" : '', textAlign: 'center' }}>Payment : {item.status}</Text>
                                    </View> */}

                                        <View style={{ width: '100%', flexDirection: 'row', }}>
                                            {/* {console.log("dvjhb",item)} */}
                                            <TouchableOpacity
                                                onPress={() => { navigation.navigate("ProductItem", { productId: item.product }) }}
                                                style={{ width: '40%', height: Metrics.height * 0.17, overflow: 'hidden' }}
                                            >
                                                <LoadingImage
                                                    source={{ uri: item.picture1 }}
                                                    style={{
                                                        width: '100%', height: Metrics.height * 0.2,
                                                        resizeMode: "center"
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <View
                                                style={{ width: '60%', height: Metrics.height * 0.20, }}
                                            >
                                                <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5 }} numberOfLines={2} onPress={() => { navigation.navigate("ProductItem", { productId: item.product }) }}>{item.brand} {item.modelName}</Text>
                                                <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5 }} numberOfLines={2} onPress={() => { navigation.navigate("ProductItem", { productId: item.product }) }}>{item.productName}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View>

                                                        <Text style={[TextStyles.TEXTSTYLE_C20, {
                                                            color: '#E29547', width: '100%', fontWeight: 800, fontSize: 16, marginBottom: 2, paddingLeft: 5,
                                                            // marginTop:5 
                                                        }]}
                                                            numberOfLines={2}
                                                        >
                                                            ₹ {item?.discountedPrice?.toLocaleString('en-IN') || ""}
                                                        </Text>
                                                        <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4', paddingLeft: 5, }]}>
                                                            ₹ {item?.originalPrice?.toLocaleString('en-IN') || ""}</Text>
                                                    </View>


                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{
                                                            textAlign: 'center', textAlignVertical: 'center',
                                                            color: 'red', width: '100%', fontWeight: 800, fontSize: 16, marginBottom: 2, paddingLeft: 5,
                                                        }}>-{item?.discount} %</Text>
                                                    </View>


                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ padding: 10 }}>

                                            <Text style={[{ fontWeight: 800 }]}>
                                                Order placed date : <Text style={{ fontWeight: 600 }}>
                                                    {moment(item.createdAt).format('DD-MM-YYYY')}</Text>
                                            </Text>


                                            {item.estimatedDelivery && <Text style={[{ fontWeight: 800, marginVertical: Metrics.rfv(5) }]}>
                                                Estimated Delivery date : <Text style={{ fontWeight: 600 }}>
                                                    {item.estimatedDelivery}
                                                </Text>
                                            </Text>}

                                            <Text style={[{ fontWeight: 400, fontSize: 14, marginBottom: 5 }]} >
                                                <Text style={{ fontWeight: 900 }}>
                                                    Delivery Address : </Text>{item.address} {item.landMark} {item.pincode}
                                            </Text>


                                            {item?.deliveryStatus != "N.A" && <Text style={[{ fontWeight: 400, fontSize: 14, marginBottom: 5 }]} >
                                                <Text style={{ fontWeight: 900 }}>
                                                Delivery Status : </Text>{item.deliveryStatus}
                                            </Text>}

                                            {item?.description != "N.A"||item?.description != "" && <Text style={[{ fontWeight: 400, fontSize: 14, marginBottom: 5 }]} >
                                                <Text style={{ fontWeight: 900 }}>
                                                Description : </Text>{item.description}
                                            </Text>}

    
                                            <View style={{ borderRadius: 10, backgroundColor: '#07005B', justifyContent: 'center', paddingVertical: 10 }}>
                                                {item.status && <Text style={[{
                                                    fontWeight: 800,
                                                    color: 'white',
                                                    //  marginTop: Metrics.rfv(5),
                                                    textAlign: 'center'
                                                }]}>
                                                    Order status : <Text style={{ fontWeight: 600 }}>
                                                        {item.status}
                                                    </Text>
                                                </Text>}
                                            </View>

                                            {/* <Text>{item.deliveryStatus}</Text> */}


                                            {/* <View style={{ backgroundColor: item.status == "Paid" ? "#008000" : '#cd1c18', padding: 5, borderRadius: 5, paddingHorizontal: 10, minWidth: 100 }}>
                                            <Text style={{ color: item.status == "Paid" ? "07005B" : '', textAlign: 'center' }}>Payment : {item.status}</Text>
                                        </View> */}
                                            {/* <View style={{ width: '100%', height: Metrics.height * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Pressable 
                                            onPress={()=>{}}
                                            style={{ backgroundColor: '#00b4d8', padding: 10, borderRadius: 5, paddingHorizontal: 20, minWidth: 100 }}>
                                                <Text style={{ color: item.status == "Paid" ? "07005B" : '', textAlign: 'center',color:'white',fontWeight:700}}>View Order Deatils</Text>
                                            </Pressable>
                                        </View> */}
                                        </View>


                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: Metrics.height * 0.25 }}>
                                    <Text>No History found</Text>
                                </View>
                            )}
                            estimatedItemSize={10}
                        />
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default OrderHistory

const styles = StyleSheet.create({})