import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import { PRIVACY_POLICY_API, TERMS_AND_CONDITIONS_API } from '../../network/ApiCalls';
import HandleCommonErrors from '../../utils/HandleCommonErrors';
import Metrics from '../../utils/resposivesUtils/Metrics';
import CustomStatusBar from '../../components/UI/CustomStatusBar/CustomStatusBar';
import GlobalStyles from '../../components/UI/config/GlobalStyles';
import TextStyles from '../../components/UI/config/TextStyles';
import { LEFT_AND_RIGHT_PADDING } from '../../components/UI/config/AppContants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomToolKitHeader from '../../components/UI/CustomToolKitHeader';

const PrivacyPolicy = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  let tokenn = useSelector((state) => state.login.token);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ApiCaller()
  }, []);

  const [data, setData] = useState()
  const ApiCaller = async () => {
    try {
      const res = await TERMS_AND_CONDITIONS_API(tokenn)
      setData("")
      if (res) {
        console.log("dbsjb", res.data)
        // setData(res.data.privacyPolicy)
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


  const insets = useSafeAreaInsets();
  useEffect(() => {
    // ApiCaller()
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
      <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
      <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
      <CustomToolKitHeader componentName={"Privacy Policy"} backgroundColor={'white'}/>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <WebView
              // http://localhost:3000/
              style={styles.container}
              originWhitelist={['*']}
              // source={{ html: `${data}` }}
              //  source={{ uri: `${WEBSITE_BASE_URL}auth/termsandconditions` }}
              source={{ uri: `https://buykeyz.com/Privacypolicy` }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    paddingHorizontal: 18,
    paddingBottom: 20,
    width: Metrics.width,
    fontSize: 30,
    // backgroundColor:'red',
    marginBottom: 30
  },
})


