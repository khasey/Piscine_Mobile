import { Text, StyleSheet, View, Dimensions, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SearchContext from './SearchContext';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';

const TopBarLoc = () => {
    const { searchText, setSearchText, setSelectedLocation } = useContext(SearchContext);
    const [text, onChangeText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (text.trim()) {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10&language=en&format=json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('The service connection is lost, please check your internet connection or try again later');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.results) {
                        setSuggestions(data.results.slice(0, 5));
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch(() => {
                    setSearchText("Could not find any result for the supplied address or coordinates.");
                });
        } else {
            setSuggestions([]);
        }
    }, [text]);

    const handleLocationPress = async () => {
        setSelectedLocation(null);
        setSearchText(null);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setSearchText({ notFound: true });
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        // console.log("location ===>>>", location);
    
        // Utilisez reverseGeocodeAsync pour obtenir l'adresse à partir des coordonnées
        let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
        // console.log("reverseGeocode ===>>>", reverseGeocode);

    
        if (reverseGeocode && reverseGeocode.length > 0) {
            let place = reverseGeocode[0];
            let address = {
                city: place.city,
                region: place.region,
                country: place.country,
            };
            setSelectedLocation(address);
            setSearchText(location);
        }
    };
    

    const handleSearchPress = () => {
        if (!suggestions.length && text.trim()) {
            setSelectedLocation({ notFound: true });
            setSearchText("Could not find any result for the supplied address or coordinates.");
        } else if (suggestions.length === 1) {
            const suggestion = suggestions[0];
            setSearchText(suggestion.name);
            setSelectedLocation(suggestion);
            setSuggestions([]);
        }
    };    

    return (
        <SafeAreaView>
            <View style={styles.bar}>
                <AntDesign name="search1" size={24} color="white" onPress={handleSearchPress} />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    onSubmitEditing={handleSearchPress}
                />
                <Entypo name="location" size={24} color="white" onPress={handleLocationPress} />
            </View>
            <View style={styles.suggestionsContainer}>
                {suggestions.map(suggestion => (
                    <View style={{
                        width: Dimensions.get('window').width,
                        // backgroundColor:'red',
                        borderBottomWidth:'1',
                        borderBottomColor:'white',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'flex-start',
                        flexDirection: 'row',
                        paddingHorizontal:30,
                    }}>
                    <FontAwesome5 name="city" size={24} color="white" />    
                    <Text key={suggestion.id} onPress={() => {
                        setSearchText(suggestion.name);
                        setSelectedLocation(suggestion);
                        setSuggestions([]);
                    }}
                    style={{
                        margin: 20,
                    }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight:'600',
                            color:'white',
                        }}>{suggestion.name}   </Text>
                        <Text style={{
                            color:'white',
                        }}>{suggestion.admin1}, {suggestion.country}</Text>
                           
                        
                    </Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default TopBarLoc;

const styles = StyleSheet.create({
    bar: {
        width: Dimensions.get('window').width,
        height: 60,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    input: {
        width: '70%',
        borderWidth: 2,
        height: '80%',
        margin: 15,
        padding: 10,
        borderRadius: 10,
        // backgroundColor: '#f5f5f5',
        borderColor: 'white',
        color:'white',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    suggestionsContainer: {
        // backgroundColor: 'white',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width: Dimensions.get('window').width,
        // gap:10,
    }
});
