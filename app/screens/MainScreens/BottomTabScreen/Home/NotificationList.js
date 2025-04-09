import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Toast, useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TextStyles from '../../../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING } from '../../../../components/UI/config/AppContants'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import { LogOutHandle } from '../../../../utils/LogOutHandle'
import AppLogo from '../../../../assets/svg/Logo/AppLogo'
import { Image, ImageBackground } from 'expo-image'
import { Get_Notification_API } from '../../../../network/ApiCalls'
import CustomImageCarousel from '../../../../components/UI/Carousels/CustomImageCarousel'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import NextIcon from '../../../../assets/svg/NextIcon'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { FontAwesome6 } from '@expo/vector-icons'

const NotificationList = ({ route }) => {
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
    const [notificationList, setNotificationList] = useState(false)



    const buttonHandler = () => {
        LogOutHandle(dispatch)
    }






    const ApiCaller = async () => {
        try {
            const res = await Get_Notification_API(tokenn)
            if (res) {
                console.log("", res.data)
                setNotificationList(res.data.allNotifications)
            }

        } catch (error) {
            console.log(error)

            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                }
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

    useFocusEffect(
        useCallback(() => {
            ApiCaller()
        }, [])
    )



    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Notifications"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />


                <FlatList
                    data={notificationList}
                    // keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index}

                            onPress={() => {
                                if (item.data.navigateTo == "home") {
                                    navigation.navigate("BottomTabScreen")
                                }
                                else if (item.data.navigateTo) {
                                    try {
                                        
                                        navigation.navigate(`${item.data.navigateTo}`)
                                    } catch (error) {
                                        navigation.navigate("BottomTabScreen")
                                    }
                                }else {

                                }
                            }}
                            style={{

                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                // height: Metrics.rfv(57),
                                paddingHorizontal: 15,
                                borderBottomColor: '#DDDDDD', borderBottomWidth: 1,
                                // marginHorizontal: 20,
                                // marginTop: 10,
                                paddingBottom: 10

                            }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontSize: Metrics.rfv(15), color: '#474464', fontWeight: 400, fontFamily: 'Poppins-Medium', marginTop: 10 }} numberOfLines={2}>{item.title}</Text>
                                <Text style={{ fontSize: Metrics.rfv(10), color: '#474464', fontWeight: 400, fontFamily: 'Poppins-Medium', }} numberOfLines={3}>{item.body}</Text>
                            </View>

                            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome6 name="arrow-right" size={15} color="black" style={{ marginTop: 12 }} />
                            </View> */}
                            {/* <Text style={{ fontSize: Metrics.rfv(15), color: '#474464', fontWeight: 400,fontFamily:'Poppins-Medium',marginTop:10}}>LK</Text> */}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default NotificationList

const styles = StyleSheet.create({})