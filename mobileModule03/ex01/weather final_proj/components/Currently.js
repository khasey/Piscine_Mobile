import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchContext from './SearchContext';
import { SafeAreaView } from 'react-native';

const Currently = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    console.log("curen searchedtext ==>" + searchText )

    

    useEffect(() => {
        if (selectedLocation || searchText) {      
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation?.latitude || searchText?.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText?.coords?.longitude}&hourly=temperature_2m,windspeed_10m`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data); // Stockez les données météorologiques dans l'état local
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météorologiques:", error);
                });
        }
    }, [selectedLocation, searchText]);

    console.log("currently===>", searchText)
    console.log("weat data curr===>", weatherData);

    return (
        <View
          style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            // backgroundColor:'black',
            flex:1,
            
          }}
        >
            <Text style={styles.text}>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
              <>
                <Text style={styles.text}>{selectedLocation.admin1 || selectedLocation?.region}</Text>
                <Text style={styles.text}>{selectedLocation.country}</Text>
              </>
            )}
            
            {weatherData && selectedLocation && !selectedLocation.notFound && (
                <>
                    <Text style={styles.text}>{weatherData.hourly?.temperature_2m[0]}°C</Text>
                    <Text style={styles.text}>{weatherData.hourly?.windspeed_10m[0]}km/h</Text>
                </>
            )}
            { selectedLocation && selectedLocation.notFound  && (
                <Text style={{color: 'red',}}>Could not find any result for the supplied adress or coordinates</Text>
            )}
            { searchText && searchText.notFound  && (
                <Text style={{color: 'red',}}>The service connection is lost, please check your internet connection or try again later</Text>
            )}
        </View>
    );
};

export default Currently;


const styles = StyleSheet.create({
    text:{
        color:'white',
    }
})
