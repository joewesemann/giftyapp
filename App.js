import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';

const ACCESS_TOKEN = 'access_token';


export default class App extends React.Component {

  async getToken() { 
    let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    let rootView = null;
    if(accessToken) {
      rootView = <Home />;
    } else {
      rootView = <Login />;
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

//Create the navigation
const MainNav = StackNavigator({
    Home: { screen: Home },
});

const DefaultStack = StackNavigator({
  Login: { screen: Login },
  Main: { screen: MainNav },
}, {
  headerMode: 'none',
});
