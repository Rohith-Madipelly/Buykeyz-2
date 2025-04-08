import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import { ADD_ADDRESS_LIST_API, UserLoginApi } from '../../../../network/ApiCalls'
import AsyncStorage_Calls from '../../../../utils/AsyncStorage_Calls'
import { setToken } from '../../../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import { InitialValuesDevForm } from '../../../../TestingData/InitialValuesDevForm'
import { AddDeliveryAddressYupSchema } from '../../../../formikYupSchemas/DeliveryAddress/AddDeliveryAddressYupSchema'
import { TokenLogoutAlert } from '../../../../utils/LogOutHandle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const AddDeliveryAddress = () => {
    let tokenn = useSelector((state) => state.login.token);
    const [refreshing, setRefreshing] = useState(false)
    const [show, setShow] = useState()
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [spinnerbool, setSpinnerbool] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRefresh = () => {
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    const insets = useSafeAreaInsets();
    console.log("insets", insets)




    const {
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        setErrors,
        isValid,
        setValues,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            // addressName: "", name: "", address: "", city: "", area: "", state: "", district: "", pincode: "", phoneNumber: "", alternatePhoneNumber: ""

            addressName: InitialValuesDevForm.AddDeliveryAddressFormData?.addressName || "",
            name: InitialValuesDevForm.AddDeliveryAddressFormData?.name || "",
            address: InitialValuesDevForm.AddDeliveryAddressFormData?.address || "",
            city: InitialValuesDevForm.AddDeliveryAddressFormData?.city || "",
            area: InitialValuesDevForm.AddDeliveryAddressFormData?.area || "",
            state: InitialValuesDevForm.AddDeliveryAddressFormData?.state || "",
            district: InitialValuesDevForm.AddDeliveryAddressFormData?.district || "",
            pincode: InitialValuesDevForm.AddDeliveryAddressFormData?.pincode || "",
            phoneNumber: InitialValuesDevForm.AddDeliveryAddressFormData?.phoneNumber || "",
            alternatePhoneNumber: InitialValuesDevForm.AddDeliveryAddressFormData?.alternatePhoneNumber || ""

        },

        onSubmit: values => {
            {
                console.log("Output from formik", values)
                submitHandler(values)
            }
        },

        validationSchema: AddDeliveryAddressYupSchema,
        validateOnBlur: false,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



    const submitHandler = async (values) => {
        seterrorFormAPI()
        setSpinnerbool(true)
        setShow({ password: false })
        try {
            const res = await ADD_ADDRESS_LIST_API(values, tokenn);
            if (res) {
                console.log("", res.data)
                toast.hideAll()
                toast.show(res.data.message)
                setTimeout(() => {
                    navigation.goBack()
                }, 200)
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

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <LoaderComponents
                visible={spinnerbool}
            />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Add Delivery Address"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                   <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        contentContainerStyle={{ flex: 1, }}
                      >
                        <View style={{ flex: 1, }}>
                            {/* <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                  animation={"bounceIn"}
                  source={require("../../../../assets/images/appLogo/buykeyzlogo.png")}
                  contentFit="cover"
                  transition={1000}
                  alt=''
                />
              </View> */}
                            <View style={{ flex: 0.7, justifyContent: 'flex-start', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>
                                <View>
                                    <Text>Name<Text style={{ color: 'red' }}>*</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: `${(errors?.name && touched?.name) || (errorFormAPI?.nameForm) ? "red" : GlobalStyles?.InputBorderColor}`,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Name"
                                            value={values?.name}
                                            onChangeText={(e) => {
                                                const regex = /^[A-Za-z\s]*$/;
                                                if (regex.test(e)) {
                                                    handleChange("name")(e);
                                                    seterrorFormAPI();
                                                }
                                            }}
                                            onBlur={handleBlur("name")}
                                            style={{
                                                height: 45,
                                                flex: 4,
                                                textAlignVertical: "center"
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        color: `${(errors?.name && touched?.name) || (errorFormAPI?.nameForm) ? "red" : GlobalStyles?.InputBorderColor}`,
                                        marginLeft: 15
                                    }}>
                                        {(errors?.name && touched?.name)
                                            ? errors?.name
                                            : (errorFormAPI?.nameForm || '')
                                        }
                                    </Text>
                                </View>


                                {/* Address Name */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>Address Name<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.addressName && touched?.addressName) || (errorFormAPI && errorFormAPI?.addressNameForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter address name"
                                            value={values?.addressName}
                                            onChangeText={(e) => {
                                                handleChange("addressName")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("addressName")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.addressName && touched?.addressName) || (errorFormAPI && errorFormAPI?.addressNameForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.addressName && touched?.addressName ? errors?.addressName : errorFormAPI?.addressNameForm || ""}
                                    </Text>
                                </View>

                                {/* Address */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>Address<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.address && touched?.address) || (errorFormAPI && errorFormAPI?.addressForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter address"
                                            value={values?.address}
                                            onChangeText={(e) => {
                                                handleChange("address")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("address")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.address && touched?.address) || (errorFormAPI && errorFormAPI?.addressForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.address && touched?.address ? errors?.address : errorFormAPI?.addressForm || ""}
                                    </Text>
                                </View>

                                {/* City */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>City<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.city && touched?.city) || (errorFormAPI && errorFormAPI?.cityForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter city"
                                            value={values?.city}
                                            onChangeText={(e) => {
                                                handleChange("city")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("city")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.city && touched?.city) || (errorFormAPI && errorFormAPI?.cityForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.city && touched?.city ? errors?.city : errorFormAPI?.cityForm || ""}
                                    </Text>
                                </View>

                                {/* Area */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>Area<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.area && touched?.area) || (errorFormAPI && errorFormAPI?.areaForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter area"
                                            value={values?.area}
                                            onChangeText={(e) => {
                                                handleChange("area")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("area")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.area && touched?.area) || (errorFormAPI && errorFormAPI?.areaForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.area && touched?.area ? errors?.area : errorFormAPI?.areaForm || ""}
                                    </Text>
                                </View>

                                {/* Pincode */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>Pincode<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.pincode && touched?.pincode) || (errorFormAPI && errorFormAPI?.pincodeForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter pincode"
                                            value={values?.pincode}
                                            onChangeText={(e) => {
                                                const pin = e.replace(/[^0-9]/g, '').slice(0, 6);
                                                handleChange("pincode")(pin);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("pincode")}
                                            keyboardType="numeric"
                                            maxLength={6}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.pincode && touched?.pincode) || (errorFormAPI && errorFormAPI?.pincodeForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.pincode && touched?.pincode ? errors?.pincode : errorFormAPI?.pincodeForm || ""}
                                    </Text>
                                </View>

                                {/* State */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>State<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.state && touched?.state) || (errorFormAPI && errorFormAPI?.stateForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter state"
                                            value={values?.state}
                                            onChangeText={(e) => {
                                                handleChange("state")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("state")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.state && touched?.state) || (errorFormAPI && errorFormAPI?.stateForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.state && touched?.state ? errors?.state : errorFormAPI?.stateForm || ""}
                                    </Text>
                                </View>

                                {/* District */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>District<Text style={{ color: 'red' }}> *</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.district && touched?.district) || (errorFormAPI && errorFormAPI?.districtForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter district"
                                            value={values?.district}
                                            onChangeText={(e) => {
                                                handleChange("district")(e);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("district")}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.district && touched?.district) || (errorFormAPI && errorFormAPI?.districtForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.district && touched?.district ? errors?.district : errorFormAPI?.districtForm || ""}
                                    </Text>
                                </View>

                                <View>
                                    <Text>Phone Number <Text style={{ color: 'red' }}>*</Text></Text>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: ((errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        marginVertical: 5
                                    }}>
                                        <TextInput
                                            placeholder="Enter Phone Number"
                                            value={values.phoneNumber}
                                            keyboardType="numeric"
                                            maxLength={10}
                                            onChangeText={(e) => {
                                                const onlyNumbers = e.replace(/[^0-9]/g, '').slice(0, 10);
                                                handleChange("phoneNumber")(onlyNumbers);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("phoneNumber")}
                                            style={{ height: 45 }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {(errors.phoneNumber && touched.phoneNumber) ? errors.phoneNumber : errorFormAPI?.phoneNumberForm || ""}
                                    </Text>
                                </View>
                                {/* Alternate Phone Number */}
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={{ marginLeft: 5 }}>Alternate Phone Number</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        borderWidth: 1,
                                        borderColor: ((errors?.alternatePhoneNumber && touched?.alternatePhoneNumber) || (errorFormAPI && errorFormAPI?.alternatePhoneNumberForm)) ? "red" : GlobalStyles?.InputBorderColor,
                                        marginVertical: 5,
                                    }}>
                                        <TextInput
                                            placeholder="Enter alternate phone number"
                                            value={values?.alternatePhoneNumber}
                                            onChangeText={(e) => {
                                                const phone = e.replace(/[^0-9]/g, '').slice(0, 10);
                                                handleChange("alternatePhoneNumber")(phone);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("alternatePhoneNumber")}
                                            keyboardType="numeric"
                                            maxLength={10}
                                            style={{ height: 45, flex: 1, textAlignVertical: "center" }}
                                        />
                                    </View>
                                    <Text style={{ color: ((errors?.alternatePhoneNumber && touched?.alternatePhoneNumber) || (errorFormAPI && errorFormAPI?.alternatePhoneNumberForm)) ? "red" : GlobalStyles?.InputBorderColor, marginLeft: 15 }}>
                                        {errors?.alternatePhoneNumber && touched?.alternatePhoneNumber ? errors?.alternatePhoneNumber : errorFormAPI?.alternatePhoneNumberForm || ""}
                                    </Text>
                                </View>


                                {/* <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter address'}
                                    label={'Address  (Street address, building name, etc.)'}
                                    name='address'
                                    value={values.address}
                                    onChangeText={(e) => { handleChange("address")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("address")}

                                    validate={handleBlur("address")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
                                />


                                <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter City'}
                                    label={'City'}
                                    name='city'
                                    value={values.city}


                                    onChangeText={async (e) => {
                                        const regex = /^[A-Za-z\s]*$/;
                                        if (regex.test(e)) {
                                            handleChange("city")(e); seterrorFormAPI();
                                        }
                                    }}

                                    onBlur={handleBlur("city")}
                                    validate={handleBlur("city")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    borderColor={`${(errors.city && touched.city) || (errorFormAPI && errorFormAPI.cityForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.city && touched.city) ? `${errors.city}` : (errorFormAPI && errorFormAPI.cityForm) ? `${errorFormAPI.cityForm}` : ``}`}
                                />

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Area'}
                                    label={'Area (Optional: Specific area or locality within the city)'}
                                    name='area'
                                    value={values.area}
                                    onChangeText={(e) => { handleChange("area")(e); seterrorFormAPI(); }}
                                    onBlur={handleBlur("area")}
                                    validate={handleBlur("area")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    borderColor={`${(errors.area && touched.area) || (errorFormAPI && errorFormAPI.areaForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.area && touched.area) ? `${errors.area}` : (errorFormAPI && errorFormAPI.areaForm) ? `${errorFormAPI.areaForm}` : ``}`}
                                />

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter pin code'}
                                    label={'Pin code'}
                                    // bgColor={'#F7F7F7'}
                                    name='pincode'
                                    value={values.pincode}
                                    maxLength={6}
                                    onChangeText={(e) => {
                                        const onlyNumbers = e.replace(/[^0-9]/g, '');
                                        handleChange("pincode")(onlyNumbers);
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("pincode")}
                                    validate={handleBlur("pincode")}
                                    keyboardType="numeric"
                                    outlined
                                    borderColor={`${(errors.pincode && touched.pincode) || (errorFormAPI && errorFormAPI.pincodeForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.pincode && touched.pincode) ? `${errors.pincode}` : (errorFormAPI && errorFormAPI.pincodeForm) ? `${errorFormAPI.pincodeForm}` : ``}`}
                                // errorColor='magenta'
                                />


                                <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter state'}
                                    label={'State'}
                                    name='state'
                                    value={values.state}

                                    onChangeText={async (e) => {
                                        const regex = /^[A-Za-z\s]*$/;
                                        if (regex.test(e)) {
                                            handleChange("state")(e); seterrorFormAPI();
                                        }
                                    }}
                                    onBlur={handleBlur("state")}
                                    validate={handleBlur("state")}
                                    outlined
                                    // bgColor={'#F7F7F7'}

                                    borderColor={`${(errors.state && touched.state) || (errorFormAPI && errorFormAPI.stateForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.state && touched.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.stateForm) ? `${errorFormAPI.stateForm}` : ``}`}
                                />

                                <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter District'}
                                    label={'District'}
                                    name='district'
                                    value={values.district}

                                    onChangeText={async (e) => {
                                        const regex = /^[A-Za-z\s]*$/;
                                        if (regex.test(e)) {
                                            handleChange("district")(e); seterrorFormAPI();
                                        }
                                    }}
                                    onBlur={handleBlur("district")}
                                    validate={handleBlur("district")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    borderColor={`${(errors.district && touched.district) || (errorFormAPI && errorFormAPI.districtForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.district && touched.district) ? `${errors.district}` : (errorFormAPI && errorFormAPI.districtForm) ? `${errorFormAPI.districtForm}` : ``}`}
                                /> */}





                                {/* <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter Phone Number'}
                                    label={'Phone Number'}
                                    name='phoneNumber'
                                    value={values.phoneNumber}

                                    onChangeText={(e) => {
                                        const onlyNumbers = e.replace(/[^0-9]/g, '').slice(0, 10); // Remove non-numeric characters and limit to 10 digits
                                        handleChange("phoneNumber")(onlyNumbers);
                                        seterrorFormAPI();
                                    }}

                                    onBlur={handleBlur("phoneNumber")}
                                    validate={handleBlur("phoneNumber")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    keyboardType="numeric"
                                    borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                /> */}
                                {/* <CustomTextInput
                                    boxWidth={'100%'}
                                    placeholder={'Enter Alternate Phone Number'}
                                    label={'Alternate Phone Number (Optional: for backup contact)  '}
                                    name='alternatePhoneNumber'
                                    value={values.alternatePhoneNumber}
                                    // onChangeText={(e) => { handleChange("alternatePhoneNumber")(e); seterrorFormAPI(); }}
                                    onChangeText={(e) => {
                                        const onlyNumbers = e.replace(/[^0-9]/g, '').slice(0, 10); // Remove non-numeric characters and limit to 10 digits
                                        handleChange("alternatePhoneNumber")(onlyNumbers);
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("alternatePhoneNumber")}
                                    validate={handleBlur("alternatePhoneNumber")}
                                    outlined
                                    // bgColor={'#F7F7F7'}
                                    keyboardType="numeric"
                                    borderColor={`${(errors.alternatePhoneNumber && touched.alternatePhoneNumber) || (errorFormAPI && errorFormAPI.alternatePhoneNumberForm) ? "red" : "#48484A"}`}
                                    errorMessage={`${(errors.alternatePhoneNumber && touched.alternatePhoneNumber) ? `${errors.alternatePhoneNumber}` : (errorFormAPI && errorFormAPI.alternatePhoneNumberForm) ? `${errorFormAPI.alternatePhoneNumberForm}` : ``}`}
                                />


                                <CustomTextInput
                                    boxWidth={'100%'}
                                    label={'Email Phone Number'}
                                    placeholder={'Enter phoneNumber'}
                                    // bgColor={'transparent'}
                                    asterisksymbol={true}
                                    value={values.phoneNumber}
                                    onChangeText={(e) => {
                                        // Remove any non-numeric characters
                                        let numericValue = e.replace(/[^0-9]/g, '');

                                        // Limit to 10 digits
                                        numericValue = numericValue.slice(0, 10);

                                        // Only call handleChange if the numeric value is not empty
                                        if (numericValue !== '') {
                                            handleChange('phoneNumber')(numericValue);
                                        } else {
                                            handleChange('phoneNumber')(''); // Reset to empty if cleared
                                        }
                                        // Reset any error message if needed
                                        seterrorFormAPI();
                                    }}
                                    onBlur={handleBlur("phoneNumber")}
                                    // validate={handleBlur("phoneNumber")}
                                    keyboardType={'phone-pad'}
                                    outlined
                                    borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : GlobalStyles.InputBorderColor}`}
                                    errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                /> */}

                               

                                <CustomButton
                                    // boxWidth={'95%'}
                                    bgColor={`${isValid ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                                    onPress={() => { handleSubmit() }}
                                    style={{ marginTop: 50 }}>
                                    Add Address
                                </CustomButton>
                                <View style={{ height: 400 }}>

                                </View>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default AddDeliveryAddress

const styles = StyleSheet.create({})