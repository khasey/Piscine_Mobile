/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
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
  const [button, setButton] = useState(false);
  const [word, setWord] = useState('React Native');

  const onclickfunction = (button: boolean) => {
    console.log('Button pressed');
    if (button === true) {
      setWord('React Native');
      setButton(false);
    } else {
      setWord('React Native Rocks');
      setButton(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text>{word}</Text>
        <View style={styles.button}>
          <Button
            title="Click me"
            color={'white'}
            onPress={() => onclickfunction(button)}
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
