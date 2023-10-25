import { Text, View, Dimensions } from 'react-native'
import React, { Component } from 'react'

export default class Today extends Component {
  render() {
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
        >Today</Text>
      </View>
    )
  }
}