import React from 'react';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Socket from '../components/Socket';

class User1 extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (<Text style={focused ? {color: '#fff'} : {color: '#000'}}>Yo</Text>),
    activeTintColor: '#fff',
    tabBarColor: '#000'
  };
  render() {
    return  <Socket usr="Mariana" />;
  }
}
class User2 extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (<Text style={focused ? {color: '#fff'} : {color: '#D4FFE2'}}>Marina</Text>),
    activeTintColor: '#fff',
    tabBarColor: '#000'
  };
  render() {
    return  <Socket usr="Marina" />;
  }
}

const MaterialBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    User1: User1,
    User2: User2,
  },
  {
    shifting: true,
  }
);

export default class Chat extends React.Component {
  render() {
    return <MaterialBottomTabNavigator />;
  }
}