import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export default function Weekly() {
  return (
    <View
        style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }}
      >
        <Text
        style={{
            color:'black',
            // fontSize:'20px',
            fontWeight:'600',
        }}
        >Weekly</Text>
      </View>
  )
}