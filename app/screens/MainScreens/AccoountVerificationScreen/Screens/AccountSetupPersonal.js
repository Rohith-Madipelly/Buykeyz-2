import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { AccountPersonalYupSchema } from "../../../../formikYupSchemas/AccountSetupSchema/AccountPersonalYupSchema";
import { ADDPERSONALDETAILS_API, GET_CHECKIN_API } from "../../../../network/ApiCalls";
import CustomTextInput from "../../../../components/UI/Inputs/CustomTextInput";
import CustomButton from "../../../../components/UI/Buttons/CustomButton";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextStyles from "../../../../components/UI/config/TextStyles";
import CustomImageInput from "../../../../components/UI/Inputs/CustomImageInput";
import { PageHandler } from "../ScreenMaintainer/PageHandler";
import LoaderComponents from "../../../../components/UI/Loadings/LoaderComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";







const AccountSetupPersonal = () => {
    const navigation = useNavigation();
    const [spinnerbool, setSpinnerbool] = useState(false)
    const [personalDetailsAPI, setPersonalDetailsAPI] = useState(false)
    const toast = useToast()

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [fileReadyToUp, setfileReadyToUp] = useState(false)
    const dispatch = useDispatch();

    pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
    };


    let tokenn = useSelector((state) => state.login.token);

    const getpersonalDetails = async () => {
        try {
            const res = await GET_CHECKIN_API(tokenn)
            console.log("fileReadyToUp", fileReadyToUp)
            console.log(res.data)
            setPersonalDetailsAPI(res.data.userDetails)
        } catch (error) {
            console.log("API Error in GET_PERSONAL_DETAILS_API", error)
            if (error.response) {
                if (error.response.status === 400) {
                    console.log("Error With 400.", error.response.data)
                }
                else if (error.response.status === 401) {
                    console.log("Error With 401.", error.response.data)
                }
                else if (error.response.status === 403) {
                    console.log("error.response.status login", error.response.data.message)
                }
                else if (error.response.status === 404) {
                    console.log("error.response.status login", error.response.data.message)
                    ServerTokenError_Logout(undefined, undefined, dispatch)
                }
                else if (error.response.status >= 500) {
                    console.log("Internal Server Error", error.message)
                    ServerError(undefined, `${error.message}`)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    Alert.alert("An error occurred response", error.message)

                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }
            else {
                console.log("Error in Setting up the Request.", error)
            }
        }
        finally {

        }

    }


    useEffect(() => {
        getpersonalDetails()
    }, [])

    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
        setValues,
        resetForm,
    } = useFormik({
        initialValues: {
            passPortPicture: "",
            fullName: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
            district: "",
            address: "",
            street: "",
            area: "",
            pincode: ""
        },
        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: AccountPersonalYupSchema,

        validate: values => {
            const errors = {};
            if (errors.passPortPicture) {

            }
            return errors;
        },

    });
    console.log("Formik Errors", errors)



    useEffect(() => {
        if (personalDetailsAPI) {
            const timer = setTimeout(() => {

                setValues({
                    values,
                    fullName: `${personalDetailsAPI.fullName}`,
                    phoneNumber: `${personalDetailsAPI?.phoneNumber || ""}`,
                    email: `${personalDetailsAPI.email}`,

                    district: `${personalDetailsAPI?.district || ""}`,
                    street: personalDetailsAPI?.street || "",
                    state: `${personalDetailsAPI?.state || ""}`,
                    address: `${personalDetailsAPI?.address || ""}`,
                    area: `${personalDetailsAPI?.area || ""}`,
                    pincode: `${personalDetailsAPI?.pincode || ""}`,
                    careOf: `${personalDetailsAPI?.careOf || ""}`,
                    // dateOfBirth: `${personalDetailsAPI?.dateOfBirth}`||"",
                    dateOfBirth: personalDetailsAPI?.dateOfBirth || "",
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [personalDetailsAPI]);


    const submitHandler = async (values) => {
        console.log(values)
        try {

            setSpinnerbool(true)
            // const res = await AddPersonalDetailsAPI(values, tokenn)
            const res = await ADDPERSONALDETAILS_API(values, tokenn)
            if (res) {
                console.log(res.data)

                setfileReadyToUp("")
                // PageHandler(3, dispatch)
                toast.show(res.data.message)
                setTimeout(() => {
                    PageHandler(3, dispatch)

                }, 200);
            }

        } catch (error) {
            console.log("cs", error)
            console.log("error console", error.response.data.message)
            // ToasterMessage("success", `Success`, `${error.response.data.message}`)

            if (error.response) {
                if (error.response.status === 400) {
                    // Alert.alert(error.response.data.message)
                    console.log(error.response.data.message)

                    Alert.alert(error.response.data.message, "Click to reset the route", [
                        {
                            text: 'ok', onPress: () => {
                                try {
                                    if (error.response.data) {
                                        console.log("error.response.data", error.response.data.kycStatus)
                                        setTimeout(() => {
                                            PageHandler(error.response.data.kycStatus, dispatch)
                                            // setAPIResponses("")
                                        }, 1000)
                                    }
                                } catch (e) {
                                    console.log("error", e);
                                }
                            }
                        }],
                        { cancelable: false })

                    // seterrorFormAPI({ phoneNumberForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    // LogOutHandle(dispatch);
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    console.log("Outofboxerror", error.response.data.data)

                    //   ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    console.log("error in request ", error.request.status)
                    //   Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }
        }

        finally {
            setSpinnerbool(false)
        }
    }

    return (
        <>
            <View style={{
                flex: 1,
                // backgroundColor:'pink'
            }}>
                <LoaderComponents
                    visible={spinnerbool}
                />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                       <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                              contentContainerStyle={{ flex:1, }}
                                          >
                            <View style={{ marginHorizontal: 18 }}>
                                {/* <Title TitleName="Enter Personal Details" style={{ marginVertical: 1, marginTop: 10 }}></Title> */}
                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1]}>Enter Personal Details</Text>

                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    {/* <Text>{tokenn}</Text> */}

                                    {/* <CustomFileInput
                                        onSelectFile={(result) => {
                                            setfileReadyToUp(result.assets[0].name)
                                            setFieldValue('passPortPicture', result.assets[0]);
                                        }}
                                        boxWidth={'95%'}
                                        placeholder={fileReadyToUp ? fileReadyToUp : 'Upload only jpg or png format image less than 10mb'}
                                        label={'Upload your passport size photo'}
                                        name='passPortPicture'
                                        outlined
                                        borderColor={`${(errors.passPortPicture && touched.passPortPicture) || (errorFormAPI && errorFormAPI.passPortPictureForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.passPortPicture && touched.passPortPicture) ? `${errors.passPortPicture}` : (errorFormAPI && errorFormAPI.passPortPictureForm) ? `${errorFormAPI.passPortPictureForm}` : ``}`}
                                    /> */}

                                    <CustomImageInput
                                        boxWidth={'95%'}
                                        label={'Upload your passport size photo'}
                                        bgColor={'transparent'}
                                        // asterisksymbol={true}
                                        labelStyle={{ color: '#4C5664' }}
                                        InputStyle={{ color: '#4C5664' }}
                                        placeholder={fileReadyToUp ? fileReadyToUp : 'Upload only jpg or png format image less than 10mb'}

                                        placeholderTextColor={'#4C5664'}
                                        name='passPortPicture'
                                        value={values.passPortPicture}
                                        // maxLength={12}
                                        onSelectFile={(result) => {
                                            setfileReadyToUp(result.name)
                                            setFieldValue('passPortPicture', result);
                                        }}
                                        onBlur={handleBlur("passPortPicture")}
                                        validate={handleBlur("passPortPicture")}
                                        // keyboardType="numeric"
                                        outlined
                                        borderColor={`${(errors.passPortPicture && touched.passPortPicture) || (errorFormAPI && errorFormAPI.passPortPictureForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.passPortPicture && touched.passPortPicture) ? `${errors.passPortPicture}` : (errorFormAPI && errorFormAPI.passPortPictureForm) ? `${errorFormAPI.passPortPictureForm}` : ``}`}

                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter full name'}
                                        label={'Full name'}
                                        name='address'
                                        value={values.fullName.toUpperCase()}
                                        editable={false}
                                        onChangeText={(e) => { handleChange("fullName")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("fullName")}
                                        validate={handleBlur("fullName")}
                                        outlined
                                        borderColor={`${(errors.fullName && touched.fullName) || (errorFormAPI && errorFormAPI.firstNameForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.fullName && touched.fullName) ? `${errors.fullName}` : (errorFormAPI && errorFormAPI.firstNameForm) ? `${errorFormAPI.firstNameForm}` : ``}`}
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter email'}
                                        label={'Email'}
                                        name='email'
                                        value={values.email}
                                        editable={false}
                                        onChangeText={(e) => { handleChange("email")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("email")}
                                        validate={handleBlur("email")}
                                        outlined
                                        borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter phone number'}
                                        label={'Phone number'}
                                        name='phoneNumber'
                                        value={values.phoneNumber}
                                        onChangeText={(e) => {
                                            // Remove any non-numeric characters
                                            const numericValue = e.replace(/[^0-9]/g, '');
                                            handleChange("phoneNumber")(numericValue);
                                            seterrorFormAPI();
                                        }}
                                        onBlur={handleBlur("phoneNumber")}
                                        validate={handleBlur("phoneNumber")}
                                        keyboardType="numeric"
                                        outlined
                                        editable={false}
                                        borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                                    />


                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Date of birth'}
                                        label={'Date of birth'}
                                        name='dateOfBirth'
                                        value={values.dateOfBirth}
                                        onChangeText={(e) => { handleChange("dateOfBirth")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("dateOfBirth")}
                                        validate={handleBlur("dateOfBirth")}
                                        outlined
                                        borderColor={`${(errors.dateOfBirth && touched.dateOfBirth) || (errorFormAPI && errorFormAPI.dateOfBirthForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.dateOfBirth && touched.dateOfBirth) ? `${errors.dateOfBirth}` : (errorFormAPI && errorFormAPI.dateOfBirthForm) ? `${errorFormAPI.dateOfBirthForm}` : ``}`}
                                    // errorColor='magenta'
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter district'}
                                        label={'District'}
                                        name='district'
                                        value={values.district}
                                        onChangeText={(e) => { handleChange("district")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("district")}
                                        validate={handleBlur("district")}
                                        outlined
                                        // editable={false}
                                        borderColor={`${(errors.district && touched.district) || (errorFormAPI && errorFormAPI.districtForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.district && touched.district) ? `${errors.district}` : (errorFormAPI && errorFormAPI.districtForm) ? `${errorFormAPI.districtForm}` : ``}`}
                                    // errorColor='magenta'
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter address'}
                                        label={'Address'}
                                        name='address'
                                        value={values.address}
                                        numLines={4}
                                        onChangeText={(e) => { handleChange("address")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("address")}
                                        validate={handleBlur("address")}
                                        outlined
                                        borderColor={`${(errors.address && touched.address) || (errorFormAPI && errorFormAPI.addressForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.address && touched.address) ? `${errors.address}` : (errorFormAPI && errorFormAPI.addressForm) ? `${errorFormAPI.addressForm}` : ``}`}
                                    // errorColor='magenta'
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter street'}
                                        label={'Street Name'}
                                        name='street'
                                        value={values.street}
                                        // numLines={4}
                                        onChangeText={(e) => { handleChange("street")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("street")}
                                        validate={handleBlur("street")}
                                        outlined
                                        borderColor={`${(errors.street && touched.street) || (errorFormAPI && errorFormAPI.streetForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.street && touched.street) ? `${errors.street}` : (errorFormAPI && errorFormAPI.streetForm) ? `${errorFormAPI.streetForm}` : ``}`}
                                    // errorColor='magenta'
                                    />
                                    {/* street */}


                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter area'}
                                        label={'Area'}
                                        name='area'
                                        value={values.area}
                                        onChangeText={(e) => { handleChange("area")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("area")}
                                        validate={handleBlur("area")}
                                        outlined
                                        borderColor={`${(errors.area && touched.area) || (errorFormAPI && errorFormAPI.areaForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.area && touched.area) ? `${errors.area}` : (errorFormAPI && errorFormAPI.areaForm) ? `${errorFormAPI.areaForm}` : ``}`}
                                    // errorColor='magenta'
                                    />


                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter pin code'}
                                        label={'Pin code'}
                                        name='pincode'
                                        value={values.pincode}
                                        onChangeText={(e) => {
                                            // Remove any non-numeric characters
                                            let numericValue = e.replace(/[^0-9]/g, '');
                                            // Limit the length to 6 digits
                                            if (numericValue.length > 6) {
                                                numericValue = numericValue.substring(0, 6);
                                            }
                                            // Update the state with the numeric value
                                            handleChange("pincode")(numericValue);
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





                                    <CustomButton
                                        boxWidth={'95%'}
                                        onPress={() => { handleSubmit() }}
                                        style={{ marginTop: 50 }}>Next</CustomButton>



                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </TouchableWithoutFeedback>

                </ScrollView>
            </View>
        </>
    )
}

export default AccountSetupPersonal

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    ContentBox: {
        flex: 0.7,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',


        paddingTop: 36,
        paddingHorizontal: 17
    }
})