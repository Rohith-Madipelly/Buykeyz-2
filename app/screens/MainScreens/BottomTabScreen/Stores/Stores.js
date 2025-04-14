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
import { ALL_BRANCHES_API, ALL_ORDERS_TRANSACTIONS_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import moment from 'moment'
import SkeletonLoader2 from '../../../../components/UI/Loadings/SkeletonLoader2'
import { FontAwesome6 } from '@expo/vector-icons'
const Stores = () => {
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [APIData, setAPIData] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRefresh = () => {
        ApiCaller()
    }
    const insets = useSafeAreaInsets();
    // console.log("insets", insets,"tokenn",tokenn)


    const ApiCaller = async () => {

        try {
            const res = await ALL_BRANCHES_API(tokenn);
            if (res.data) {
                console.log("res", res.data.allNearByStores[0])
                // toast.show(res.data.message)
                setAPIData(res.data.allNearByStores)

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
        }
        finally {
            setSpinnerbool(false)
            setRefreshing(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            setSpinnerbool(true)
            ApiCaller()
        }, [])
    )

    const LoadingData = [1, 2, 3, 4, 5]

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <LoaderComponents
                visible={spinnerbool}
            />
            <View style={{
                flex: 1,
                marginTop: insets.top,
                //   marginBottom: insets.bottom
            }}>
                <CustomToolKitHeader componentName={"Stores"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{ paddingHorizontal: 18 }}>

                        {!APIData ?
                            <View>
                                {LoadingData.map((data, index) => (
                                    <View
                                        key={index}
                                        onPress={() => { }}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            height: Metrics.rfv(57),
                                            paddingHorizontal: 15,
                                            borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                            // marginHorizontal: 20,
                                            marginTop: 10,
                                        }}>
                                        <SkeletonLoader2
                                            style={{
                                                marginTop: 10,
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



                        <FlashList
                            data={APIData || []}
                            // numColumns={2}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={index}
                                onPress={() => { navigation.navigate("SingleBranches", { storeId: `${item.storeId}`, branchName: `${item.name}`, data: `${item}` }) }}

                                    // onPress={() => { navigation.navigate("SinglesEnterprise", { enterPriseId: `${item.enterPriseId}`, enterPriseName: `${item.enterPriseName}` }) }}
                                    // onPress={() => { navigation.navigate("ProductItem", { productId: `${item._id}` }) }}
                                    style={{
                                        justifyContent: 'space-between',
                                        height: Metrics.rfv(285),
                                        // borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                        borderRadius: 20,
                                        backgroundColor: 'white',
                                        padding: 10,
                                        marginTop: 10
                                    }}>


                                    <View style={{ flex: 0.8 }}>
                                        {item.profilePicture ? <LoadingImage
                                            source={{ uri: `${item.profilePicture}` }}
                                            style={{
                                                // height:'70%',
                                                // aspectRatio: 1.93,
                                                borderRadius: 10
                                            }}
                                            loaderColor="#ff0000"
                                        // contentFit="cover"
                                        /> : <View
                                            style={{
                                                justifyContent: 'space-between',
                                            }}>
                                            <SkeletonLoader2
                                                style={{
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '90%',
                                                    borderRadius: 5,
                                                }}
                                            >

                                            </SkeletonLoader2>

                                            <View style={{ position: 'absolute', alignSelf: 'center', height: '100%', justifyContent: 'center' }}>
                                                <Text style={[styles.TextFontA2, styles.TextStyle400, { textAlign: 'center', marginTop: 5, }]}>No Store Profile</Text>
                                            </View>
                                        </View>}
                                    </View>
                                    <View style={{ flex: 0.2,paddingTop:10 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontWeight: 800, fontSize: Metrics.rfv(18) , color: '#E29547',}}>
                                            {item.name}
                                        </Text>
                                        <Text style={[{ width: '100%', fontWeight: 800, marginBottom: 2, fontSize: 12,marginTop:5 }]}
                                            numberOfLines={2}
                                        >{item.address}</Text>
                                    </View>



                                </TouchableOpacity>
                            )}
                            ListFooterComponent={(
                                <View style={{ height: 100 }}>

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

export default Stores

const styles = StyleSheet.create({})