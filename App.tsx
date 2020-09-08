/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/Homescreen';
import FirstAnimation from './components/animations/FirstAnimation';
import Transitions from './components/animations/Transitions';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home Screen'}}
          />
          <Stack.Screen
            name="FirstAnimation"
            component={FirstAnimation}
            options={{title: 'First Animation'}}
          />
          <Stack.Screen
            name="Transitions"
            component={Transitions}
            options={{title: 'Transitions'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
