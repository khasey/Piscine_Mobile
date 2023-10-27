import { Text, StyleSheet, View, Dimensions, SafeAreaView, TextInput, Button } from 'react-native'
import React, { Component , useState, useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SearchContext from './SearchContext';
import * as Location from 'expo-location';

const TopBarLoc = ( ) => {
  const { searchText, setSearchText } = useContext(SearchContext);
  const [ text , onChangeText] = useState()

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setSearchText("Geolocation is not available, please enable it in your App settings")
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let latitude = location.coords.latitude
    let longitude = location.coords.longitude
    setSearchText([latitude,'   ' ,longitude])
    console.log(location); // Vous pouvez traiter les données de localisation comme vous le souhaitez
  };

    return (
      <SafeAreaView>
      <View style={styles.bar}>
          <AntDesign name="search1" size={24} color="white" onPress={() => {
            setSearchText(text);
          }}/>
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Entypo name="location" size={24} color="white" onPress={handleLocationPress}/>
      </View>
      </SafeAreaView>
    )
}

export default TopBarLoc;

const styles = StyleSheet.create({
    bar:{
      width: Dimensions.get('window').width,
      height: 60,
      backgroundColor:'black',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
    },
    input:{
      width: '70%',
      borderWidth:1,
      height:'80%',
      margin: 15,
      padding: 10,
      borderRadius: 10,
      backgroundColor:'#f5f5f5',
      borderColor:'grey',
    },
})