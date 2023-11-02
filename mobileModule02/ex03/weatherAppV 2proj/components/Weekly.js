import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SearchContext from './SearchContext';
import weathercode from '../weathercode.json';

const Weekly = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (selectedLocation || searchText) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation?.latitude || searchText.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText.coords?.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum&timezone=${selectedLocation?.timezone || "GMT"}`)
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
        <View
          style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
            <Text>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
              <>
                <Text>{selectedLocation.admin1 || selectedLocation?.region}</Text>
                <Text>{selectedLocation.country}</Text>
              </>
            )}
            
            {weatherData && selectedLocation &&  !selectedLocation.notFound && (
                <View>
                {weatherData.daily?.time.map((time, index) => (
                    <Text key={time}>
                        {time} {weatherData.daily.temperature_2m_min[index]}°C {weatherData.daily.temperature_2m_max[index]}°C {weathercode[weatherData.daily.weathercode[index]].day.description}
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
    );
};

export default Weekly;
