import { View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const ProgressBar = ({ progressData }) => {
    console.log(progressData)
    return (
        <View>
            <Progress.Bar progress={progressData} width={300} borderColor={'#D9D9D9'} unfilledColor={'#D9D9D9'} borderWidth={0} height={4} />
        </View>
    )
}

export default ProgressBar 
 
