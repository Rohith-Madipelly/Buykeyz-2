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
import { RewardDetails_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
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

    // Filter data based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredData(APIData);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            console.log("dnvc", APIData)
            const filtered = APIData.filter(item =>
                item.name?.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, APIData]);
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
                <CustomToolKitHeader componentName={"Reward Details"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View
                        style={{ paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginVertical: 15, }}>
                        <View style={{ flex: 1, paddingBottom: 10, borderColor: '#DEDEDE', backgroundColor: "white", paddingHorizontal: 5, borderRadius: 20 }}>
                            <View style={{ flex: 0.6 }}>
                                <View style={{ backgroundColor: 'blue', position: 'absolute', top: 5, left: 5 }}>
                                    {/* <Text style={{ color: 'white' }}>{item.status}</Text> */}
                                </View>
                                <LoadingImage
                                    source={{ uri: data.picture || 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv8QQQl2a6TAJSiKEqFQDiLxDUbipyYUBSv-NA7KdUl1c-OZFFKJMAP7M9iX2nBfo_CyWUmF5o4DzNf0pfYz7orP3_LHJn7Au50cwdxRDe' }}
                                    style={{ width: '100%', height: Metrics.rfv(180), borderRadius: 10 }}
                                />
                            </View>

                            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, paddingHorizontal: 10 }}>
                                <Text style={[TextStyles.TEXTSTYLE_B16, { color: '#07005B', width: '50%' }]} numberOfLines={1}>{data?.title}</Text>
                                <Text style={[TextStyles.TEXTSTYLE_B14, { color: data.status == "Active" ? 'green' : "red", }]} numberOfLines={1}>{moment(data?.time).format("DD-MM-YYYY hh:mm A")}</Text>
                            </View>
                            <ScrollView contentContainerStyle={{ maxHeight: 100 }}>

                                <Text style={[TextStyles.TEXTSTYLE_B14, { marginHorizontal: 10 }]} numberOfLines={5}>{data?.description}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: LEFT_AND_RIGHT_PADDING }}>
                        <TextInput
                            placeholder="Search by Winner Name..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={{
                                height: 40,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                            }}
                            placeholderTextColor={"black"}
                        />
                    </View>
                    <View style={{ paddingHorizontal: LEFT_AND_RIGHT_PADDING }}>
                        <Text style={[TextStyles.TEXTSTYLE_C20, { color: '#121212', width: '100%', fontWeight: 800, fontSize: 20, marginBottom: 1 }]}
                            numberOfLines={2}
                        >
                            Winners list
                        </Text>
                    </View>
                    <FlashList
                        data={filteredData}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => { navigation.navigate("RewardWinner",{data:item})}}
                                style={{ paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginVertical: 15, }}>
                                <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10, padding: 10, borderColor: '#DEDEDE', backgroundColor: "white", paddingHorizontal: 5, borderRadius: 20 }}>
                                    <View style={{ flex: 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{index + 1}</Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <LoadingImage
                                            source={{ uri: item.picture || 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQv8QQQl2a6TAJSiKEqFQDiLxDUbipyYUBSv-NA7KdUl1c-OZFFKJMAP7M9iX2nBfo_CyWUmF5o4DzNf0pfYz7orP3_LHJn7Au50cwdxRDe' }}
                                            style={{ width: Metrics.rfv(50), height: Metrics.rfv(50), borderRadius: Metrics.rfv(25) }}
                                        />
                                    </View>
                                    <View style={{ flex: 0.7, }}>
                                        <Text style={[TextStyles.TEXTSTYLE_B16, { color: '#07005B', width: '80%' }]} numberOfLines={1}>{item.name}</Text>
                                        {/* <Text style={[TextStyles.TEXTSTYLE_B14, { color: item.status == "Active" ? 'green' : "red", }]} numberOfLines={1}>{moment(item.time).format("DD-MM-YYYY hh:mm A")}</Text> */}
                                        <Text style={[TextStyles.TEXTSTYLE_B14, { color: '#07005B', color: 'black' }]} numberOfLines={2}>{item.description}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 30 }}>
                            <Text>No Winner's found</Text>
                        </View>)}
                        estimatedItemSize={10}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

export default RewardDetails
