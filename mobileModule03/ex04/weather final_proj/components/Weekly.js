import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchContext from './SearchContext';
import weathercode from '../weathercode.json';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: "#fffaf0",
    backgroundGradientFrom: "#fffaf0",
    backgroundGradientTo: "#fffaf0",
    decimalPlaces: 0, // Pas besoin de décimales pour les températures
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "3",
        strokeWidth: "2",
        stroke: "black"
    }
};

const getLabelForChart = date => {
    const dateObj = new Date(date);
    const day = ('0' + dateObj.getDate()).slice(-2); // Ajoute un zéro si nécessaire
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Ajoute un zéro si nécessaire
    return `${day}/${month}`; // Format JJ/MM
  };

const Weekly = () => {
    const { searchText, selectedLocation } = useContext(SearchContext);
    const [weatherData, setWeatherData] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (selectedLocation || searchText) {
          // Remplacez cette URL par votre URL de l'API
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation?.latitude || searchText.coords?.latitude}&longitude=${selectedLocation?.longitude || searchText.coords?.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${selectedLocation?.timezone || "Europe/Paris"}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              setWeatherData(data); // Stockez les données météorologiques dans l'état local
            })
            .catch(error => {
              console.error("Erreur lors de la récupération des données météorologiques:", error);
            });
        }
      }, [searchText, selectedLocation]);
    
      useEffect(() => {
        if (weatherData && weatherData.daily) {
          const labels = weatherData.daily.time.map(time => getLabelForChart(time));
          const dataMin = weatherData.daily.temperature_2m_min;
          const dataMax = weatherData.daily.temperature_2m_max;
    
          setChartData({
            labels,
            datasets: [
              {
                data: dataMin,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: dataMax,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              }
            ]
          });
        }
      }, [weatherData]);
    
      const getWeatherIconComponent = (weatherCode) => {
        // console.log("weather code in function ==>", weatherCode);
        if (weatherCode) {
            if(weatherCode >= 0 && weatherCode <= 1)
                return <MaterialCommunityIcons name="weather-sunny" size={20} color="black" />
            else if(weatherCode >= 2 && weatherCode <= 3)
                return <MaterialCommunityIcons name="weather-partly-cloudy" size={20} color="black" />
            else if(weatherCode >= 4 && weatherCode <= 5)
                return <MaterialCommunityIcons name="weather-cloudy" size={20} color="black" />    
            else if(weatherCode >= 6 && weatherCode <= 11)
                return <MaterialCommunityIcons name="weather-fog" size={20} color="black" /> 
            else if(weatherCode >= 20 && weatherCode <= 29)
                return <MaterialCommunityIcons name="weather-snowy-rainy" size={20} color="black" />     
            else if(weatherCode >= 50 && weatherCode <= 59)
                return <MaterialCommunityIcons name="weather-hazy" size={20} color="black" />
            else if(weatherCode >= 60 && weatherCode <= 69)
                return <MaterialCommunityIcons name="weather-rainy" size={20} color="black" /> 
            else if(weatherCode >= 70 && weatherCode <= 79)
                return <MaterialCommunityIcons name="weather-snowy" size={20} color="black" />
            else if(weatherCode >= 80 && weatherCode <= 99)
                return <MaterialCommunityIcons name="weather-pouring" size={20} color="black" />    
        } else {
            // console.error("weatherCode is undefined");
            return <MaterialCommunityIcons name="weather-tornado" size={20} color="black" />;
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selectedLocation?.admin2 || selectedLocation?.city}</Text>
            {selectedLocation && (
                <>
                    <Text style={styles.subtitle}>{selectedLocation.admin1 || selectedLocation?.region}, {selectedLocation.country}</Text>
                </>
            )}

            {chartData && (
                <LineChart
                    data={chartData}
                    width={screenWidth}
                    height={320}
                    chartConfig={chartConfig}
                    yAxisSuffix="°C"
                    bezier
                    style={{
                        marginVertical: 28,
                        borderRadius: 16,
                    }}
                />
            )}
            {chartData  &&(
            <View style={{
                width:screenWidth,
                height: 20,
                // backgroundColor: 'red',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'row',
            }}>
                <View style={{
                    height:5,
                    width:20,
                    borderRadius:20,
                    backgroundColor:'blue',
                }}></View>
                <Text style={{
                    color:'white',
                    marginLeft: 10,
                }}>min temperature</Text>
                <View style={{
                    height:5,
                    width:20,
                    borderRadius:20,
                    backgroundColor:'red',
                    marginLeft: 10,
                }}></View>
                <Text style={{
                    color:'white',
                    marginLeft:10,
                }}>max temperature</Text>
            </View>
            )}
            {weatherData && selectedLocation && !selectedLocation.notFound && (
                <ScrollView horizontal={true} style={styles.scrollView}>
                    {weatherData.daily?.time.map((time, index) => (
                        <View style={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                        }}>
                        <View key={time} style={styles.box}>
                            <Text style={styles.text}>{getLabelForChart(time)}</Text>
                            <Text style={{marginBottom:10}}>{getWeatherIconComponent(weatherData.daily.weathercode[index])}</Text>
                            
                            <View style={{
                                display:'flex',
                                alignItems:'flex-end',
                                flexDirection:'row',
                            }}>
                                <Text style={styles.textMax}>{weatherData.daily.temperature_2m_max[index]}°C</Text>
                                <Text style={{fontSize: 10, color:'red'}}>max</Text>
                            </View>
                            <View style={{
                                display:'flex',
                                alignItems:'flex-end',
                                flexDirection:'row',
                            }}>
                                <Text style={styles.textMin}>{weatherData.daily.temperature_2m_min[index]}°C</Text>
                                <Text style={{fontSize: 10, color:'blue'}}>min</Text>
                            </View>
                        </View>
                        </View>
                    ))}
                </ScrollView>
            )}
            {selectedLocation && selectedLocation.notFound && (
                <Text style={styles.errorText}>Could not find any result for the supplied address or coordinates</Text>
            )}
            {searchText && searchText.notFound && (
                <Text style={styles.errorText}>The service connection is lost, please check your internet connection or try again later</Text>
            )}
        </View>
    );
};

export default Weekly;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    scrollView: {
        width: screenWidth,
        height:120,
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        width: 100,
        height: 120,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 9.20,
        shadowRadius: 2,
        elevation: 12, 
    },
    title: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        margin: 5,
    },
    subtitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        // margin: 5,
    },
    text: {
        marginBottom: 10,
        fontSize: 12,
        fontWeight: '700',
        color: 'black',
    },
    textMax: {
        // marginBottom: 10,
        fontSize: 15,
        fontWeight: '700',
        color: 'red',
    },
    textMin: {
        fontSize: 15,
        fontWeight: '700',
        color: 'blue',
    },
    errorText: {
        color: 'red',
        marginTop: 20,
    }
});
