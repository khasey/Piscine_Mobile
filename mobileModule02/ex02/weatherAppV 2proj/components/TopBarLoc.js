import { Text, StyleSheet, View, Dimensions, SafeAreaView, TextInput, Button } from 'react-native'
import React, { Component , useState, useContext, useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SearchContext from './SearchContext';
import * as Location from 'expo-location';

const TopBarLoc = ( ) => {
  const { searchText, setSearchText, setSelectedLocation } = useContext(SearchContext);
  const [ text , onChangeText] = useState()
  const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (text) {
            // Appel à l'API de géocodage pour obtenir des suggestions basées sur `text`
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10&language=en&format=json`)
                .then(response => response.json())
                .then(data => {
                    setSuggestions(data.results || []);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des suggestions:', error);
                });
        } else {
            setSuggestions([]);
        }
    }, [text]);

    console.log(suggestions)

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

  console.log(text)

    return (
      <SafeAreaView>
      <View style={styles.bar}>
          <AntDesign name="search1" size={24} color="white" 
            onPress={() => {
            setSearchText(text);
          }}
          />
       
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        >
          </TextInput>
        <Entypo name="location" size={24} color="white" onPress={handleLocationPress}/>
      </View>
      <View style={styles.suggestionsContainer}>
            {suggestions.map(suggestion => (
                <Text key={suggestion.id} onPress={() => {
                    setSearchText(suggestion.name);
                    setSelectedLocation(suggestion)
                    setSuggestions([]); // Cachez les suggestions une fois l'une d'elles sélectionnée
                }}>
                    {suggestion.name}, {suggestion.admin1}, {suggestion.country}
                </Text>
            ))}
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
  suggestionsContainer: {
    // Vous pouvez styliser cette partie comme vous le souhaitez
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: Dimensions.get('window').width,
  }
})
