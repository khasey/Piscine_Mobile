import { Text, View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import SearchContext from './SearchContext';

export default class Today extends Component {
  static contextType = SearchContext;
  render() {
    const { searchText } = this.context;
    return (
        <View
        style={{
          flex: 1,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
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
        <Text
        style={{
            color:'black',
            // fontSize:'20px',
            fontWeight:'600',
        }}
        >{searchText}</Text>
      </View>
    )
  }
}