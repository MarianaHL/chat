import React from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native"
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
});

const App = createAppContainer(MainNavigator);

export default App;