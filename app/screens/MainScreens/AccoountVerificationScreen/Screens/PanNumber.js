import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Image, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PanNumberSchema } from "../../../../formikYupSchemas/AccountSetupSchema/PanNumberSchema";
import { PanVerificationAPI } from "../../../../network/ApiCalls";
import CustomButton from "../../../../components/UI/Buttons/CustomButton";
import CustomTextInput from "../../../../components/UI/Inputs/CustomTextInput";
import { useState } from "react";
import { useFormik } from "formik";
import TextStyles from "../../../../components/UI/config/TextStyles";
import { PageHandler } from "../ScreenMaintainer/PageHandler";
import LoaderComponents from "../../../../components/UI/Loadings/LoaderComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";






const PanNumber = () => {
    const navigation = useNavigation();

    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [APIResponses, setAPIResponses] = useState("")
    const dispatch = useDispatch();
    const [spinnerbool, setSpinnerbool] = useState(false)
    let tokenn = useSelector((state) => state.login.token);


    const { handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        isValid,
        setValues,
        resetForm,
    } = useFormik({
        // initialValues: { name: "ROHITH", panLastName: "MADIPELLY", panPhoneNumber: "9951072005", panDoB: "13022001", panPinCode: "506002", panNumber: "GPXPM2823D" },
        initialValues: {
            // name: "VISHWESH KUSUMA", panNumber: "KPCPK2881G"
            name: "", panNumber: ""
        },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: PanNumberSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });


    const submitHandler = async (values) => {
        console.log("submitHandler >>", values)
        try {
            setSpinnerbool(true)
            const res = await PanVerificationAPI(values, tokenn)
            if (res) {

                console.log("PanNumber>> to ", res.data)
                setAPIResponses("PAN card number is submitted")
                setTimeout(() => {
                    PageHandler(5, dispatch)
                    setAPIResponses("")
                }, 1000)


                setTimeout(() => {
                    setSpinnerbool(false)
                }, 50);


            }

        } catch (error) {
            console.log(error)
            console.log("error console  >", error.response.data.message)
            console.log("error console", error.response.data)
            // ToasterMessage("success", `Success`, `${error.response.data.message}`)

            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    Alert.alert(error.response.data.message, "Please give the correct aadhar Linked Pan ")
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
                    // console.log("error in request ",error.request.status)
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

    // const submitHandler = (values) => {
    //     console.log("PanNumber>> to ", values)
    //     // navigation.navigate("AadharCard")
    //     setAPIResponses("PAN card number is submitted")
    //     setTimeout(() => {
    //         PageHandler(4, dispatch)
    //         setAPIResponses("")
    //     }, 1000)
    // }

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
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.7 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                                                        contentContainerStyle={{ flex:1, }}
                                                                    >
                                    <View style={{ marginHorizontal: 18 }}>
                                        {/* <Title TitleName="PAN Number" style={{ marginVertical: 0, marginTop: 10 }}></Title> */}
                                        <Text style={[TextStyles.TEXTSTYLE_HEADING_H1]}>PAN Number</Text>
                                        <Text style={[TextStyles.TEXTSTYLE_A13, { marginVertical: 10 }]}>Enter your PAN Number to register your account</Text>

                                        {/* <CustomSpan TextLine={'Enter your PAN Number to register your account'}></CustomSpan> */}

                                        <View style={{ alignItems: 'center', marginTop: 0 }}>



                                            <CustomTextInput
                                                boxWidth={'100%'}
                                                placeholder={'Full Name'}
                                                name='PanNumber'
                                                value={values.name}
                                                onChangeText={(e) => {
                                                    console.log(e)
                                                    // You can optionally modify the input here, e.g., convert to uppercase.
                                                    if (e !== '') {
                                                        const eToUpperCaseText = e.toUpperCase();
                                                        handleChange("name")(e);
                                                        seterrorFormAPI();  // If you want to reset the error when the text changes
                                                    } else {
                                                        handleChange("name")(""); // For empty input, just set the value as is
                                                    }
                                                }}

                                                onBlur={handleBlur("name")}
                                                validate={handleBlur("name")}
                                                outlined
                                                borderColor={`${(errors.name && touched.name) || (errorFormAPI && errorFormAPI.nameForm) ? "red" : "#48484A"}`}
                                                errorMessage={`${(errors.name && touched.name) ? `${errors.name}` : (errorFormAPI && errorFormAPI.nameForm) ? `${errorFormAPI.nameForm}` : ``}`}
                                            />




                                            <CustomTextInput
                                                boxWidth={'100%'}
                                                placeholder={'PAN number'}
                                                name='PanNumber'
                                                value={values.panNumber}
                                                onChangeText={(e) => { const eToLowerCaseText = e.toUpperCase(); handleChange("panNumber")(eToLowerCaseText); seterrorFormAPI(); }}
                                                onBlur={handleBlur("panNumber")}
                                                validate={handleBlur("PanNumber")}
                                                outlined
                                                borderColor={`${(errors.panNumber && touched.panNumber) || (errorFormAPI && errorFormAPI.panNumberForm) ? "red" : "#48484A"}`}
                                                errorMessage={`${(errors.panNumber && touched.panNumber) ? `${errors.panNumber}` : (errorFormAPI && errorFormAPI.panNumberForm) ? `${errorFormAPI.panNumberForm}` : ``}`}
                                            />
                                            <CustomButton
                                                boxWidth={'100%'}
                                                onPress={handleSubmit}
                                                style={{ marginTop: 50 }}>Next</CustomButton>
                                        </View>

                                        {/* <CustomSpan TextLine={APIResponses} 
                                        ></CustomSpan> */}
                                        <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 300, fontSize: 15, color: '#0E3A2D' }}>{APIResponses}</Text>


                                    </View>
                                </KeyboardAwareScrollView>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </ScrollView>

            </View>
        </>
    )
}

export default PanNumber

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