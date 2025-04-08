import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import PayMoney from './PayMoney'

const RazorpayScreen = () => {
  return (
    <View>
      
      <Button title='Pay Money ee' onPress={()=>{PayMoney(50)}}></Button>
    </View>
  )
}

export default RazorpayScreen

const styles = StyleSheet.create({})