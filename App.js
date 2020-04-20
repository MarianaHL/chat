import React from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native"
import LoginScreen from './screens/LoginScreen';
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';
import Socket from './components/Socket';

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  ExampleSocket: { screen: Socket },
});

const App = createAppContainer(MainNavigator);

export default App;