import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { ALL_PRODUCTS_API, Lucky_Draws_Reward_API, RewardDetails_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import SkeletonLoader2 from '../../../../components/UI/Loadings/SkeletonLoader2'
import { FontAwesome6 } from '@expo/vector-icons'
import { LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import moment from 'moment'

const RewardDetails = ({ route }) => {
    const data = route.params.data || ""
    const id = route.params.data._id || ""
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [APIData, setAPIData] = useState(false)
    const [filteredData, setFilteredData] = useState([])  // State for filtered data
    const [searchQuery, setSearchQuery] = useState('')  // State for search query
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRefresh = () => {
        ApiCaller()
    }

    const insets = useSafeAreaInsets();

    const ApiCaller = async () => {
        try {
            const res = await RewardDetails_API(id, tokenn)
            if (res.data) {
                console.log("d", res.data.allWinners)
                setAPIData(res.data.allWinners);

            }
        } catch (error) {
            HandleCommonErrors(error)
        } finally {
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
            <LoaderComponents visible={spinnerbool} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Reward Details "} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                </ScrollView>
            </View>
        </View>
    )
}

export default RewardDetails
