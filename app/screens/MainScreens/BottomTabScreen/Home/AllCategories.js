import { FlatList, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { IOS_BOTTOM_PADDING, LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GET_ALL_CATEGORIES } from '../../../../network/ApiCalls'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'

const AllCategories = ({ route }) => {
    const insets = useSafeAreaInsets();
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [APIData, setAPIData] = useState(false)
    const navigation = useNavigation()
    let tokenn = useSelector((state) => state.login.token);

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
            const res = await GET_ALL_CATEGORIES(tokenn)
            if (res) {
                setAPIData(res.data.allCategories)
                // setAPIData([1,2,3,4,5,6,7,8,9,10,11,12,14,13,45,23,34,2,13,43,242,342,3,525,23])
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
                setRefreshing(false);
            }, 50);
        }
    }

    return (

        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"All Categories"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
                <ScrollView
                    contentContainerStyle={{ backgroundColor: GlobalStyles.AppBackground }}
                >
                    <View style={{ width: '100%', paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginTop: 5 }}>
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}
                            placeholderTextColor={"gray"}
                            onChangeText={(e) => { setSearchQuery(e) }}
                            style={{
                                height: 40,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                            }}
                        />

                    </View>
                    <View style={{ paddingHorizontal: 10 }}>

                        <FlashList
                            data={filteredData}
                            numColumns={2}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    // onPress={() => { console.log("Item clicked", item); }}
                                    onPress={(e) => { navigation.navigate("CategoriesProductItem", { data: item }) }}
                                    style={{
                                        flex: 1,
                                        margin: 10,
                                        padding: 15,
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                                    <Text>No items found</Text>
                                </View>
                            )}
                            estimatedItemSize={50}
                        />

                    </View>
                    <View>


                    </View>
                </ScrollView>
            </View>
        </View>


    )
}

export default AllCategories

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
})