import { Alert, FlatList, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { GET_CATEGORY_PRODUCTS } from '../../../../network/ApiCalls'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { IOS_BOTTOM_PADDING, LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import { FlashList } from '@shopify/flash-list'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import TextStyles from '../../../../components/UI/config/TextStyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const CategoriesProductItem = ({ route }) => {
    const id = route.params.data?._id || ""
    const categoriesName = route.params.data?.name || ""
    console.log("jhdv", id)
    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [APIData, setAPIData] = useState(false)
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();
    let tokenn = useSelector((state) => state.login.token);
    const [errorFormAPI, seterrorFormAPI] = useState({})



    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(APIData);


    // Filter data based on search query
    useEffect(() => {
        if (APIData) {
            console.log(APIData)

            if (searchQuery.trim() === '') {
                setFilteredData(APIData);
            } else {
                console.log("svnhv", searchQuery)

                const lowercasedQuery = searchQuery.toLowerCase();

                const filtered = APIData.filter(item =>
                    item.name.toLowerCase()
                        .includes(lowercasedQuery)
                );
                setFilteredData(filtered);
            }
        }
    }, [searchQuery, APIData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // if (isConnected) {
        ApiCaller()
        // }
    }, []);


    useEffect(() => {
        ApiCaller()
    }, [])




    const ApiCaller = async () => {
        try {

            //   setSpinnerbool(true)
            const res = await GET_CATEGORY_PRODUCTS(id, tokenn)
            if (res) {
                console.log("vgfc", res.data)
                setAPIData(res.data.categoryProducts)
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

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={categoriesName || "Categories"} backgroundColor={GlobalStyles.AppBackground} />


                <ScrollView
                    contentContainerStyle={{ backgroundColor: GlobalStyles.AppBackground }}
                >
                    <View style={{ width: '100%', paddingHorizontal: LEFT_AND_RIGHT_PADDING, marginTop: 5 }}>
                        <TextInput
                            placeholder="Search..."
                            value={searchQuery}

                            onChangeText={setSearchQuery}
                            placeholderTextColor={"gray"}
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
                            data={filteredData ? filteredData : []}
                            numColumns={2}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            renderItem={({ item, index }) => (
                                <View
                                    key={index}
                                    style={[{ backgroundColor: 'white', width: '98%', height: Metrics.height * 0.25, margin: 3, borderRadius: 10 }, GlobalStyles.productBoxdropDownShadow2]}>
                                    <TouchableOpacity style={{ margin: 3 }} onPress={() => { navigation.navigate("ProductItem", { data: item }) }}>

                                        <LoadingImage
                                            source={{ uri: item.picture }}
                                            style={{ width: '100%', height: Metrics.height * 0.17, contentFit: "center" }}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 700, paddingLeft: 5, marginTop: 5 }} numberOfLines={1}>{item.name}</Text>
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
                                </View>
                            )}
                            ListEmptyComponent={(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                                    <Text style={{ fontWeight: 700, fontSize: 20 }}>{errorFormAPI.product || "No products found"}</Text>
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

export default CategoriesProductItem

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },
})