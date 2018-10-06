import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './js/reducer';
import RepoList from './js/component/RepoList';
import SimpleExample from './js/component/SimpleExample';
import AntExample from './js/component/AntExample';
import AntIconExample from './js/component/AntIconExample';
import TitleList from './js/container/TitleList';
import Home from './js/container/Home';
import Content from './js/container/Content';

const Stack = createStackNavigator(
  {
    Content: {
      screen: Content,
    },
    Home: {
      screen: Home,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json',
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={ styles.container }>
          <Stack/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
});

//alignItems: 'center',
//justifyContent: 'center',
//make page disappear