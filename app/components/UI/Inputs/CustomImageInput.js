import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BottomSheet } from 'react-native-sheet';
import { Feather, Fontisto } from '@expo/vector-icons';
import { OpenDeviceCameraImagePicker, OpenDeviceGalleryImagePicker } from '../../../utils/DeviceHelpers/DeviceHelpersImages';
import Metrics from '../../../utils/resposivesUtils/Metrics';

const CustomImageInput = ({
    boxWidth,

    label,
    labelStyle,
    rightLabelBtn,
    style,
    value,
    placeholder,
    placeholderTextColor,
    autoComplete,
    containerStyle,
    keyboardType,
    autoCapitalize,
    outlined,
    onBlur,
    asterisksymbol,
    leftIcon,
    rightIcon,
    numLines,
    onSelectFile,
    borderColor,
    secure,
    validate,
    editable,
    errorMessage,
    errorColor = 'red',
    bgColor,
    maxLength,
    InputStyle

}) => {

    const backgroundColor = bgColor || 'white';
    const containerBorder = outlined ? styles.outlined : styles.standard;
    const [errorData, setErrorData] = useState()

    const bottomSheetRef = useRef()



    // "visible-password"
    // "number-pad"
    // "phone-pad"

    const OpenGallery = async () => {
        // console.log("Opening OpenGallery")
        const GalleryData = await OpenDeviceGalleryImagePicker()
        // console.log(GalleryData)
        await bottomSheetRef.current.hide();
        await onSelectFile(GalleryData)
        // setTimeout(()=>{
        // },200)

    }


    const OpenCamera = async () => {
        // console.log("Opening OpenCamera")
        const CameraData = await OpenDeviceCameraImagePicker()
        console.log(CameraData)
        await bottomSheetRef.current.hide();
        onSelectFile(CameraData)
        // setTimeout(()=>{
        // },200)
    }


    console.log("Modeule console", value)

    return (
        <>
            <BottomSheet height={Metrics.rfv(230)} ref={bottomSheetRef} style={{ backgroundColor: 'white' }}>
                <TouchableOpacity
                    onPress={() => { bottomSheetRef.current.hide() }}
                    style={{ 
                        position: 'absolute',
                        top: -5,
                        right: 5,
                        padding: 5,
                        zIndex: 1,
                    }}>
                    <Text style={{
                        fontSize: 24,
                        color: 'black',
                    }}>&times;</Text>

                </TouchableOpacity>
                <View style={{
                    marginHorizontal: Metrics.rfv(15),
                    marginVertical: Metrics.rfv(15)
                }}>





                    {/* <Text style={[styles.label,{ textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 600 }]}>Select photo</Text> */}

                    <Text style={[{
                        fontSize: 16,
                        fontFamily: "Gilroy-Bold",
                        lineHeight: 19.81, color: "#444546", textAlign: 'center'
                    }]}>Select photo</Text>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ width: "100%", height: 1, backgroundColor: '#D8D8D8', width: '95%', alignSelf: 'center' }} />
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
                        <Pressable
                            onPress={() => {
                                OpenCamera()
                            }}
                            style={[styles.BottomSheetPressables]}
                        >
                            <Feather name="camera" size={24} color="black" />
                            <Text style={{ marginTop: Metrics.rfv(3) }}>Camera</Text>
                        </Pressable>


                        <Pressable
                            onPress={() => {
                                OpenGallery()
                            }}
                            style={[styles.BottomSheetPressables]}
                        >
                            <Fontisto name="photograph" size={26} color="black" />
                            <Text style={{ marginTop: Metrics.rfv(3) }}>Gallery</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheet>
            <View style={[{ padding: 0, width: boxWidth }, style, styles.boxHeight]}>
                {label ? <Text style={[styles.label, labelStyle]}>{label} {asterisksymbol ? <Text style={{ color: 'red' }}>*</Text> : ""}</Text> : ""}


                <TouchableOpacity
                    onPress={() => { bottomSheetRef.current.show() }}
                    style={[styles.container, containerBorder, containerStyle, { borderColor: borderColor }, { backgroundColor: backgroundColor }]}>
                    <View style={{ paddingRight: 7 }}>
                        {leftIcon}
                    </View>
                    {/* <TextInput
                    placeholder={placeholder ? placeholder : label ? `Enter ${label}` : ''}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : "white"}
                    value={value}
                    secureTextEntry={secure}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onSelectFile={(e) => {
                        onSelectFile(e); // Pass the formatted text back
                    }}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    onEndEditing={validate}
                    multiline={numLines > 1 ? true : false}
                    numberOfLines={numLines}
                    editable={editable}
                    // style={[{ flex: 4 }, InputStyle]}
                    style={[InputStyle, styles.Inputstyling, { flex: 4, alignSelf: "center" }]}
                /> */}

                    <View style={[InputStyle, styles.Inputstyling, { flex: 4, alignSelf: "center", justifyContent: 'center' }]}>
                        <Text style={[styles.label, InputStyle, { alignSelf: "center", textAlign: 'center', textAlignVertical: 'center', marginBottom: 0, width: '80%', color: placeholderTextColor && placeholderTextColor }]} numberOfLines={1}>{value?.fileName ? value?.fileName : placeholder}</Text>
                    </View>
                    <View style={{ paddingLeft: 5 }}>
                        {rightIcon}
                    </View>
                </TouchableOpacity>
                <Text style={{ color: errorColor, marginLeft: 15 }}>{errorMessage || errorData}</Text>
            </View>
        </>
    )
}

export default CustomImageInput

const styles = StyleSheet.create({
    label: {
        fontWeight: '400',
        marginBottom: 4,
        textTransform: 'none',
        fontFamily: 'Gilroy-Medium',
        fontSize: 14,
        lineHeight: 24,
        // marginLeft:5
    },
    container: {
        // padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 5,
        paddingHorizontal: 10,


        // ...Platform.select({
        //     ios: {
        //         // shadowColor: 'black',
        //         // shadowOffset: { width: 0, height: 2 },
        //         // shadowOpacity: 0.2,
        //         // shadowRadius: 4,
        //     },
        //     android: {
        //         // elevation: 2,
        //     },
        // }),


    },
    Inputstyling: {
        height: 45
    },
    outlined: {
        borderWidth: 1,
    },



    BottomSheetPressables: {
        borderRadius: 10, borderColor: "#D8D8D8", borderWidth: 2,
        padding: Metrics.rfv(15),
        flex: 0.3,
        justifyContent: 'center', alignItems: 'center'
    }
})