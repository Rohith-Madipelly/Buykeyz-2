import { Image, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import ProgressBar from "../../../../components/UI/ProgressBar/ProgressBar";
import ScreenComponentRender from "./ScreenComponentRender";
import CustomStatusBar from "../../../../components/UI/CustomStatusBar/CustomStatusBar";
import GlobalStyles from "../../../../components/UI/config/GlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SETUP_PROGRESS from "../SETUP_PROGRESS";

console.log("SETUP_PROGRESS",SETUP_PROGRESS)

const AccountSetupComponent = () => {

    const [progressData, setProgressData] = useState(0.1)

    const handleCurrentStep = (step) => {
        console.log("Current step:", step);
        setProgressData(step * 0.10)
    };


    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                {/* <CustomToolKitHeader componentName={"Subscriptions"} backgroundColor={GlobalStyles.AppBackground} /> */}


                {/* {progressData>8?<View>
                <Text>dcf</Text>
            </View>:""} */}
                {progressData <= 8 ? <View style={{ flex: 0.13, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 45, height: 41, marginBottom: 20 }}
                        // animation={"bounceIn"}
                        source={require("../../../../assets/buykeyz.png")}
                        contentFit="cover"
                        transition={1000}
                        alt=''
                    />
                    <ProgressBar progressData={progressData} />
                </View> : ""}
                <View style={{ flex: 0.88 }}>

                    <ScreenComponentRender stepUpConfig={SETUP_PROGRESS} currentStep={handleCurrentStep} />
                </View>
            </View>
        </View>
    )
}

export default AccountSetupComponent

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