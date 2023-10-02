/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const buttons = [
  ['7', '8', '9', 'C', 'AC'],
  ['4', '5', '6', '+', '-'],
  ['1', '2', '3', '*', '/'],
  ['0', '.', '00', '=']
];


function App(): JSX.Element {

  const [input, setInput] = React.useState('0');
const [output, setOutput] = React.useState('0');
const windowWidth = Dimensions.get('window').width;
const itemDimension = windowWidth / 6;


function handlePress(value:any) {
  console.log(value);
}

  return (
    <View style={styles.background}>
    <SafeAreaView style={styles.appbar}>
      <Text style={styles.title}>Calculator</Text>
    </SafeAreaView>

    <View style={styles.result}>
      <Text style={styles.text}>{input}</Text>
      <Text style={styles.text}>{output}</Text>
    </View>

  <View style={styles.calcul}>
    <FlatGrid
    itemDimension={itemDimension}
    data={buttons.flat()}
    renderItem={({ item }) => (
      <Button title={item} onPress={() => handlePress(item)} />
    )}
  />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  appbar: {
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: '#4d4d4d',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  title:{
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  result:{
    backgroundColor: 'white',
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  text:{
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    margin: 5,
  },
  calcul:{
    backgroundColor: '#4d4d4d',
    width:Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',  // Ajoutez cette ligne
  },
  but:{
    marginTop: '5%'
  },

  
});

export default App;
