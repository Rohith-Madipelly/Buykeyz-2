import { StyleSheet, Platform } from 'react-native'


export const shadowBase = {
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,


        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    android: {},
};

export default StyleSheet.create({


    AuthScreenStatusBar1: {
        // color: 'white',
        color: '#F7F7F7',
        barStyle: 'dark-content',
        hiddenSettings: false,
        hiddenSettingsTrue: true
    },

    InputBorderColor: "#48484A",
    androidSafeArea: {
        flex: 1,
        // backgroundColor:'white',
        // paddingTop:Platform.OS==='android'?30:0,
        // backgroundColor:"white"
    },
    // White
    AuthScreenStatusBar2: {
        color: '#FAF9FE',
        // color: 'black',
        barStyle: 'dark-content',
        hiddenSettings: false,
        hiddenSettingsTrue: true
    },


    // App Color
    AuthScreenStatusBar3: {
        color: 'rgba(40, 62, 113, 1)',
        barStyle: 'light',
        hiddenSettings: false,
        hiddenSettingsTrue: true
    },


    // Shadow will not work in ios for that we can use 
    // for shadow in ios apply to top view 

    dropDownShadow1: {
        ...Platform.select({
            ios: shadowBase.ios,
            android: { elevation: 1 },
        }),
    },

    dropDownShadow2: {
        ...Platform.select({
            ios: shadowBase.ios,
            android: { elevation: 2 },
        }),
    },

    dropDownShadow3: {
        ...Platform.select({
            ios: { ...shadowBase.ios, shadowOpacity: 0.3, shadowRadius: 6 },
            android: { elevation: 3 },
        }),
    },

    dropDownShadow4: {
        ...Platform.select({
            ios: { ...shadowBase.ios, shadowOpacity: 0.4, shadowRadius: 8 },
            android: { elevation: 4 },
        }),
    },

    productBoxdropDownShadow2: {
        elevation: 1,
        borderColor: '#4C56641C',
        borderWidth: 0.3,

        shadowColor: '#0d0c0c', // For iOS
        shadowOffset: { width: 0.2, height: 0.2 }, // For iOS
        shadowOpacity: 0.5, // For iOS
        shadowRadius: 0.5, // For iOS
    },
    carouselDropDown: {
        elevation: 1,
        borderColor: '#4C56641C',
        borderWidth: 0.3,

        shadowColor: '#39404A', // For iOS
        shadowOffset: { width: 0.5, height: 0.2 }, // For iOS
        shadowOpacity: 0.5, // For iOS
        shadowRadius: 0.5, // For iOS
    },

    AppBackground: "#FAF9FE",
    AppPrimaryColor: "rgba(40, 62, 113, 1)"

})
