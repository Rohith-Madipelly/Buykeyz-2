import { Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextStyles from '../../../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import { LogOutHandle, MainLogoutSystem, ServerTokenError_Logout } from '../../../../utils/LogOutHandle'
import AppLogo from '../../../../assets/svg/Logo/AppLogo'
import { Image, ImageBackground } from 'expo-image'
import { HomeAPI } from '../../../../network/ApiCalls'
import CustomImageCarousel from '../../../../components/UI/Carousels/CustomImageCarousel'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import NextIcon from '../../../../assets/svg/NextIcon'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'

const Home = ({ route }) => {
    const { params } = route;

    let tokenn = useSelector((state) => state.login.token);

    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();
    const [APIData, setAPIData] = useState(false)


    const buttonHandler = () => {
        LogOutHandle(dispatch)
    }




    const ApiCaller = async () => {

        console.log("tokenn", tokenn)
        try {
            const res = await HomeAPI(tokenn)
            if (res.data) {
                setAPIData()
                setAPIData(res.data)
            }

        } catch (error) {
            console.log("error console", error.response.status)
            console.log("error console", error.response.data.message)
            if (error.response.status === 400) {
                seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
            } else if (error.response.status === 401) {
                ServerTokenError_Logout(undefined,undefined, dispatch)
            }
            else {
                HandleCommonErrors(error)
            }
            setSpinnerbool(false)
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

    useFocusEffect(
        useCallback(() => {
            ApiCaller()
        }, [])
    )


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiCaller()
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{
                flex: 1, marginTop: insets.top,
                //  marginBottom: insets.bottom
            }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AppLogo />
                            </View>

                            <Pressable onPress={() => {
                                // MainLogoutSystem(dispatch)
                                navigation.navigate('NotificationList') 
                            }} style={{ justifyContent: 'center' }}>
                                <Image
                                    style={{ width: 25, height: 25, marginBottom: 10, marginRight: 10, marginTop: 10 }}
                                    // animation={"bounceIn"}
                                    source={require("../../../../assets/Notification.png")}
                                    contentFit="cover"
                                    transition={1000}
                                    alt=''
                                />
                            </Pressable>
                        </View>

                        <View style={{}}>
                            {APIData && APIData.allBanners?.length > 0 && <CustomImageCarousel
                                width={Metrics.width}
                                height={Metrics.width * 0.562}
                                // height={Metrics.rfv(200)}
                                scrollAnimationDuration={4000}
                                bannersData={APIData.allBanners}
                                onPress={(e) => {
                                    console.log("Hello e", e)
                                    navigation.navigate("Stores")
                                }}
                                imageStyling={GlobalStyles.carouselDropDown}
                                disabledonPress={true}
                            // showIndicators={true} 
                            />}
                        </View>
                        <View style={[{
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }]}>
                            <View>
                                <Text style={[TextStyles.TEXTSTYLE_B16, { color: ' #07005B' }]}>Categories</Text>
                            </View>
                            <View style={{ paddingTop: 5 }}>

                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("AllCategories") }}
                                    style={{ alignContent: 'center', flexDirection: 'row' }}>
                                    <Text style={[TextStyles.TEXTSTYLE_B12, { gap: 10, color: '#6D3AFF' }]}>See all

                                    </Text>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
                                        <NextIcon />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: 15, height: Metrics.rfv(75), marginBottom: 10, }}>
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}>

                                {APIData && APIData.allCategories && APIData.allCategories.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={(e) => { navigation.navigate("CategoriesProductItem", { data: item }) }}
                                        key={index} style={{
                                            width: Metrics.rfv(125),
                                            height: Metrics.rfv(56),
                                            borderRadius: 8,

                                            marginVertical: 7,
                                            marginHorizontal: 5,
                                            backgroundColor: '#CFCFCF',
                                            padding: 3,
                                            flexDirection: 'row',
                                            position: 'relative'
                                        }}>

                                        <View style={{ height: '100%', justifyContent: 'center', width: '60%', paddingLeft: 7 }}>
                                            <Text style={{ textAlignVertical: 'center', }} numberOfLines={2}>{item.name}</Text>
                                        </View>
                                        <View style={{ height: '100%', justifyContent: 'center', width: '50%', position: 'absolute', right: 2 }}>
                                            <Image
                                                source={{ uri: item.picture || "https://s3-alpha-sig.figma.com/img/8a80/8b51/d8b101a767c95de34bba5958846df892?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W2fqfmP0iliBCAa-mv4RkcTxFOdB1YJbLa20Ht3K9zWLCqrf9K-v5axXPlEGeT8zFHhxeMIxkC-ZEQocrsnXjIv6hE79y1Ai6MsOLzY8Qp~8Q9UrZxAY6gLIYNSRKvEFymWrjCG5wQawZGCWs8iTkzStpGGXLM~A6VVp0jY8Be7sck7aC99BRd-HqdckRPoDq8KFKWUl0VJhwhx-UuoVFAbtL5ByWnn1RBLYy-rKxCya6-sMqNDmgjwnq~pNmrY04YQN2dOfbNQuHUfmRwZ6cSRpUOcgJeMfBrtRlaEFfYKWz0jmMvZUz9vS52b0XNKuo6oprElCqEjnwHqx0CXY-Q__" }}
                                                style={{
                                                    width: '100%', height: '100%',
                                                    position: 'absolute',
                                                    top: 5,
                                                    // resizeMode:'cover'
                                                    resizeMode: 'contain'
                                                    // width: 30, height: 30
                                                }}

                                            />
                                        </View>
                                    </TouchableOpacity>))}

                            </ScrollView>
                        </View>
                        <View style={[{
                            paddingHorizontal: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 5
                        }]}>
                            <View>
                                <Text style={[TextStyles.TEXTSTYLE_B16, { color: ' #07005B' }]}>Popular Home Appliances</Text>
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

                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                padding: 10,
                            }}>

                                {APIData && APIData.popularAppliances && APIData.popularAppliances.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[{ backgroundColor: 'white', width: '48%', margin: 3, borderRadius: 10, paddingBottom: 5 }, GlobalStyles.productBoxdropDownShadow2]}>
                                        <TouchableOpacity style={{ margin: 3 }} onPress={() => { navigation.navigate("ProductItem", { data: item }) }}>

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
                                    </View>
                                ))}
                            </View>


                        </View>


                        {console.log("APIData >>", APIData.userExists)}
                        {APIData && APIData?.userExists == "Active" && <TouchableOpacity onPress={() => {
                            // PageHandler(1, dispatch)
                            navigation.navigate("SubscriptionList")
                        }} style={{
                            paddingHorizontal: 15, borderRadius: 10, overflow: 'hidden', marginBottom: 10
                        }}>
                            <ImageBackground
                                style={{ width: '100%', height: 150, marginBottom: 10 }}
                                contentFit="fixed"
                                // blurRadius={0.2}
                                source={{ uri: APIData?.loanPicture }}
                            >
                            </ImageBackground>
                        </TouchableOpacity>}

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})