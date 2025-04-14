import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar';
import GlobalStyles from '../../../../components/UI/config/GlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { STORE_PRODUCTS_API } from '../../../../network/ApiCalls';
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader';
import Metrics from '../../../../utils/resposivesUtils/Metrics';
import SkeletonLoader2 from '../../../../components/UI/Loadings/SkeletonLoader2';
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage';
import TextStyles from '../../../../components/UI/config/TextStyles';

const SingleBranches = ({ navigation, route }) => {

    const [noData, setNoData] = useState(false);


    const { params } = route;
    const storeId = params?.storeId || 'nan';
    const branchName = params?.branchName || 'Branch Name';
    const StoreData = params?.data || 'Branch Name';

    let tokenn = useSelector((state) => state.login.token);
    const LoadingData = [1, 2,]
    const flatListRef = useRef();
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = useCallback(() => {
        // setRefreshing(true);

        getAllBranches()

        setTimeout(() => {
            setRefreshing(false);
        }, 2000)

    }, []);

    const [BranchSingleData, setBranchSingleData] = useState()
    const getAllBranches = async () => {
        try {
            setBranchSingleData()
            const res = await STORE_PRODUCTS_API(storeId, tokenn)

            if (res) {
                setTimeout(() => {
                    // console.log(res.data.storeProducts)
                    setBranchSingleData(res.data.storeProducts)
                    setNoData(res.data.storeProducts.length === 0)
                }, 500);
            }
        } catch (error) {
            console.log("Error in APi Call in GET_ALL_BANNERS_API >", error.response)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("sd", 401)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("Error With 403", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("Error With 404", error.response.data.message)
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status >= 500) {
                    // console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
                }
                else {
                    console.log("An error occurred response.>>", error)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }
            else {
                console.log("Error in Setting up the Request.")
            }

        } finally {
            setTimeout(() => {

            }, 2000);
        }
    }



    useEffect(() => {
        getAllBranches()
    }, [])

    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={`${branchName}`} />

                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

                    <View style={{ width: '90%', flex: 0.95, borderRadius: 20,}}>

                        { BranchSingleData && BranchSingleData.length != 0 ? <FlatList
                            data={BranchSingleData}
                            ref={flatListRef}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (

                                <TouchableOpacity key={index}
                                    // onPress={() => { navigation.navigate("SinglesEnterprise", { enterPriseId: `${item.enterPriseId}`, enterPriseName: `${item.enterPriseName}` }) }}
                                    onPress={() => { navigation.navigate("ProductItem", { productId: `${item._id}` }) }}
                                    style={{
                                        justifyContent: 'space-between',
                                        height: Metrics.rfv(285),
                                        // borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop:10
                                    }}>


                                    <View style={{ flex: 0.7 }}>
                                        <LoadingImage
                                            source={{ uri: `${item.picture1}` }}
                                            style={{
                                                // height:'70%',
                                                // aspectRatio: 1.93,
                                                borderRadius: 10
                                            }}
                                            loaderColor="#ff0000"
                                        // contentFit="cover"
                                        />
                                    </View>
                                    <View style={{ flex: 0.25 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: 800, fontSize: Metrics.rfv(18) }}>
                                            {item.name}
                                        </Text>
                                        {/* <Text
                                                numberOfLines={2}
                                                style={{ marginTop: 5, fontFamily: 'Poppins-Regular', fontWeight: 400, fontSize: Metrics.rfv(14), color: '#AAAAAA', width: '100%' }}>
                                                {item.enterPriseAddress}
                                            </Text> */}

                                        <Text style={[TextStyles.TEXTSTYLE_C20, { color: '#E29547', width: '100%', fontWeight: 800, fontSize: 20, marginBottom: 2 }]}
                                            numberOfLines={2}
                                        >
                                            <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4' }]}>
                                                ₹ {item?.originalPrice?.toLocaleString('en-IN') || ""} </Text>
                                            ₹ {item?.discountedPrice?.toLocaleString('en-IN') || ""}
                                        </Text>
                                    </View>



                                </TouchableOpacity>
                            )} /> : ""}


                        {noData ? <View
                            // key={index}
                            // onPress={() => { }}
                            style={{
                                justifyContent: 'space-between',
                                height: Metrics.rfv(285),
                                // borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                borderRadius: 20,
                                backgroundColor: 'white',
                                padding: 10,
                                marginVertical: 5
                            }}>
                            <SkeletonLoader2
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    height: '40%',
                                    borderRadius: 5,
                                }}
                            // visible={!allBranchesData}
                            >

                            </SkeletonLoader2>

                            <Text style={[styles.TextFontA2, styles.TextStyle400, { textAlign: 'center', marginTop: 5 }]}>Products Not Available, Please visit later.</Text>
                            <SkeletonLoader2
                                style={{
                                    width: '100%',
                                    height: Metrics.rfv(20),
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}
                            // visible={!allBranchesData}
                            >
                            </SkeletonLoader2>

                        </View> : ""}



                        {!BranchSingleData ?
                            <View>
                                {LoadingData.map((data, index) => (
                                    <View
                                        key={index}
                                        onPress={() => { }}
                                        style={{
                                            justifyContent: 'space-between',
                                            height: Metrics.rfv(285),
                                            // borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                            borderRadius: 20,
                                            backgroundColor: 'white',
                                            padding: 10,
                                            marginVertical: 5
                                        }}>
                                        <SkeletonLoader2
                                            style={{
                                                marginTop: 10,
                                                width: '100%',
                                                height: '70%',
                                                borderRadius: 5,
                                            }}
                                        // visible={!allBranchesData}
                                        >
                                        </SkeletonLoader2>


                                        <SkeletonLoader2
                                            style={{
                                                width: '100%',
                                                height: Metrics.rfv(20),
                                                borderRadius: 5,
                                                marginBottom: 10,
                                            }}
                                        // visible={!allBranchesData}
                                        >
                                        </SkeletonLoader2>

                                    </View>
                                ))}
                            </View> : ""}



                    </View>
                </View>
            </View>
        </View>

    )
}

export default SingleBranches

const styles = StyleSheet.create({

    TextFont: {
        fontFamily: 'Poppins-Regular'
    },

    TextFontA2: {
        fontFamily: 'Poppins-Medium'
    },

    TextStyle400: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 18.23,
        color: '#474464'
    },
    TextStyle500: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 21,
        color: '#474464'
    },
    TextStyle600: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 21,
        color: '#474464'
    },
    TextStyle500A2: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 21,
        color: '#474464'
    },
    TextStyle700: {
        fontWeight: 800,
        fontSize: 14,
        lineHeight: 24,
        color: '#474464'
    },

})