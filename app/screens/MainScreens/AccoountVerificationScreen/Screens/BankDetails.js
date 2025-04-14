import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Button, Keyboard,  Platform, Pressable, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { BankDetailsSchema } from "../../../../formikYupSchemas/AccountSetupSchema/BankDetailsSchema";
import { useToast } from "react-native-toast-notifications";
import { Bank_Details_on_IFSC, verifybank_API } from "../../../../network/ApiCalls";
import { PageHandler } from "../ScreenMaintainer/PageHandler";
import CustomTextInput from "../../../../components/UI/Inputs/CustomTextInput";
import CustomButton from "../../../../components/UI/Buttons/CustomButton";
import TextStyles from "../../../../components/UI/config/TextStyles";
import { Text } from "react-native";
import LoaderComponents from "../../../../components/UI/Loadings/LoaderComponents";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";






const BankDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [APIResponses, setAPIResponses] = useState("")
    const [errorFormAPI, seterrorFormAPI] = useState("")
    const [IFSC_CODE_REQ, set_IFSC_CODE_REQ] = useState("")
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
        setFieldValue,
    } = useFormik({
        initialValues: {
            // beneficiaryAccountName:"", ifsc: "ICIC0004444", beneficiarybankName: "", accountNumber: "", beneficiaryAccountType: "", beneficiaryBranch: "",
            // ifsc: "INDB0000226", beneficiarybankName: "", accountNumber: "159951072005", beneficiaryBranch: "",
            ifsc: "", beneficiarybankName: "", accountNumber: "", beneficiaryBranch: "",
        },
        onSubmit: values => {
            { submitHandler(values) }
        },

        validationSchema: BankDetailsSchema,

        validate: values => {
            const errors = {};
            return errors;
        },

    });



    // const submitHandler = (values) => {
    //     console.log("VerificationCode>> to ", values)

    //     setAPIResponses("Executive details submitted ")
    //     setTimeout(() => {
    //         PageHandler(12, dispatch)
    //         setTimeout(() => {

    //             navigation.navigate("SuccessfullyAccount")
    //         }, 2000)

    //         setAPIResponses("")
    //     }, 1000)

    // }

    const toast = useToast()

    const submitHandler = async (values) => {
        try {
            console.log("cs", values)

            setSpinnerbool(true)
            const res = await verifybank_API(values, tokenn)
            if (res) {
                console.log(res.data)
                toast.show(res.data.message)
                PageHandler(7, dispatch)
                // const Message = res.data.message
                // console.log(Message)
                // // ToasterMessage("success", `Success`, Message)

                // // PageHandler(9, dispatch)
                // setTimeout(() => {
                //     // navigation.navigate("SuccessfullyAccount")
                // }, 2000)
            }

        } catch (error) {
            console.log(error.response.data.message)
            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                }
                else if (error.response.status === 404) {
                    console.log("error 404", error.response)
                }

                else if (error.response.status === 429) {
                    Alert.alert(error.response.data.message, `${error.response.status}`)
                    console.log("error 429", error.response.data.message)
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    Alert.alert(`Api error with ${error.response.status}`)
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
        }
        finally {
            setSpinnerbool(false)
        }
    }
















    // For Bank Name and Branch from IFSC Code 
    useEffect(() => {
        const GetBankDetails = async () => {
            try {
                console.log("sdmn", IFSC_CODE_REQ)
                const res = await Bank_Details_on_IFSC(IFSC_CODE_REQ)
                if (res) {
                    // console.log("wdw", res.data)
                    setFieldValue('beneficiaryBranch', res.data.BRANCH);
                    setFieldValue('beneficiarybankName', res.data.BANK);
                }
            } catch (error) {
                console.log("Error in IFSC_CODE_REQ", error)
            }
        }

        if (IFSC_CODE_REQ.length >= 11) {
            GetBankDetails()
        }

    }, [IFSC_CODE_REQ])

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
                                                           contentContainerStyle={{ flex: 1, }}
                                                       >
                            <View style={{ marginHorizontal: 18 }}>
                                {/* <Title TitleName="Bank details" style={{ marginVertical: 1, marginTop: 10 }}></Title> */}

                                <Text style={[TextStyles.TEXTSTYLE_HEADING_H1]}>Bank details</Text>

                                <View style={{ alignItems: 'center', marginTop: 10 }}>







                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter account number'}
                                        label={'Account number'}
                                        name='accountNumber'
                                        value={values.accountNumber}
                                        keyboardType={'numeric'}
                                        onChangeText={(e) => { const onlyNumbers = e.replace(/[^0-9]/g, ''); handleChange("accountNumber")(onlyNumbers); seterrorFormAPI(); }}
                                        onBlur={handleBlur("accountNumber")}
                                        validate={handleBlur("accountNumber")}
                                        outlined
                                        borderColor={`${(errors.accountNumber && touched.accountNumber) || (errorFormAPI && errorFormAPI.accountNumberForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.accountNumber && touched.accountNumber) ? `${errors.accountNumber}` : (errorFormAPI && errorFormAPI.accountNumberForm) ? `${errorFormAPI.accountNumberForm}` : ``}`}
                                    />


                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter IFSC CODE'}
                                        label={'IFSC CODE'}
                                        name='ifsc'
                                        value={values.ifsc}
                                        onChangeText={(e) => { const sanitizedText = e.toUpperCase().replace(/[^A-Z0-9]/g, ''); const eToLowerCaseText = sanitizedText.toUpperCase(); handleChange("ifsc")(eToLowerCaseText); set_IFSC_CODE_REQ(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("ifsc")}
                                        validate={handleBlur("ifsc")}
                                        outlined
                                        borderColor={`${(errors.ifsc && touched.ifsc) || (errorFormAPI && errorFormAPI.ifscForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.ifsc && touched.ifsc) ? `${errors.ifsc}` : (errorFormAPI && errorFormAPI.ifscForm) ? `${errorFormAPI.ifscForm}` : ``}`}
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter bank name'}
                                        label={'Bank name'}
                                        name='BankName'
                                        value={values.beneficiarybankName}
                                        onChangeText={(e) => { handleChange("beneficiarybankName")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("beneficiarybankName")}
                                        validate={handleBlur("beneficiarybankName")}
                                        outlined
                                        borderColor={`${(errors.beneficiarybankName && touched.beneficiarybankName) || (errorFormAPI && errorFormAPI.beneficiarybankNameForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.beneficiarybankName && touched.beneficiarybankName) ? `${errors.beneficiarybankName}` : (errorFormAPI && errorFormAPI.beneficiarybankNameForm) ? `${errorFormAPI.beneficiarybankNameForm}` : ``}`}
                                    />

                                    <CustomTextInput
                                        boxWidth={'95%'}
                                        placeholder={'Enter branch'}
                                        label={'Branch'}
                                        name='branch'
                                        value={values.beneficiaryBranch}
                                        onChangeText={(e) => { handleChange("beneficiaryBranch")(e); seterrorFormAPI(); }}
                                        onBlur={handleBlur("beneficiaryBranch")}
                                        validate={handleBlur("beneficiaryBranch")}
                                        outlined
                                        borderColor={`${(errors.beneficiaryBranch && touched.beneficiaryBranch) || (errorFormAPI && errorFormAPI.beneficiaryBranchForm) ? "red" : "#48484A"}`}
                                        errorMessage={`${(errors.beneficiaryBranch && touched.beneficiaryBranch) ? `${errors.beneficiaryBranch}` : (errorFormAPI && errorFormAPI.beneficiaryBranchForm) ? `${errorFormAPI.beneficiaryBranchForm}` : ``}`}
                                    />

                                    <CustomButton
                                        boxWidth={'95%'}
                                        onPress={() => { handleSubmit() }}
                                        style={{ marginTop: 50 }}>Next</CustomButton>



                                    {/* <Pressable style={{}} onPress={()=>{           PageHandler(7, dispatch)}}>
    <Text>zhdvcs</Text>
</Pressable> */}


                                </View>
                                {/* <CustomSpan TextLine={APIResponses} style={{ textAlign: 'center', marginTop: 20, fontWeight: 300, fontSize: 15, color: '#0E3A2D' }}></CustomSpan> */}
                                <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 300, fontSize: 15, color: '#0E3A2D' }}>{APIResponses}</Text>

                            </View>
                        </KeyboardAwareScrollView>
                    </TouchableWithoutFeedback>

                </ScrollView>
            </View>

        </>
    )
}

export default BankDetails

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