import { StyleSheet, Platform } from 'react-native'
import Metrics from '../../../utils/resposivesUtils/Metrics'


var fontFamily1 = "Poppins-SemiBold"
var fontFamily2 = "Poppins-Regular"
var fontFamily3 = "Poppins-Light"
// var fontFamily1 = "DMSans-SemiBold"


export default StyleSheet.create({

    TEXTSTYLE_HEADING_H1: {
        fontSize: Metrics.rfv(28),
        fontFamily: fontFamily1,
        fontWeight: 'bold',
        color:'#07005B'
    },
    TEXTSTYLE_PARA_20: {
        fontSize: Metrics.rfv(20),
        fontFamily: fontFamily2,
        fontWeight:'heavy',
        color:'#07005B'
    },
    TEXTSTYLE_PARA_12: {
        fontSize: Metrics.rfv(12),
        fontFamily: fontFamily2,
        fontWeight:'heavy',
        color:'#07005B'
    },
    TEXTSTYLE_HEADING_H2: {
        fontSize: Metrics.rfv(20),
        fontFamily: "Gilroy-ExtraBold",
        fontWeight: '400',
        // lineHeight: 22.5
    },
    TEXTSTYLE_HEADING_H3: {
        fontSize: Metrics.rfv(22),
        fontFamily: "Gilroy-ExtraBold",
        fontWeight: '400',
        // lineHeight: 22.5
    },
    TEXTSTYLE_A1: {
        fontSize: Metrics.rfv(24),
        fontFamily: "Gilroy-Medium"
    },
    TEXTSTYLE_A2: {
        fontSize: Metrics.rfv(20),
        fontFamily: "Gilroy-Medium"
    },
    TEXTSTYLE_A3: {
        fontSize: Metrics.rfv(12),
        fontFamily: "Gilroy-Regular"
    },
    TEXTSTYLE_A4: {
        fontSize: Metrics.rfv(24),
        fontFamily: "Gilroy-Medium"
    },
    TEXTSTYLE_A18: {
        fontSize: Metrics.rfv(16),
        fontFamily: "Gilroy-Medium",
        // lineHeight: 21.83
    },
    TEXTSTYLE_A16: {
        fontSize: Metrics.rfv(17),
        fontFamily: "Gilroy-Medium",
        // lineHeight: 21.83
    },
    TEXTSTYLE_A5: {
        fontSize: Metrics.rfv(14),
        fontFamily: "Gilroy-Medium",
        // lineHeight:20

    },
    TEXTSTYLE_A13: {
        fontSize: Metrics.rfv(13),
        fontFamily: "Gilroy-Medium",
        // lineHeight:20

    },
    TEXTSTYLE_A6: {
        fontSize: Metrics.rfv(12),
        fontFamily: "Gilroy-Medium",
        // lineHeight:19.2
    },
    TEXTSTYLE_A11: {
        fontSize: Metrics.rfv(11),
        fontFamily: "Gilroy-Medium",
        // lineHeight:13.34
    },
    TEXTSTYLE_A7: {
        fontSize: Metrics.rfv(10),
        fontFamily: "Gilroy-Medium",
        // lineHeight: 12.13
    },
    TEXTSTYLE_A9: {
        fontSize: Metrics.rfv(9),
        fontFamily: "Gilroy-Medium",
        // lineHeight: 12.13
    },

    TEXTSTYLE_B10: {
        fontSize: Metrics.rfv(10),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 17.33
    },
    TEXTSTYLE_B12: {
        fontSize: Metrics.rfv(12),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 17.33
    },
    TEXTSTYLE_B5: {
        fontSize: Metrics.rfv(14),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 17.33
    },
    TEXTSTYLE_B16: {
        fontSize: Metrics.rfv(16),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 19.81
    },
    TEXTSTYLE_B18: {
        fontSize: Metrics.rfv(18),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 22.28
    },
    TEXTSTYLE_B20: {
        fontSize: Metrics.rfv(20),
        fontFamily: "Gilroy-Bold",
        // lineHeight: 19.81
    },



    TEXTSTYLE_B11: {
        fontSize: 11,
        fontFamily: "Gilroy-Bold",
        // lineHeight: 19.81
    },

    TEXTSTYLE_R12: {
        fontSize: 12,
        fontFamily: "Gilroy-Regular",
        // lineHeight: 22.28,
        fontWeight: "400"
    },

})