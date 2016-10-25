'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight, AsyncStorage, AlertIOS} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import Account from '../Account/accountHome';
import Home from '../Home/home';
import APIRputes from '../API/api';
import {server} from '../../../server/env/development';
const _ = require('lodash');
const t = require('tcomb-form-native');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
let myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');

let Form = t.form.Form;
let LoginForm = t.struct({
  email: t.String,
  password: t.String,
});

stylesheet.textbox.normal.width = 200;

let options = {
  auto: 'placeholders',
  stylesheet: stylesheet,
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
    },
    email: {
      keyboardType: 'email-address',
      autoCorrect: false,
    }
  }
};

class Login extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      isLoading: false,
      returningUser: null
    }
  }

  _handleSubmit() {
    let user = this.refs.form.getValue();

    this.setState({isLoading: true})

    fetch(`http://${server.route}/auth/login`, {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(user)
    })
    .then( response => response.json())
    .then( jsonData => {
      //modal to Check mark with successful, then back to home
      return APIRputes.setUserStorage(jsonData);
    })
    .then( (userInfo) => {
      this.props.navigator.push({
        name: 'My Account',
        title: 'Home',
        component: Home,
        user: userInfo,
      });
    })
    .catch( error => {
      AlertIOS.alert(
         'Username/Password Incorrect',
         'Please reenter',
         [
           {text: 'Ok', onPress: () => console.log('Ok Pressed')},
         ]
        );
      this.setState({isLoading: false})
    });

  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.authSubHeading}>Login</Text>
          <Form
            ref="form"
            type={LoginForm}
            options={options}
            value={this.state.returningUser}>
          ></Form>
          <TouchableHighlight
            style={styles.authButton}
            onPress={this._handleSubmit.bind(this)}>
              <View>
                <Text style={styles.authButtonText}>Login</Text>
              </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

}

Login.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Login.defaultProps = {
  title: 'Login'
}

export default Login;