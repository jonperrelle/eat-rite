'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight, AsyncStorage} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import Account from '../Account/accountHome';
import APIRoutes from '../API/api';
import {server} from '../../../server/env/development';
const _ = require('lodash');
const t = require('tcomb-form-native');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
let myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');

let Form = t.form.Form;
let SignupForm = t.struct({
  first_name: t.String,
  last_name: t.String,
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
    },
    first_name: {
      autoCorrect: false,
    },
    last_name: {
      autoCorrect: false,
    }
  }
}

class Signup extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      isLoading: false,
      newUser: null
    }
  }

  _handleSubmit() {
    let user = this.refs.form.getValue();

    //ActivityIndicatorIOS
    this.setState({isLoading: true})

    fetch(`http://${server.route}/auth/signup`, {
      method: "POST",
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(user)
    })
    .then( response => {
      return fetch(`http://${server.route}/auth/login`, {
        method: "POST",
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(user)
      });
    })
    .then( response => response.json())
    .then( jsonData => {
      //modal to Check mark with successful, then back to home
      return APIRoutes.setUserStorage(jsonData);
    })
    .then( (userInfo) => {
      console.log('Here', userInfo);
      this.props.navigator.push({
        name: 'Account',
        title: 'Account',
        component: Account,
        user: userInfo,
      });
    })
    .catch( error => console.log('Fetch error ' + error) );

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
          <Text style={styles.authSubHeading}>Create An Account</Text>
          <Form
            ref="form"
            type={SignupForm}
            options={options}
            value={this.state.newUser}>
          ></Form>
          <TouchableHighlight
            style={styles.authButton}
            onPress={this._handleSubmit.bind(this)}>
            <View>
              <Text style={styles.authButtonText}>Sign up</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

}

Signup.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Signup.defaultProps = {
  title: 'Signup'
}

export default Signup;