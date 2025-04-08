import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';

const CustomCheckBox = ({
    value,
    content,
    onBlur,
    asterisksymbol,
    boxWidth,
    onValueChange,
    CheckboxborderColor,
    // secure,
    // validate,
    // editable,
    errorMessage,
    errorColor = 'red',
}) => {

    return ( 
        <View style={{ padding: 0, width: boxWidth,marginLeft:2 }}>
            
                <View style={styles.section}>
                    <Checkbox style={styles.checkbox}
                        value={value}
                        onValueChange={onValueChange}
                        color={CheckboxborderColor ? CheckboxborderColor : '#4A3AFF'}
                        
                    // color={`${(errors.iagree && touched.iagree) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#48484A"}`}
                    />
                    <Text style={styles.paragraph}>{content} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text>


                </View>
            <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage}</Text>
        </View>
    )
}

export default CustomCheckBox

const styles = StyleSheet.create({

    container: {
        // padding: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
        // backgroundColor: 'white',
        // borderRadius: 10,
        // paddingHorizontal: 20,


        // ...Platform.select({
        //     ios: {
        //         shadowColor: 'black',
        //         shadowOffset: { width: 0, height: 2 },
        //         shadowOpacity: 0.2,
        //         shadowRadius: 4,
        //     },
        //     android: {
        //         elevation: 2,
        //     },
        // }),


    },
    outlined: {
        borderBottomColor: '#48484A',
        border: '#48484A',
        borderWidth: 0.9,
        borderCurve: 50,
    },






    // Check Box styles
    paragraph: {
        color: '#474464',
        fontSize: 12,
        fontWeight: '300',

    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        // margin: 8,
        marginRight: 12,

    },
})