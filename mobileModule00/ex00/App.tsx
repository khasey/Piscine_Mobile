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
  Dimensions,
  useColorScheme,
  View,
  Button,
} from 'react-native';


function App(): JSX.Element {

  const onclickfunction = () => {
    console.log('Button pressed')
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>React Native</Text>
        <View style={styles.button}>
          <Button title="Click me" color={'white'}
          onPress={onclickfunction}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    backgroundColor: 'blue',
    width: 100,
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    fontWeight:600,
  },
});

export default App;
