import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator } from 'react-native';


const ACCESS_TOKEN = '';

export default class LoginForm extends Component {

  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }

  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }

  async onLoginPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch('https://giftyjoe-vazaha.c9users.io/api/get-token/', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                username: this.state.email,
                                password: this.state.password,
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          this.setState({error: ""});
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }
  }


  render() {
    return (
      <View style={styles.container}>
        
        <StatusBar barStyle='light-content' />

        <TextInput 
        placeholder='username'
        style={styles.input}
        returnKeyType='next' 
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType='email-address' 
        autoCapitalize='none'
        autoCorrect={false} 
        onChangeText={ (text)=> this.setState({email: text})} />

        <TextInput 
        placeholder='password'
        secureTextEntry
        style={styles.input}
        returnKeyType='go' 
        ref={(input) => this.passwordInput = input}
        onSubmitEditing={this.onLoginPressed.bind(this)}
        onChangeText={ (text)=> this.setState({password: text})} />

        <TouchableOpacity onPress={this.onLoginPressed.bind(this)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.error}>
          {this.state.error}
        </Text>

        <ActivityIndicator animating={this.state.showProgress} size='large' color='white' style={styles.loader} />

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});