import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./screens/Login";
import Oyun from "./screens/Oyun";
import Register from './screens/Register';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export function App() {

  /*return  <Login />;*/
  /*return <Register/>*/
  return <Login/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator({
  Register: {
  screen: Register,
  },

  Login: {
  screen: Login,
  },
  
  Oyun: {
  screen: Oyun,
  },
},

{
  initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);
