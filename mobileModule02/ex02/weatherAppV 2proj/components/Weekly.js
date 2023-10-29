import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SearchContext from './SearchContext';
import weathercode from '../weathercode.json';

const Weekly = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

    console.log("curr ==>" + searchText )
    console.log(selectedLocation)

    useEffect(() => {
        // Vérifiez si searchText contient des coordonnées valides
        if (selectedLocation) {
            // Effectuez une requête à l'API météo
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum&timezone=${selectedLocation.timezone}`)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data); // Stockez les données météorologiques dans l'état local
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météorologiques:", error);
                });
        }
    }, [searchText]);

    console.log("weather week =>",weatherData)

    return (
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
                {weatherData.daily.time.map((time, index) => (
                    <Text key={time}>
                        {time} {weatherData.daily.temperature_2m_min[index]}°C {weatherData.daily.temperature_2m_max[index]}°C {weathercode[weatherData.daily.weathercode[index]].day.description}
                    </Text>
                ))}
            </View>
            )}
        </View>
    );
};

export default Weekly;
