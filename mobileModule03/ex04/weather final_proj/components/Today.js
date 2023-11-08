import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchContext from './SearchContext';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const Today = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ data: [] }]
    });

    useEffect(() => {
        if (selectedLocation || searchText) {
            const queryString = `latitude=${selectedLocation?.latitude || searchText.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText.coords?.longitude}&hourly=temperature_2m,windspeed_10m,weather_code`;
            fetch(`https://api.open-meteo.com/v1/forecast?${queryString}`)
                .then(response => response.json())
                .then(data => {
                    const todayDateString = new Date().toISOString().split('T')[0];
    
                    // Filtrer pour avoir seulement les données d'aujourd'hui
                    const todayData = {
                        hourly: {
                            time: [],
                            temperature_2m: [],
                            windspeed_10m: [],
                            weather_code: [],
                        }
                    };
    
                    for (let i = 0; i < data.hourly.time.length - 1; i++) {
                        const time = data.hourly.time[i];
                        if (time.startsWith(todayDateString)) {
                            const hour = new Date(time).getHours();
                                todayData.hourly.time.push(time);
                                todayData.hourly.temperature_2m.push(data.hourly.temperature_2m[i]);
                                todayData.hourly.windspeed_10m.push(data.hourly.windspeed_10m[i]);
                                todayData.hourly.weather_code.push(data.hourly.weather_code[i]);
                        }
                    }
    
                    setWeatherData(todayData); // Stockez seulement les données météorologiques d'aujourd'hui
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données météorologiques:", error);
                });
        }
    }, [searchText, selectedLocation]);
    

    useEffect(() => {
        if (weatherData && weatherData.hourly && weatherData.hourly.time) {
            const hourlyTimes = weatherData.hourly.time;
            const hourlyTemperatures = weatherData.hourly.temperature_2m;
    
            // Obtenir la date du jour actuel au format 'YYYY-MM-DD'
            const todayDateString = new Date().toISOString().split('T')[0];
    
            // Créer des tableaux pour les nouveaux labels et températures
            const newLabels = [];
            const newTemps = [];
    
            hourlyTimes.forEach((time, index) => {
                const [date, hour] = time.split('T');
                if (date === todayDateString) {
                    const hours = hour.split(':')[0];
                    // Ajoutez seulement les heures multiples de 3
                    if (parseInt(hours) % 3 === 0) {
                        newLabels.push(`${hours}:00`);
                        newTemps.push(hourlyTemperatures[index]);
                    }
                }
            });
    
            // Filtrez ici les données pour vous assurer qu'elles sont finies
            const cleanData = newTemps.filter(Number.isFinite);
    
            setChartData({
                labels: newLabels,
                datasets: [{ data: cleanData }]
            });
        }
    }, [weatherData]);
    

      
      
    console.log("weatherData ==> ",weatherData);
    console.log("chartData ==> ",chartData);
    console.log("chatData JSON.stringify ==>",JSON.stringify(chartData.datasets[0].data))

    const getWeatherIconComponent = (weatherCode) => {
        // console.log("weather code in function ==>", weatherCode);
        if (weatherCode) {
            if(weatherCode >= 0 && weatherCode <= 1)
                return <MaterialCommunityIcons name="weather-sunny" size={20} color="red" />
            else if(weatherCode >= 2 && weatherCode <= 3)
                return <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="red" />
            else if(weatherCode >= 4 && weatherCode <= 5)
                return <MaterialCommunityIcons name="weather-cloudy" size={20} color="red" />    
            else if(weatherCode >= 6 && weatherCode <= 11)
                return <MaterialCommunityIcons name="weather-fog" size={20} color="red" /> 
            else if(weatherCode >= 20 && weatherCode <= 29)
                return <MaterialCommunityIcons name="weather-snowy-rainy" size={20} color="red" />     
            else if(weatherCode >= 50 && weatherCode <= 59)
                return <MaterialCommunityIcons name="weather-hazy" size={20} color="red" />
            else if(weatherCode >= 60 && weatherCode <= 69)
                return <MaterialCommunityIcons name="weather-rainy" size={20} color="red" /> 
            else if(weatherCode >= 70 && weatherCode <= 79)
                return <MaterialCommunityIcons name="weather-snowy" size={20} color="red" />
            else if(weatherCode >= 80 && weatherCode <= 99)
                return <MaterialCommunityIcons name="weather-pouring" size={20} color="red" />    
        } else {
            // console.error("weatherCode is undefined");
            return <MaterialCommunityIcons name="weather-tornado" size={20} color="red" />;
        }
    };

    const widthScreen = Dimensions.get('window').width;

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
            
            <Text style={styles.ville}>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
              <>
                <Text style={styles.ville}>{selectedLocation.admin1 || selectedLocation?.region}, {selectedLocation.country}</Text>
              </>
            )}

            <View>
                {weatherData && (
            <LineChart
                data={chartData}
                width={380} // from react-native
                height={320}
                yAxisSuffix="°C"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fffaf0",
                    backgroundGradientFrom: "#fffaf0",
                    backgroundGradientTo: "#fffaf0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        display:'flex',
                        justifyContent:'center',
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "black"
                    }
                }}
                bezier
                style={{
                    marginVertical: 28,
                    borderRadius: 16,
                }}
            />
            )}
            </View>
            
            
            {weatherData && selectedLocation && !selectedLocation.notFound &&(
            <ScrollView 
            horizontal={true} 
            style={styles.scrollv}
            bouncesZoom={true}
            indicatorStyle='white'
            >
                <View style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                    gap:5,
                }}>
                {weatherData.hourly?.time.map((time, index) => (
                    <View key={time} style={styles.text}>
                        <Text style={{
                            margin: 10,
                            fontSize:12,
                            fontWeight:'700',
                            color:'rgba(0, 0, 255, 1)',
                            }}>
                            {time.split('T')[1]?.split(':')[0] + ':' + time.split('T')[1].split(':')[1]} 
                        </Text>
                        <View>
                        {getWeatherIconComponent(weatherData.hourly.weather_code[index])}
                        </View>
                        <Text style={{
                            margin: 10,
                            fontSize:12,
                            fontWeight:'700',
                            color:'rgba(0, 0, 255, 1)',
                            }}>
                            {weatherData.hourly.temperature_2m[index]}°C 
                        </Text>
                        
                        <Text style={{
                            margin: 0,
                            fontSize:12,
                            fontWeight:'700',
                            color:'rgba(0, 0, 255, 1)',
                            }}>
                            <FontAwesome5 name="wind" size={15} color="rgba(0, 0, 255, 1)"/>
                            {weatherData.hourly.windspeed_10m[index]}km/h
                        </Text>
                    </View>
                ))}
                </View>
            </ScrollView>
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
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width:100,
        height:120,
        borderRadius:20,
        backgroundColor:'#fffaf0',
        borderWidth:2,
        borderStyle:'ridge',
        borderColor: '#dcdcdc',
        marginLeft:5,
    },
    ville:{
        color:'white',
        fontWeight:'700',
        fontSize: 20,
        margin:5,
    },
    scrollv:{
        width:Dimensions.get('window').width,
        height: 150,
        // backgroundColor:'red',
        display:'flex',
        flexDirection:'row',
    },
})