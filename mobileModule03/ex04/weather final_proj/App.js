import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Weekly, Today, Currently, TopBarLoc } from './components/index';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchContext from './components/SearchContext';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';

const Tab = createMaterialTopTabNavigator()

const screenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  headerShown: false,
  swipeEnabled: true,
  tabBarGap: 0,
  // backgroundColor:'transparent',
  // tabBarActiveTintColor: '#e91e63',
  tabBarStyle: {
    display:'flex',
    alignItem: 'center',
    justifyContent:'center',
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
    height: 70,
  },
  tabBarLabelStyle:{
    color:'white',
    margin:-5,
    fontSize: 10
  }
})

const navTheme = {
  colors: {
    background: 'transparent',
  },
};

export default function App() {

  const [searchText, setSearchText] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, selectedLocation, setSelectedLocation}}>
    <ImageBackground source={require('./assets/461.jpg')} resizeMode='cover' style={styles.backgroundImage}>
    <SafeAreaView style={styles.safeArea}>
      <TopBarLoc/>
      
      <NavigationContainer
        theme={navTheme}
      >
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
      </SafeAreaView>
    </ImageBackground>
    </SearchContext.Provider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   // width: Dimensions.get('screen').width,
  //   // height:Dimensions.get('screen').height,
  //   flex: 1,
  //   backgroundColor: 'red',
  // },
  
  safeArea: {
    flex: 1, // Permet à SafeAreaView de remplir tout l'espace de l'ImageBackground
    // backgroundColor:'red',
  },
  tab:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    top: -10,
    
  },
  backgroundImage: {
    backgroundColor:'red',
    flex:1,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  tabNavigator: {
    backgroundColor: 'transparent',
  },
});
