import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import SearchContext from './SearchContext';

const Currently = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

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
                <>
                    <Text>{weatherData.hourly.temperature_2m[0]}°C</Text>
                    <Text>{weatherData.hourly.windspeed_10m[0]}km/h</Text>
                    {/* Vous pouvez ajouter d'autres détails météorologiques ici */}
                </>
            )}
        </View>
    );
};

export default Currently;
