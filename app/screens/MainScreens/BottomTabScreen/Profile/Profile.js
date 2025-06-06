import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LogOutHandle } from '../../../../utils/LogOutHandle';
import { useDispatch, useSelector } from 'react-redux';
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader';

import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SERVICE_PROVIDER_WEBSITE, THEME_COLOR } from '../../../../components/UI/config/AppContants';
import { CustomLinking } from '../../../../utils/CustomLinking';
import CustomStatusBar from '../../../../components/UI/CustomStatusBar/CustomStatusBar';
import GlobalStyles from '../../../../components/UI/config/GlobalStyles';

import Constants from "expo-constants";
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setToken } from '../../../../redux/actions/LoginAction';
import DeleteConfirmationModal from '../../../../components/Models/DeleteConfirmationModal';
import { USER_PROFILE_API, UserDeleteApi } from '../../../../network/ApiCalls';
import HandleCommonErrors from '../../../../utils/HandleCommonErrors';
import { useToast } from 'react-native-toast-notifications';



const renderItem1 = ({ item }) => {

  // for logout
  if (item.onPress) {
    return (
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={item.onPress}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {/* <View style={{ marginTop: 80 }}>

          </View> */}
        </TouchableOpacity>
      </View>
    )

  }
  return (
    // ({ item }) => (

    <View style={styles.menuItem}>
      <Text style={styles.menuTitle}>{item.title}</Text>
      {item.subItems && item.subItems.length > 0 && (
        <FlatList
          data={item.subItems}
          keyExtractor={(subItem, subIndex) => subIndex.toString()}
          renderItem={({ item: subItem }) => (

            <TouchableOpacity onPress={subItem.onPress}>

              <View style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>

                <View style={{ flexDirection: 'row', flex: 1, }}>

                  {subItem.logo ? <View style={{ marginRight: 18 }}>
                    <Image style={{ width: 24, height: 24, marginBottom: 4, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                      source={subItem.logo}
                      contentFit={"contain"} />
                  </View> : ""}
                  {subItem.myIcon ? <View style={{ marginRight: 18 }}>
                    {/* <Image style={{ width: 24, height: 24, marginBottom: 4, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                      source={subItem.logo}
                      contentFit={"contain"} /> */}
                    {subItem.myIcon}
                  </View> : ""}

                  {/* <View style={{ flex: subItem.logo ? 0.8 : 0.9 }}> */}
                  <View style={{ flex: 0.9 }}>
                    <Text style={styles.subMenuItem}>{subItem.title}</Text>

                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Image style={{ width: 24, height: 24 }}
                      source={require("../../../../assets/images/Profile/chevron_right.png")}
                      contentFit={"contain"} />
                  </View>
                </View>


              </View>
            </TouchableOpacity>
          )}

        />
      )}

    </View>
    // )}
  )
}


const renderFooter = () => (
  <View style={{ marginBottom: 150 }}>

    <Text style={{ color: '#001F2099', textAlign: 'center' }}>Version {Constants.expoConfig.version}</Text>
    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => {
      CustomLinking(SERVICE_PROVIDER_WEBSITE)
    }}>
      <MaterialIcons name="copyright" size={15} color={THEME_COLOR} />
      <Text style={{ color: THEME_COLOR, fontWeight: '600', textAlign: 'center', marginVertical: 10, marginLeft: 5, fontSize: 15 }}>
        Analogue IT Solutions
      </Text>
    </TouchableOpacity>


  </View>
);


const Menu = ({ items }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
      <LoaderComponents
        visible={false}
      />
      <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
        <CustomToolKitHeader componentName={"Profile"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem1}
            // style={{ marginBottom: 100 }}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
    paddingHorizontal: 2,
    // backgroundColor: 'white'
  },
  menuItem: {
    padding: 10,
    paddingBottom: 2
    // marginBottom: 24,
    // backgroundColor:'black'
  },
  menuTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#0A0240',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    // fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 20,
    color: '#07005B'
  },
  subMenuItem: {
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
});

const Profile = () => {
  let tokenn = useSelector((state) => state.login.token);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [canNavigate, setCanNavigate] = useState(true)
  const [loading, setLoading] = useState(false)
  const [personalDetailsAPI, setPersonalDetailsAPI] = useState(true)
  const toast = useToast()

  useEffect(() => {
    if (tokenn == "GuestLogin") {
      console.log("GuestLogin")
      setCanNavigate(false)
    }


    // subscriptionAccess


  }, [])

    useFocusEffect(
      useCallback(() => {
        ApiCaller()
      }, [])
    )
  

  const ApiCaller = async () => {

    try {
      const res = await USER_PROFILE_API(tokenn)
      if (res) {
        console.log("dcvd", res.data.profileDetails)
        setPersonalDetailsAPI(res.data.profileDetails.subscriptionAccess == "Inactive" ? true : false)
      }

    } catch (error) {
    }
    finally {
    }
  }

  const DeleteAccountApiCaller = async () => {
    try {
      setLoading(true)

      const res = await UserDeleteApi(tokenn)
      if (res.data) {
        toast.show(res.data.message)
        setTimeout(() => {
          dispatch(setToken(""));
        }, 200);
      }
    } catch (error) {
      HandleCommonErrors(error)

    } finally {
      setLoading(false)
    }
  }


  const DeleteAccount = () => {
    Alert.alert(
      "Delete Account?",
      "If you click Delete, your data will be permanently deleted and you won’t be able to log in again.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Perform deletion or cleanup logic here
            // dispatch(deleteUserData());
            DeleteAccountApiCaller()
            // logout or guest mode
          },
        },
      ]
    );

  }



  const SendOut = () => {
    Alert.alert(
      "Login Required",
      "You need to be signed in to buy products or access this feature.",
      [

        {
          text: "Dismiss",
          style: "cancel",
          // onPress: () => {
          // //   navigation.goBack()
          // }
        },
        {
          text: "Login",
          onPress: () => {
            // Enable guest mode
            dispatch(setToken(""))
          }
        }
      ]
    );
  }

  const menuItems = [

    {
      title: 'Your account',
      subItems: [
        {
          title: 'Account Details', logo: require("../../../../assets/images/Profile/edit.png"),

          onPress: () => {
            canNavigate ?
              navigation.navigate('Edit_Account') : SendOut()
          }
        },
        {
          title: 'Delivery Address', logo: require("../../../../assets/images/Profile/Delivery.png"),
          // onPress: () => navigation.navigate('DeliveryAddress') 
          onPress: () => {
            canNavigate ?
              navigation.navigate('DeliveryAddress') : SendOut()
          }

        },
      ],
    },
    {
      title: 'Security',
      subItems: [
        // { title: 'Bank Details', logo: require("../../../assets/Profile/account_balance.png"), onPress: () => navigation.navigate('BankdetailsProfile') },
        // { title: 'Custom remainder', logo: require("../../../assets/Profile/calendar_heart.png"), onPress: () => console.log('Custom remainder pressed') },
        // { title: 'App lock', logo: require("../../../assets/Profile/lock_01.png"), onPress: () => console.log('App Lock pressed') },
        {
          title: 'Change Password', myIcon: <Feather name="lock" size={24} color="black" />,
          // logo: require("../../../../assets/images/Profile/Password.png"), 

          onPress: () => {
            canNavigate ?
              navigation.navigate('ChangePassword') : SendOut()
          }
        },
        {
          title: 'Orders History',
          myIcon: <MaterialIcons name="manage-history" size={24} color="black" />,
          // logo: require("../../../../assets/images/Profile/deployed_code_history.png"), 
          onPress: () => {
            canNavigate ?
              navigation.navigate('OrderHistory') : SendOut()
          }
        },
        {
          title: 'Order Transactions',
          myIcon: <Ionicons name="receipt-outline" size={24} color="black" />,
          // logo: require("../../../../assets/images/Profile/receipt_long.png"),
          onPress: () => {
            canNavigate ?
              navigation.navigate('OrderTransactions') : SendOut()
          }
        },
        // { title: 'Delete account', logo: require("../../../assets/Profile/trash_02.png"), onPress: () => console.log('Delete Account pressed') },
        // { title: 'Delete account', logo: require("../../../assets/Profile/trash_02.png"), onPress: () => console.log('Delete Account pressed') },
      ],
    },
    {
      title: 'Others Details',
      subItems: [
        { title: 'Terms and Conditions', onPress: () => navigation.navigate('TermsandConditions') },
        {
          title: 'Privacy Policy',
          // myIcon:<MaterialIcons name="policy" size={24} color="black" />,
          onPress: () => navigation.navigate('PrivacyPolicy')
        },
        // { title: 'Delete Account Policy', 

        //   onPress: () => {
        //     canNavigate ?
        //     navigation.navigate('DeleteAccountPolicy') : SendOut()
        //   }
        //  },
        {
          title: 'Delete Account',

          onPress: () => {
            canNavigate ?
              personalDetailsAPI ?
                DeleteAccount() :(toast.hideAll(), toast.show("You can't delete your account because you have an active subscription.")
          ): SendOut()
          }
        },
        { title: 'Return and Refund Policy', onPress: () => navigation.navigate('ReturnAndRefendPolicy') },
        // { title: 'Disclaimer', onPress: () => console.log('Disclaimer pressed') },
        { title: 'Check Our Branches', onPress: () => navigation.navigate('Stores') },
      ],
    },
    { title: 'Logout', onPress: () => { LogOutHandle(dispatch); console.log('Logout pressed') } },
  ];

  return <>

    <Menu items={menuItems} /></>;
};



export default Profile;
