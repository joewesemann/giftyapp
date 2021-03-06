import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <Image  
          style={styles.logo}
          source={require('../../images/gifty.png')} />

          <Text style={styles.title}>Giftysaur.us</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm navigate = {navigate} />
        </View>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 140,
    height: 100
  },
  title: {
    color: '#FFFFFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center'
  }
});