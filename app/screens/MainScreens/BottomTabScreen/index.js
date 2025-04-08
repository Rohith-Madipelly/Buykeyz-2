
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Metrics from '../../../utils/resposivesUtils/Metrics';

import {
  AntDesign,
} from "@expo/vector-icons";



import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './Home/Home'
import Stores from './Stores/Stores'
import Rewards from './Rewards/Rewards';
import Profile from './Profile/Profile';
import Products from './Products/Products'



// import AllBranches from '../AllBranches';


import HomeIconActive from '../../../assets/svg/BottomTabs/HomeIconActive';
import HomeIcon from '../../../assets/svg/BottomTabs/HomeIcon';

import CartIconActive from '../../../assets/svg/BottomTabs/CartIconActive';
import CartIcon from '../../../assets/svg/BottomTabs/CartIcon';

import StoreIconActive from '../../../assets/svg/BottomTabs/StoreIconActive';
import StoreIcon from '../../../assets/svg/BottomTabs/StoreIcon';

import ProfileIcon from '../../../assets/svg/BottomTabs/ProfileIcon';
import ProfileActiveIcon from '../../../assets/svg/BottomTabs/ProfileActiveIcon';



import RewardActiveIcon from '../../../assets/svg/BottomTabs/RewardActiveIcon';
import RewardIcon from '../../../assets/svg/BottomTabs/RewardIcon';
import ProductsIcon from '../../../assets/svg/BottomTabs/ProductsIcon';
import ProductsIconActive from '../../../assets/svg/BottomTabs/ProductsIconActive';


const Tab = createBottomTabNavigator();

const BottomTabScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: Platform.OS === "ios" ? 0.08 : 0.102,
          backgroundColor: 'white'
        },
        tabBarIcon: ({ focused, size, colour }) => {
          if (route.name === "Home") {
            return (
              <View style={[styles.tabBoxContainer]}>
                {focused ? <HomeIconActive /> : <HomeIcon />}
                <Text
                  style={[styles.tabTextStyle, {
                    color: focused ? tabActiveColor : tabDisableColor,
                    fontWeight: focused ? 700 : 500,
                  }]}
                >Home</Text>
              </View>)
          }

          else if (route.name === "Stores") {
            return (
              <View style={[styles.tabBoxContainer]}>
                {focused ? <StoreIconActive /> : <StoreIcon />}
                <Text
                  style={[styles.tabTextStyle, {
                    color: focused ? tabActiveColor : tabDisableColor,
                    fontWeight: focused ? 700 : 500,
                  }]}
                >Stores</Text>
              </View>)
          }
          // else if (route.name === "Cart") {
          //   return (
          //     <View style={[styles.tabBoxContainer]}>
          //       {focused ? <StoreIconActive /> : <StoreIcon />}
          //       <Text
          //         style={[styles.tabTextStyle, {
          //           color: focused ? tabActiveColor : tabDisableColor,
          //           fontWeight: focused ? 700 : 500,
          //         }]}
          //       >Cart</Text>
          //     </View>)
          // }

          else if (route.name === "Products") {
            return (
              <View style={[styles.tabBoxContainer]}>
                {focused ? <ProductsIconActive /> : <ProductsIcon />}
                <Text
                  style={[styles.tabTextStyle, {
                    color: focused ? tabActiveColor : tabDisableColor,
                    fontWeight: focused ? 700 : 500,
                  }]}
                >Products</Text>
              </View>)
          }

          else if (route.name === "Rewards") {
            return (
              <View style={[styles.tabBoxContainer]}>
                {focused ? <RewardActiveIcon /> : <RewardIcon />}
                <Text
                  style={[styles.tabTextStyle, {
                    color: focused ? tabActiveColor : tabDisableColor,
                    fontWeight: focused ? 700 : 500,
                  }]}
                >Rewards</Text>
              </View>)
          }
          else if (route.name === "Profile") {
            return (
              <View style={[styles.tabBoxContainer,]}>
                {focused ? <ProfileActiveIcon /> : <ProfileIcon />}
                <Text
                  style={[styles.tabTextStyle, {
                    color: focused ? tabActiveColor : tabDisableColor,
                    fontWeight: focused ? 700 : 500,
                  }]}
                >Profile</Text>
              </View>)
          }
          // Cart
        }
        // tabBarIcon: ({ focused, size, colour }) => {
        //   let iconName;
        //   if (route.name === "Home") {
        //     size = focused ? size + 8 : size + 2;
        //     colour = focused ? "Black" : "White";


        //     return (
        //       <View style={{
        //         flex:1,
        //         flexDirection: 'column', alignItems: 'center',
        //         backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "",
        //         width: '100%', height: '100%',
        //       }}>
        //         <Text>dcjvjhs</Text>
        //       </View>
        //     )
        //     // return (
        //     //   <View style={{
        //     //     flexDirection: 'column', alignItems: 'center',
        //     //     backgroundColor: focused ? "rgba(74, 58, 255, 0.14)" : "",
        //     //     width: '100%', height: '100%',
        //     //     borderTopWidth: focused ? 2 : 0,
        //     //     borderColor: 'rgba(74, 58, 255, 1)', paddingTop: 10
        //     //   }}>
        //     //     {focused ? <HomeIconActive /> : <HomeIcon />}
        //     //     {focused ? <Text style={{ fontSize: 12, marginBottom: 7, color: focused ? "#4A3AFF" : "black" }}>Home</Text> : <Text style={{ fontSize: 12, marginTop: 5, color: focused ? "#4A3AFF" : "black" }}></Text>}
        //     //   </View>)

        //   }
      })}>


      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, // Show the header
        // headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        // headerLeft: () => (
        // <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
        //   <AntDesign name="arrowleft" size={24} color="black" />
        // </TouchableOpacity>
        // ),
      }} />


      <Tab.Screen name="Stores" component={
        // BottomStore
        Stores
      }
        options={{
          // headerShown: true, // Show the header
          headerShown: false, // Show the header
          headerBackVisible: true, // Hide the back button
          headerStyle: {
            // backgroundColor: 'white',
          },
          headerTintColor: '#07005B',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 20
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          ),
        }} />


      <Tab.Screen name="Products" component={Products} options={{
        // headerShown: true, // Show the header
        headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />

      <Tab.Screen name="Rewards" component={Rewards} options={{
        // headerShown: true, // Show the header
        headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />


      <Tab.Screen name="Profile" component={Profile} options={{
        // headerShown: true, // Show the header
        headerShown: false, // Show the header
        headerBackVisible: true, // Hide the back button
        headerStyle: {
          // backgroundColor: 'white',
        },
        headerTintColor: '#07005B',
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 20
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginLeft: 15 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ),
      }} />

    </Tab.Navigator>
  );
};

export default BottomTabScreen;




const styles = StyleSheet.create({
  tabBoxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 15,
    width: Metrics.rfv(90)
  },
  tabTextStyle: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(5),
    width: '100%',
    textAlign: 'center'
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#ff5757",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },


})









const tabActiveColor = "#283E71"
const tabDisableColor = "#ABABAB"