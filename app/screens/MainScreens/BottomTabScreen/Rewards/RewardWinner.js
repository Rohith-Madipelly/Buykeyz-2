import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { ALL_PRODUCTS_API, Lucky_Draws_Reward_API, RewardDetails_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import SkeletonLoader2 from '../../../../components/UI/Loadings/SkeletonLoader2'
import { FontAwesome6 } from '@expo/vector-icons'
import { LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import moment from 'moment'

const RewardWinner = ({ route }) => {
    const data = route.params.data || ""
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            {/* <LoaderComponents visible={spinnerbool} /> */}
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Winner Details"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View
                        style={{ paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginVertical: 15, }}>
                        <View style={{ flex: 1, paddingBottom: 10, borderColor: '#DEDEDE', backgroundColor: "white", paddingHorizontal: 5, borderRadius: 20 }}>
                            <View style={{ flex: 0.6, textAlign: 'center',  fontWeight: 700 }}>
                                <View style={{}}>
                                    <Text style={{ marginVertical: 10, fontWeight: 700,fontSize:18 }}>Winner Profile</Text>
                                </View>
                                <LoadingImage
                                    source={{ uri: data.picture || 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv8QQQl2a6TAJSiKEqFQDiLxDUbipyYUBSv-NA7KdUl1c-OZFFKJMAP7M9iX2nBfo_CyWUmF5o4DzNf0pfYz7orP3_LHJn7Au50cwdxRDe' }}
                                    style={{ width: '100%', height: Metrics.rfv(180), borderRadius: 10 }}
                                />
                            </View>

                            <Text style={{  marginVertical: 10, fontWeight: 700 }}><Text>Winner Name :</Text> {data?.name || "No data"} </Text>
                            <Text style={{ }}>Description :{data?.description} </Text>
                        </View>
                    </View>


                </ScrollView>
            </View>
        </View>
    )
}

export default RewardWinner
