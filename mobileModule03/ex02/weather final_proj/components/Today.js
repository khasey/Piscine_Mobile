import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchContext from './SearchContext';
import { ScrollView } from 'react-native';

const Today = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (selectedLocation || searchText) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation?.latitude || searchText.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText.coords?.longitude}&hourly=temperature_2m,windspeed_10m`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data); // Stockez les données météorologiques dans l'état local
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météorologiques:", error);
                });
        }
    }, [searchText]);

    return (
        <ScrollView>
        <View
          style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
            <Text style={styles.text}>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
              <>
                <Text style={styles.text}>{selectedLocation.admin1 || selectedLocation?.region}</Text>
                <Text style={styles.text}>{selectedLocation.country}</Text>
              </>
            )}
            
            {weatherData && selectedLocation && !selectedLocation.notFound &&(
                <View >
                {weatherData.hourly?.time.map((time, index) => (
                    <Text key={time} style={styles.text}>
                        {time.split('T')[1]?.split(':')[0] + ':' + time.split('T')[1].split(':')[1]} {weatherData.hourly.temperature_2m[index]}°C {weatherData.hourly.windspeed_10m[index]}km/h
                    </Text>
                ))}
            </View>
            )}
            { selectedLocation && selectedLocation.notFound  && (
                <Text style={{color: 'red',}}>Could not find any result for the supplied adress or coordinates</Text>
            )}
            { searchText && searchText.notFound  && (
                <Text style={{color: 'red',}}>The service connection is lost, please check your internet connection or try again later</Text>
            )}
        </View>
        </ScrollView>
    );
};

export default Today;

const styles = StyleSheet.create({
    text:{
        color:'white',
    }
})