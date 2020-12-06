import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./screens/Login";
import Oyun from "./screens/Oyun";
import Register from './screens/Register';

export default function App() {

  /*return  <Login />;*/
  /*return <Register/>*/
  return <Register/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
