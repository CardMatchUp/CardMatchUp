import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./screens/Login";
import Oyun from "./screens/Oyun";
import Register from './screens/Register';
import HighScore from "./screens/HighScore";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({

  Register: {
  screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },

  Login: {
    navigationOptions: {
      headerShown: false,
    },
  screen: Login,
  },
  
  
  Oyun: {
    navigationOptions: {
      headerShown: false,
    },
  screen: Oyun,
  },
  
  HighScore: {
    navigationOptions: {
      headerShown: false,
    },
  screen: HighScore,
  },
},

{
  initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);
