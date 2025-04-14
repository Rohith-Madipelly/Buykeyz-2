import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { Alert, Button, Image, Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ElectricitybillSchema } from "../../../../formikYupSchemas/AccountSetupSchema/ElectricitybillSchema";
import { verifyelectricitybill_API } from "../../../../network/ApiCalls";
import { PageHandler } from "../ScreenMaintainer/PageHandler";
import CustomTextInput from "../../../../components/UI/Inputs/CustomTextInput";
import CustomDropdown2 from "../../../../components/UI/Inputs/CustomDropdown2";
import CustomButton from "../../../../components/UI/Buttons/CustomButton";
import { useState } from "react";
import TextStyles from "../../../../components/UI/config/TextStyles";
import LoaderComponents from "../../../../components/UI/Loadings/LoaderComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const Electricitybill = () => {
    const navigation = useNavigation();
    const [APIResponses, setAPIResponses] = useState("")
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [display, setdisplay] = useState(true)
    const [fileReadyToUp, setfileReadyToUp] = useState(false)
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
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            // ElectricityBillFile: null 
            // billNumber: "101256826",
            billNumber: "",
            state: ""
        },

        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: ElectricitybillSchema,

        validate: values => {
            const errors = {};

            return errors;
        },

    });


    const submitHandler = async (values) => {
        try {
            console.log(values)

            setSpinnerbool(true)
            const res = await verifyelectricitybill_API(values, tokenn)
            if (res) {
                setTimeout(() => {
                    PageHandler(10, dispatch)
                    setAPIResponses("")
                }, 1000)


                setTimeout(() => {
                    setSpinnerbool(false)
                }, 50);


            }

        } catch (error) {
            console.log(error)
            console.log("error console", error.response.data.message)
            console.log("error console", error.response.data)
            // ToasterMessage("success", `Success`, `${error.response.data.message}`)

            if (error.response) {
                console.log("error.response.status00", error.response.status)
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                    if (error.response.data) {
                        console.log("error.response.data", error.response.data.kycStatus)
                        setTimeout(() => {
                            PageHandler(error.response.data.kycStatus, dispatch)
                            setAPIResponses("")
                        }, 1000)
                    }
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
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
                    console.log("Outofboxerror", error.response.data.message)

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

            setSpinnerbool(false)

            if (error) {

                // message = error.message;
                // seterrorFormAPI(message)
                // "Email or Password does not match !"
            }
        }
        finally {
            setSpinnerbool(false)
        }
    }
    const ProvideData = [
        { "name": "Andhra Pradesh(Southern)", "state": 1 },
        { "name": "Assam", "state": 2 },
        { "name": "Bihar(North)", "state": 3 },
        { "name": "Bihar(South)", "state": 4 },
        { "name": "Delhi(BSES)", "state": 5 },
        { "name": "Delhi(North)", "state": 6 },
        { "name": "Haryana(north)", "state": 7 },
        { "name": "Himachal Pradesh", "state": 8 },
        { "name": "Karnataka (Bescom-Non R-ADPRP)", "state": 9 },
        { "name": "Karnataka(Bescom)", "state": 10 },
        { "name": "Karnataka(Gescom)", "state": 11 },
        { "name": "Madhya Pradesh(West)", "state": 12 },
        { "name": "Maharashtra (Entire State)", "state": 13 },
        { "name": "Maharashtra (BEST)", "state": 14 },
        { "name": "Maharashtra (Reliance)", "state": 15 },
        { "name": "Rajasthan", "state": 16 },
        { "name": "Telangana", "state": 17 },
        { "name": "Uttar Pradesh", "state": 18 },
        { "name": "Uttarakhand", "state": 19 },
        { "name": "West Bengal", "state": 20 },
        { "name": "West Bengal (Kolkata & Howrah)", "state": 21 },
        { "name": "Chhattisgarh", "state": 22 },
        { "name": "Madhya Pradesh(East)", "state": 23 },
        { "name": "Sikkim", "state": 24 },
        { "name": "Punjab", "state": 25 },
        { "name": "Jharkhand", "state": 26 },
        { "name": "Gujrat(Uttar)", "state": 27 },
        { "name": "Gujrat(Dakshin)", "state": 28 },
        { "name": "Gujrat(Madhya)", "state": 29 },
        { "name": "Tamil Nadu", "state": 30 },
        { "name": "Madhya Pradesh(Belut)", "state": 31 },
        { "name": "Gujrat(Paschim)", "state": 32 },
        { "name": "Kerala", "state": 33 },
        { "name": "Goa", "state": 34 },
        { "name": "Haryana(Dakshin)", "state": 35 },
        { "name": "Karnataka(Hescom)", "state": 36 },
        { "name": "Karnataka(Cescmysore)", "state": 37 },
        { "name": "Karnataka(Mescom)", "state": 38 },
        { "name": "Delhi(Muncipal Council)", "state": 39 },
        { "name": "Odisha", "state": 40 },
        { "name": "Odisha(Central)", "state": 41 },
        { "name": "Andhra Pradesh(Eastern)", "state": 42 },
        { "name": "Chandigarh", "state": 44 },
        { "name": "Dadra & Nagar Haveli", "state": 45 },
        { "name": "Nagaland", "state": 46 },
        { "name": "Ajmer Vidyut Vitran Nigam Ltd. [Rajasthan]", "state": 47 },
        { "name": "Kota Electricity Distribution Limited [Rajasthan]", "state": 48 }
    ]

    const [stateName, setStateName] = useState("")
    function getStateName(stateId) {
        const state = ProvideData.find(item => item.state === stateId);
        return state ? state.name : null; // Return the name if found, otherwise null
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
                    showsHorizontalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>



                        <View style={{ flex: 0.7 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                    contentContainerStyle={{ flex: 1, }}
                                >
                                    <View style={{ marginHorizontal: 18 }}>
                                        {/* <Title TitleName="Upload electricity bill" style={{ marginVertical: 0, marginTop: 10 }}></Title> */}
                                        {/* <CustomSpan TextLine={'Enter your Aadhar Card to register your account'}></CustomSpan> */}
                                        <Text style={[TextStyles.TEXTSTYLE_HEADING_H1]}>Upload electricity bill</Text>

                                        <View style={{ alignItems: 'center', marginTop: 10 }}>



                                            <CustomTextInput
                                                boxWidth={'100%'}
                                                placeholder={'Consumer Number'}
                                                label={'Consumer Number'}
                                                name='Consumer Number'
                                                keyboardType={'numeric'}
                                                value={values.billNumber}
                                                onChangeText={(e) => { const onlyNumbers = e.replace(/[^0-9]/g, ''); handleChange("accountNumber")(onlyNumbers); seterrorFormAPI(); }}
                                                onBlur={handleBlur("billNumber")}
                                                validate={handleBlur("billNumber")}
                                                outlined
                                                bgColor={'#F7F7F7'}
                                                borderColor={`${(errors.billNumber && touched.billNumber) || (errorFormAPI && errorFormAPI.billNumberForm) ? "red" : "#48484A"}`}
                                                errorMessage={`${(errors.billNumber && touched.billNumber) ? `${errors.billNumber}` : (errorFormAPI && errorFormAPI.billNumberForm) ? `${errorFormAPI.billNumberForm}` : ``}`}
                                            />

                                            <CustomDropdown2
                                                boxWidth={'100%'}
                                                label={'Provide'}
                                                placeholder={'Select the Provide'}
                                                name='state'
                                                // labelStyle={{ color: 'white' }}
                                                // InputStyle={{ color: 'white' }}
                                                // DropDownArrowColor={'white'}
                                                bgColor={'transparent'}
                                                value={stateName}
                                                DropDownData={ProvideData}
                                                onChange={async (e) => {
                                                    setTimeout(() => {
                                                        handleChange("state")(`${e.state}`);
                                                    }, 200);
                                                    setStateName(e.name)
                                                    seterrorFormAPI();
                                                }}
                                                containerStyle={{ elevation: 10 }}
                                                onBlur={handleBlur("state")}
                                                validate={handleBlur("state")}
                                                outlined
                                                borderColor={`${(errors.state && touched.state) || (errorFormAPI && errorFormAPI.stateForm) ? "red" : "#48484A"}`}
                                                errorMessage={`${(errors.state && touched.state) ? `${errors.state}` : (errorFormAPI && errorFormAPI.stateForm) ? `${errorFormAPI.stateForm}` : ``}`}
                                            />

                                            <CustomButton
                                                boxWidth={'100%'}
                                                onPress={handleSubmit}
                                                style={{ marginTop: 50 }}>Next</CustomButton>
                                        </View>
                                        {/* <CustomSpan TextLine={APIResponses} style={{ textAlign: 'center', marginTop: 20, fontWeight: 300, fontSize: 15, color: '#0E3A2D' }}></CustomSpan> */}
                                        <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 300, fontSize: 15, color: '#0E3A2D' }}>{APIResponses}</Text>


                                        {/* <Pressable onPress={() => { PageHandler(2, dispatch) }}>
                                            <Text>dmhvdd</Text>
                                        </Pressable> */}
                                    </View>
                                </KeyboardAwareScrollView>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </ScrollView>
                {/* <StatusBar backgroundColor="#0000ff" style="light" /> */}
            </View>

        </>
    )
}

export default Electricitybill

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