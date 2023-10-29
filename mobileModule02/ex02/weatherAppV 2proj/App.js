import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Weekly, Today, Currently, TopBarLoc } from './components/index';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchContext from './components/SearchContext';
import { useState } from 'react';

const Tab = createMaterialTopTabNavigator()

const screenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  headerShown: false,
  swipeEnabled: true,
  tabBarGap: 0,
  tabBarActiveTintColor: '#e91e63',
  tabBarStyle: {
    display:'flex',
    alignItem: 'center',
    justifyContent:'center',
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: 70,
  },
  tabBarLabelStyle:{
    color:'white',
    margin:-5,
    fontSize: 10
  }
})

export default function App() {

  const [searchText, setSearchText] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, selectedLocation, setSelectedLocation}}>
    <View style={styles.container}>
      <TopBarLoc/>
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={screenOptions}
          tabBarPosition='bottom'
          initialRouteName='currently'
        >
          <Tab.Screen
            name="currently"
            component={Currently}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                <View style={styles.tab}>
                  <View>
                  <AntDesign name="setting" size={26} color="black" style={{color: focused ? '#ffffff' : '#909090'}}/>
                  </View>
                </View>
                )
            }
            }}
          />
          <Tab.Screen
            name="today"
            component={Today}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                <View style={styles.tab}>
                  <View>
                  <Ionicons name="today-outline" size={24} style={{color: focused ? '#ffffff' : '#909090'}}/>
                  </View>
                </View>
                )
            }
            }}
          />
          <Tab.Screen
            name="weekly"
            component={Weekly}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                <View style={styles.tab}>
                  <View>
                  <MaterialIcons name="view-week" size={26} style={{color: focused ? '#ffffff' : '#909090'}} />
                  </View>
                </View>
                )
            }
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
    </SearchContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height:Dimensions.get('screen').height,
  },
  tab:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    top: -10,
  },
});
