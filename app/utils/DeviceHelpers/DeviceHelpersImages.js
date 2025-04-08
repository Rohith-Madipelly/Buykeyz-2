import * as ImagePicker from 'expo-image-picker';

export const OpenDeviceGalleryImagePicker = async (allowsMultipleSelection) => {
    console.log("allowsMultipleSelection",allowsMultipleSelection)
    try {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            Alert.alert('Permission required', 'Please allow permission to access your media library');
            return;
        }
 
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: allowsMultipleSelection,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        console.log(" getImagePicker pickerResult", pickerResult)

        if (!pickerResult.canceled) {
            console.log(pickerResult)
            // return pickerResult.assets[0].uri;
            return allowsMultipleSelection?pickerResult.assets:pickerResult.assets[0];
        }
    } catch (error) {
        console.log("Error in OpenDeviceCamera Module", error)
    }
};


export const OpenDeviceCameraImagePicker = async (allowsMultipleSelection) => {
    try {
        let result = await ImagePicker.requestCameraPermissionsAsync();
        if (result.granted === false) {
            Alert.alert('Permission required', 'Please allow permission to access your Camera');
            return;
        }
        let pickerResult = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })

        console.log(" OpenDeviceCamera pickerResult", pickerResult)

        if (!pickerResult.canceled) {
            // return pickerResult.assets[0].uri;
            return allowsMultipleSelection?pickerResult.assets:pickerResult.assets[0];
        }

    } catch (error) {
        console.log("Error in OpenDeviceCamera Module", error)
    }
};


