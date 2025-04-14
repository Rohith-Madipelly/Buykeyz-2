import { Alert,  Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyles from '../../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image';
import TextStyles from '../../../../components/UI/config/TextStyles'
import { LEFT_AND_RIGHT_PADDING, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../../../components/UI/config/AppContants'
import CustomTextInput from '../../../../components/UI/Inputs/CustomTextInput'
import { useFormik } from 'formik'
import { LoginPageYupSchema } from '../../../../formikYupSchemas/Auth/LoginPageYupSchema'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import { DELETE_ADDRESSES_API, GET_ALL_ADDRESSES_API, UserLoginApi } from '../../../../network/ApiCalls'
import AsyncStorage_Calls from '../../../../utils/AsyncStorage_Calls'
import { setToken } from '../../../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { TokenLogoutAlert } from '../../../../utils/LogOutHandle'
const LoginPage = () => {
  let tokenn = useSelector((state) => state.login.token);

  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerbool, setSpinnerbool] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [allLocations, setAllLocations] = useState("")
  const [selectLocation, setSelectLocation] = useState("")

  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  const insets = useSafeAreaInsets();
  console.log("insets", insets)




  const ApiCalls = async () => {
    seterrorFormAPI()
    setSpinnerbool(true)
    try {
      const res = await GET_ALL_ADDRESSES_API(tokenn);
      if (res.data) {
        console.log("res GET_ALL_ADDRESSES_API", res.data)
        setAllLocations(res.data?.allAddresses)
        if (res.data?.allAddresses.length > 0) {
          setSelectLocation(res.data?.allAddresses[0])
        } else {
          setSelectLocation('')
        }
      }
    } catch (error) {
      console.log("err", error.response.status)
      if (error.response.status === 400) {
        // TokenLogoutAlert(dispatch)
      }
      else if (error.response.status === 401) {
        if (tokenn == "GuestLogin") {
          Alert.alert(
            "Proceed as Guest",
            "You're not signed in. You can continue in guest mode, but you'll need to log in.",
            [

              {
                text: "Dismiss",
                style: "cancel",
                onPress: () => {
                  navigation.goBack()
                }
              },
              {
                text: "OK",
                onPress: () => {
                  // Enable guest mode
                  dispatch(setToken(""))
                }
              }
            ]
          )
        }
        else {
          HandleCommonErrors(error)
        }
        setSpinnerbool(false)
      }
      else {
        HandleCommonErrors(error)
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }

  const DeleteAddress = async (id) => {
    if (selectLocation._id == id) {
      console.log("dhvshvjs")
    }
    seterrorFormAPI()
    setSpinnerbool(true)
    try {
      const res = await DELETE_ADDRESSES_API(id, tokenn)
      if (res.data) {
        console.log("res GET_ALL_ADDRESSES_API", res.data)
        setAllLocations(res.data?.allAddresses)
        if (res.data) {
          console.log(" wekkj", res.data)
          getLocationsfromapi()
        }
      }
    } catch (error) {
      console.log("err", error.response.status)
      if (error.response.status === 401) {
        TokenLogoutAlert(dispatch)
      }

      else {
        HandleCommonErrors(error)
      }
    }
    finally {
      setSpinnerbool(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      ApiCalls()
    }, [])
  )

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
      <LoaderComponents
        visible={spinnerbool}
      />
      <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
        <CustomToolKitHeader componentName={"Profile"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: '100%', alignItems: 'center', }}>
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
              <View style={[{ backgroundColor: 'white', width: '95%', margin: 3, borderRadius: 10, marginVertical: 5, paddingBottom: 10, }, GlobalStyles.productBoxdropDownShadow2]}>
                <View style={{ margin: 3 }}>
                  <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={[{ fontWeight: 800 }]}>
                        Select Delivery Address
                      </Text>
                      <TouchableOpacity style={{}}
                        onPress={() => { navigation.navigate("AddDeliveryAddress") }}
                      >
                        <Text style={[{ fontWeight: 800, color: '#4A3AFF' }]}>
                          + Add Address
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <ScrollView style={{ margin: 5, }}>
                      {allLocations && allLocations.map((item, index) => {
                        return (
                          <View key={index} style={{
                            width: '100%', backgroundColor: '#4A3AFF26', marginVertical: 4, borderRadius: 10, padding: 10,
                            // borderWidth: selectLocation?._id == item?._id ? 1 : 0,
                            borderColor: '#4A3AFF'
                          }}>
                            <View style={{ flexDirection: 'row' }}>

                              <TouchableOpacity style={{ width: '90%' }} onPress={() => {
                                setSelectLocation(item)
                                // setOpenAddress(false)
                                // scrollToTopY(scrollViewRef, 0)
                              }}>
                                <Text style={{ fontWeight: 800, fontSize: 16, color: '#4A3AFF' }}>{item.addressName}</Text>
                                <Text style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</Text>
                                <Text style={{ fontSize: 12 }}>{item.address}, {item.area}, {item.city}, {item.state}, {item.district}, {item.pincode}</Text>
                                <Text style={{ fontSize: 12 }}>{item.phoneNumber}</Text>
                                <Text style={{ fontSize: 12 }}>{item.alternatePhoneNumber}</Text>
                              </TouchableOpacity>

                              <View style={{ justifyContent: 'center', alignItems: "center", gap: 25, }}>

                                <TouchableOpacity onPress={() => { DeleteAddress(`${item._id}`) }}>
                                  <FontAwesome5 name={'trash'} size={18} color={'red'} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity>
                                                     <FontAwesome name={'pencil'} size={18} color={'blue'} />
                                                 </TouchableOpacity> */}
                              </View>

                            </View>
                          </View>
                        )
                      })}

                      {allLocations && allLocations.length <= 0 && (<View style={{ justifyContent: 'center', alignItems: 'center', height: 160 }}>
                        <Text >
                          No Address found
                        </Text>
                      </View>)}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  LoanName: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    marginBottom: 5,
  },
  loanBox: {
    borderBottomWidth: 1,    // Thickness of the bottom border
    borderBottomColor: '#DDDDDD',
    paddingVertical: 2,
    marginTop: 6
  }
})