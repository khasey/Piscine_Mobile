import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchContext from './SearchContext';
import { SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import weathercode from '../weathercode.json';
import * as WeatherIcons from "react-icons/wi";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Currently = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [icon, setIcon] = useState(null);
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (selectedLocation) {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation?.latitude || searchText?.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText?.coords?.longitude}&hourly=temperature_2m,windspeed_10m,weather_code`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setWeatherData(data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météorologiques:", error);
                });
        }
    }, [selectedLocation, searchText]);

    const getWeatherIconComponent = (weatherCode) => {
        console.log("weather code in function ==>", weatherCode);
        if (weatherCode) {
            if(weatherCode >= 0 && weatherCode <= 1)
                return <MaterialCommunityIcons name="weather-sunny" size={120} color="white" />
            else if(weatherCode >= 2 && weatherCode <= 3)
                return <MaterialCommunityIcons name="weather-partly-cloudy" size={120} color="white" />
            else if(weatherCode >= 4 && weatherCode <= 5)
                return <MaterialCommunityIcons name="weather-cloudy" size={120} color="white" />    
            else if(weatherCode >= 6 && weatherCode <= 11)
                return <MaterialCommunityIcons name="weather-fog" size={120} color="white" /> 
            else if(weatherCode >= 20 && weatherCode <= 29)
                return <MaterialCommunityIcons name="weather-snowy-rainy" size={120} color="white" />     
            else if(weatherCode >= 50 && weatherCode <= 59)
                return <MaterialCommunityIcons name="weather-hazy" size={120} color="white" />
            else if(weatherCode >= 60 && weatherCode <= 69)
                return <MaterialCommunityIcons name="weather-rainy" size={120} color="white" /> 
            else if(weatherCode >= 70 && weatherCode <= 79)
                return <MaterialCommunityIcons name="weather-snowy" size={120} color="white" />
            else if(weatherCode >= 80 && weatherCode <= 99)
                return <MaterialCommunityIcons name="weather-pouring" size={120} color="white" />    
        } else {
            // console.error("weatherCode is undefined");
            return <MaterialCommunityIcons name="weather-tornado" size={120} color="white" />;
        }
    };
    

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
            <Text style={styles.text1}>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
              <>
                <Text style={styles.text2}>{selectedLocation.admin1 || selectedLocation?.region}, {selectedLocation.country}</Text>
                {/* <Text style={styles.text}>{selectedLocation.country}</Text> */}
              </>
            )}
            
            {weatherData && selectedLocation && !selectedLocation.notFound && (
                <>
                    <Text style={styles.temperature_2m}>{weatherData.hourly?.temperature_2m[0]}°C</Text>
                    <Text style={styles.desc}>
                        {weathercode[weatherData.hourly.weather_code[0].toString()]?.day.description || 'Description not found'}
                        
                    </Text>
                    {weathercode && (
                    <View style={styles.desc}>
                    {getWeatherIconComponent(weatherData.hourly.weather_code[0])}
                    </View>
                    )}
                    <Text style={styles.wind}>
                        <FontAwesome5 name="wind" size={20} color="white"/>
                        {weatherData.hourly?.windspeed_10m[0]}km/h
                    </Text>
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
    },
    text1:{
        color:'white',
        fontSize: 25,
        fontWeight: '600',
    },
    text2:{
        color:'white',
        fontSize: 18,
        fontWeight: '600',
    },
    temperature_2m:{
        color:'white',
        fontSize: 50,
        fontWeight: '800',
        margin: 40,
    },
    wind:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        color:'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop:20,
    },
    desc:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        color:'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },
})

