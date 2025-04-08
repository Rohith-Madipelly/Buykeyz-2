import { Alert, Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CustomButton from '../../../../components/UI/Buttons/CustomButton'
import { CHANGE_OLD_PASSWORD_API, UpdateProfilePic, USER_PROFILE_API, UserLoginApi } from '../../../../network/ApiCalls'
import AsyncStorage_Calls from '../../../../utils/AsyncStorage_Calls'
import { setToken } from '../../../../redux/actions/LoginAction'
import { CustomAlerts_OK } from '../../../../utils/CustomReuseAlerts'
import HandleCommonErrors from '../../../../utils/HandleCommonErrors'
import Metrics from '../../../../utils/resposivesUtils/Metrics'
import LoaderComponents from '../../../../components/UI/Loadings/LoaderComponents'
import CustomToolKitHeader from '../../../../components/UI/CustomToolKitHeader'
import EditIconPen from '../../../../assets/svg/EditIconPen'
import LoadingImage from '../../../../components/UI/ImageConatiners/LoadingImage'
import ImageSelectorBottomSheet from '../../../../components/UI/CustomBottomSheets/ImageSelectorBottomSheet'
import { RegisterPageYupSchema } from '../../../../formikYupSchemas/Auth/RegisterPageYupSchema'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const LoginPage = () => {

  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState()
  const [errorFormAPI, seterrorFormAPI] = useState("")
  const [spinnerbool, setSpinnerbool] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const toast = useToast()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const bottomSheetRefCamera = useRef()
  const onRefresh = () => {
    ApiCaller()
    // setTimeout(() => {
    //   setRefreshing(false)
    // }, 1000)
  }
  const insets = useSafeAreaInsets();
  console.log("insets", insets)
  let tokenn = useSelector((state) => state.login.token);


  const [personalDetailsAPI, setPersonalDetailsAPI] = useState("")
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
      fullName: "",
      email: "",
      phoneNumber: "",
      iAgree: "true",
    },

    onSubmit: values => {
      {
        console.log("Output from formik", values)
        submitHandler(values)
      }
    },

    validationSchema: RegisterPageYupSchema,
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
    console.log("profileImage <<<<<<", profileImage)
    try {
      const res = await CHANGE_OLD_PASSWORD_API(values, tokenn);
      if (res.data) {

        console.log("CHANGE_OLD_PASSWORD_API", res.data)
        ApiCaller()
      }
    } catch (error) {
      console.log("error console", error.response.status)
      if (error.response) {
        if (error.response.status === 400) {
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 401) {
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 404) {
          seterrorFormAPI({ emailForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 422) {
          seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
        }
        else if (error.response.status === 301) {
          navigation.navigate('VerificationCode', { email: values.email })
        }
      }
      else {
        HandleCommonErrors(error)
      }

      setSpinnerbool(false)
    }
    finally {
      setSpinnerbool(false)
    }
  }







  const ApiCaller = async () => {
    setPersonalDetailsAPI("")
    try {
      const res = await USER_PROFILE_API(tokenn)
      if (res) {
        console.log("dcvd", res.data.profileDetails)
        setPersonalDetailsAPI(res.data.profileDetails)
      }

    } catch (error) {
      console.log("error console", error.response.status)
      if (error.response.status === 400) {
        seterrorFormAPI({ passwordForm: `${error.response.data.message}` })
      }
      else {
        HandleCommonErrors(error)
      }
      setSpinnerbool(false)
    }
    finally {

      setTimeout(() => {
        setSpinnerbool(false)
      }, 50);

      setTimeout(() => {
        setRefreshing(false);
      }, 50)
    }
  }


  const uploadPic = async (values) => {
    setSpinnerbool(true)
    try {
      const res = await UpdateProfilePic(values, tokenn)
      if (res) {
        console.log("sdjbcksjf", res.data.message)
        ApiCaller()
      }
    } catch (error) {
      console.log("efv", error.response)
    } finally {
      // setSpinnerbool(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      ApiCaller()
    }, [])
  )

  useEffect(() => {

    if (personalDetailsAPI) {
      const timer = setTimeout(() => {

        setValues({
          fullName: `${personalDetailsAPI.fullName}`,
          phoneNumber: `${personalDetailsAPI?.phoneNumber || ""}`,
          email: `${personalDetailsAPI.email}`,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [personalDetailsAPI]);





  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
      <LoaderComponents
        visible={spinnerbool}
      />
      <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
        <CustomToolKitHeader componentName={"Profile"} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        >
          <KeyboardAwareScrollView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            contentContainerStyle={{ flex: 1, }}
          >
            <View style={{ flex: 1, }}>
              <View style={{
                // flex: 0.2,
                justifyContent: 'center', alignItems: 'center',
              }}>

                <View style={{ marginVertical: 10 }}>


                  <LoadingImage
                    source={personalDetailsAPI.passPortPicture ? { uri: personalDetailsAPI?.passPortPicture } : { uri: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" }}
                    style={{
                      width: Metrics.rfv(120), // Take up the full width of the parent
                      height: Metrics.rfv(120),
                      borderRadius: Metrics.rfv(120) / 2,
                      resizeMode: 'contain', // Maintain aspect ratio without stretching
                      // resizeMode: 'cover', // Maintain aspect ratio without stretching
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      bottomSheetRefCamera.current.show()
                    }}
                    style={{ position: 'absolute', bottom: -10, right: -10 }}>
                    <EditIconPen />
                  </TouchableOpacity>
                </View>
                {/* <Image
                  style={{ width: Metrics.rfv(200), height: Metrics.rfv(80) }}
                  animation={"bounceIn"}
                  source={require("../../../../assets/images/appLogo/buykeyzlogo.png")}
                  contentFit="cover"
                  transition={1000}
                  alt=''
                /> */}

                <ImageSelectorBottomSheet
                  bottomSheetRefCamera={bottomSheetRefCamera}
                  multipleSelection={false}
                  onSelectFile={(e) => {
                    console.log("Image output", e.uri)
                    // setUserProfilePic(e);
                    if (e != undefined) {
                      // handleChange("photo")(e);
                      // handleChange("isPhotoRequired")("true");
                      // setProfileImage(e.uri)
                      uploadPic(e.uri)
                      // setUserProfilePic(e);
                      // toast.hideAll()
                      // toast.show("Click save to upload the profile pic")

                      // setTimeout(() => {
                      //   submitHandler(values,)
                      //   // handleSubmit()
                      // }, 1000);
                      // const uniquePhotos = e
                      //     .filter((photo) => !selectedIssuesPhotos.some((p) => p.uri === photo.uri))
                      // // .slice(0, onlyPhotoLimit - selectedIssuesPhotos.length);

                      // console.log("Image output", e)
                    }
                  }}
                />
              </View>
              <View style={{ flex: 0.7, justifyContent: 'flex-start', marginHorizontal: LEFT_AND_RIGHT_PADDING }}>
                <CustomTextInput
                  boxWidth={'100%'}
                  label={'Full name'}
                  placeholder={'Enter full name'}
                  bgColor={'transparent'}
                  asterisksymbol={true}
                  value={values.fullName}
                  onChangeText={(e) => {
                    handleChange("fullName")(e);
                    // handleChange("email")(e)
                    // const eWithoutSpaces = e.replace(/\s+/g, '');
                    // const eToLowerCaseText = eWithoutSpaces.toLowerCase(); handleChange("fullName")(eToLowerCaseText);
                    seterrorFormAPI();
                  }}
                  onBlur={handleBlur("fullName")}
                  // validate={handleBlur("fullName")}
                  outlined
                  borderColor={`${(errors.fullName && touched.fullName) || (errorFormAPI && errorFormAPI.fullNameForm) ? "red" : GlobalStyles.InputBorderColor}`}
                  errorMessage={`${(errors.fullName && touched.fullName) ? `${errors.fullName}` : (errorFormAPI && errorFormAPI.fullNameForm) ? `${errorFormAPI.fullNameForm}` : ``}`}
                />

                <CustomTextInput
                  boxWidth={'100%'}
                  label={'Email Phone Number'}
                  placeholder={'Enter phoneNumber'}
                  bgColor={'transparent'}
                  asterisksymbol={true}
                  value={values.phoneNumber}
                  labelStyle={{ color: '#47556980' }}
                  InputStyle={{ color: '#47556980' }}
                  editable={false}
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
                  borderColor={`${(errors.phoneNumber && touched.phoneNumber) || (errorFormAPI && errorFormAPI.phoneNumberForm) ? "red" : "#47556980"}`}
                  errorMessage={`${(errors.phoneNumber && touched.phoneNumber) ? `${errors.phoneNumber}` : (errorFormAPI && errorFormAPI.phoneNumberForm) ? `${errorFormAPI.phoneNumberForm}` : ``}`}
                />

                <CustomTextInput
                  boxWidth={'100%'}
                  label={'Email address'}
                  placeholder={'Enter email address'}
                  bgColor={'transparent'}
                  asterisksymbol={true}
                  labelStyle={{ color: '#47556980' }}
                  InputStyle={{ color: '#47556980' }}
                  value={values.email}
                  onChangeText={(e) => {
                    // handleChange("email")(e)
                    const eWithoutSpaces = e.replace(/\s+/g, '');
                    const eToLowerCaseText = eWithoutSpaces.toLowerCase(); handleChange("email")(eToLowerCaseText);
                    seterrorFormAPI();
                  }}
                  editable={false}
                  onBlur={handleBlur("email")}
                  // validate={handleBlur("email")}
                  keyboardType={'email-address'}
                  outlined
                  // leftText={"You can’t edit or change your registered mail id."}

                  borderColor={`${(errors.email && touched.email) || (errorFormAPI && errorFormAPI.emailForm) ? "red" : "#47556980"}`}
                  errorMessage={`${(errors.email && touched.email) ? `${errors.email}` : (errorFormAPI && errorFormAPI.emailForm) ? `${errorFormAPI.emailForm}` : ``}`}
                />
                <Text style={{ marginTop: -15, marginBottom: 10, color: '#47556980', fontSize: 9, }}>"You can’t edit or change your registered mail id."</Text>


                <CustomButton
                  // boxWidth={'95%'}
                  bgColor={`${isValid ? PRIMARY_COLOR : PRIMARY_LIGHT_COLOR}`}
                  onPress={() => { handleSubmit() }}
                  style={{ marginTop: 50 }}>
                  Update
                </CustomButton>
              </View>

            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({})