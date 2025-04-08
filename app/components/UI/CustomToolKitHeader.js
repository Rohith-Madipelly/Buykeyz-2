import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function CustomToolKitHeader({ componentName, backgroundColor }) {
  const navigation = useNavigation()

  return (
    <View style={{ width: '100%', height: 58, flexDirection: 'row', paddingHorizontal: 17, alignItems: "center", backgroundColor: backgroundColor|| "#F7F7F7" }}>

      <TouchableOpacity onPress={() => { navigation.goBack() }} style={{}}>
        <Ionicons name="arrow-back" size={25} color="#07005B" />
      </TouchableOpacity>

      <View style={{ marginLeft: 20, justifyContent: 'center', alignContent: 'center' }}>
        <Text style={[{ color: '#07005B', fontSize: 20, fontWeight: 500, fontFamily: 'Poppins-Medium' }]}>{componentName}</Text>
      </View>
    </View>
  )
}

export default CustomToolKitHeader
