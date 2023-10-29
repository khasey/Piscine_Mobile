import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SearchContext from './SearchContext';
import { ScrollView } from 'react-native';

const Today = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

    console.log("curr ==>" + searchText )
    console.log(selectedLocation)

    useEffect(() => {
        // Vérifiez si searchText contient des coordonnées valides
        if (selectedLocation) {
            // Effectuez une requête à l'API météo
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&hourly=temperature_2m,windspeed_10m`)
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
          }}
        >
            <Text>{searchText}</Text>
            {selectedLocation && (
              <>
                <Text>{selectedLocation.admin1}</Text>
                <Text>{selectedLocation.country}</Text>
              </>
            )}
            
            {weatherData && (
                <View>
                {weatherData.hourly.time.map((time, index) => (
                    <Text key={time}>
                        {time.split('T')[1].split(':')[0] + ':' + time.split('T')[1].split(':')[1]} {weatherData.hourly.temperature_2m[index]}°C {weatherData.hourly.windspeed_10m[index]}km/h
                    </Text>
                ))}
            </View>
            )}
        </View>
        </ScrollView>
    );
};

export default Today;
