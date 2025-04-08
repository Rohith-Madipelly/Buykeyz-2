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
import { ALL_PRODUCTS_API } from '../../../../network/ApiCalls'

import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import SkeletonLoader2 from '../../../../components/UI/Loadings/SkeletonLoader2'
import { FontAwesome6 } from '@expo/vector-icons'

const Stores = () => {
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
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
            const res = await ALL_PRODUCTS_API(tokenn);
            if (res.data) {
                setAPIData(res.data.allProducts);
                setFilteredData(res.data.allProducts);  // Set filteredData when data is fetched
            }
        } catch (error) {
            HandleCommonErrors(error)
        } finally {
            setSpinnerbool(false)
            setRefreshing(false)
        }
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setFilteredData(APIData); // If search query is empty, show all products
        } else {
            const filtered = APIData.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase()) // Filter products by name
            );
            setFilteredData(filtered); // Update the filtered data
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
            <View style={{ flex: 1, marginTop: insets.top,
                //  marginBottom: insets.bottom
                  }}>
                <CustomToolKitHeader componentName={"Products"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={{ paddingHorizontal: 18 }}>
                        {/* Search Box */}
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: '#ddd',
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 10,
                                paddingLeft: 10,
                                // backgroundColor: 'white',
                            }}
                            placeholder="Search Products"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />

                        {/* Loading Skeletons */}
                        {!APIData ? (
                            <View>
                                {LoadingData.map((data, index) => (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', height: Metrics.rfv(57), paddingHorizontal: 15, borderBottomColor: '#DDDDDD', borderBottomWidth: 1, marginTop: 10 }}>
                                        <SkeletonLoader2 style={{ marginTop: 10, width: '100%', height: Metrics.rfv(20), borderRadius: 5, marginBottom: 10 }} />
                                    </View>
                                ))}
                            </View>
                        ) : ""}

                        {/* FlashList for displaying products */}
                        <FlashList
                            data={filteredData || []}  // Use filteredData here
                            numColumns={2}
                            renderItem={({ item, index }) => (
                                <View style={[{ backgroundColor: 'white', width: '95%', height: Metrics.height * 0.28, margin: 3, borderRadius: 10 }, GlobalStyles.productBoxdropDownShadow2]}>
                                    <TouchableOpacity style={{ margin: 3 }} onPress={() => { navigation.navigate("ProductItem", { data: item }) }}>
                                        <LoadingImage
                                            source={{ uri: item.picture || "https://buykeyz.s3.ap-south-1.amazonaws.com/products/1743680742209.jpg" }}
                                            style={{ width: '100%', height: Metrics.height * 0.17, resizeMode: "center" }}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5 }} numberOfLines={1}>{item.name}</Text>
                                        <Text style={[TextStyles.TEXTSTYLE_C20, {
                                            color: '#E29547', width: '100%', fontWeight: 800, fontSize: 16, marginBottom: 2, paddingLeft: 5,
                                        }]} numberOfLines={2}>
                                            ₹ {item?.discountedPrice?.toLocaleString('en-IN') || ""}
                                        </Text>
                                        <Text style={[TextStyles.TEXTSTYLE_C12, { textDecorationLine: 'line-through', color: '#A4A4A4', paddingLeft: 5 }]}>
                                            ₹ {item?.originalPrice?.toLocaleString('en-IN') || ""}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: Metrics.height * 0.25 }}>
                                    <Text>No Products Found</Text>
                                </View>
                            }
                            ListFooterComponent={<View style={{ height: 100 }} />}
                            estimatedItemSize={10}
                        />
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default Stores
