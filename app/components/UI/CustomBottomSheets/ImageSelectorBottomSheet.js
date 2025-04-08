import { StyleSheet, Text, View, TouchableOpacity, Pressable, Platform } from 'react-native'
import React from 'react'
import { BottomSheet } from 'react-native-sheet';

import { Feather, Fontisto } from '@expo/vector-icons';
import Metrics from '../../../utils/resposivesUtils/Metrics';
import { OpenDeviceCameraImagePicker, OpenDeviceGalleryImagePicker } from '../../../utils/DeviceHelpers/DeviceHelpersImages';


const ImageSelectorBottomSheet = ({
    bottomSheetRefCamera,
    onSelectFile,
    multipleSelection = true


}) => {

    // const bottomSheetRefCamera = useRef()

    const OpenGallery = async () => {
        // console.log("Opening OpenGallery")
        const GalleryData = await OpenDeviceGalleryImagePicker(multipleSelection)
        // console.log("setuuuuuuuuu",GalleryData)
        await bottomSheetRefCamera.current.hide();
        await onSelectFile(GalleryData)
        // setTimeout(()=>{
        // },200)

    }


    const OpenCamera = async () => {
        // console.log("Opening OpenCamera")
        const CameraData = await OpenDeviceCameraImagePicker(multipleSelection)
        console.log(CameraData)
        await bottomSheetRefCamera.current.hide();
        onSelectFile(CameraData)
        // setTimeout(()=>{
        // },200)
    }



    return (
        <>
            <BottomSheet height={Platform.OS === "ios" ? Metrics.rfv(170) : Metrics.rfv(230)} ref={bottomSheetRefCamera} style={{ backgroundColor: 'white' }}>
                <TouchableOpacity
                    onPress={() => { bottomSheetRefCamera.current.hide() }}
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
        </>
    )
}

export default ImageSelectorBottomSheet

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
        justifyContent: 'center', alignItems: 'center',
        // aspectRatio:1.3
        // width:300
        maxWidth: 200
    }
})