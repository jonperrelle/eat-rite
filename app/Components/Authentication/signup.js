'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, Dimensions, View, TouchableHighlight, AsyncStorage, ActivityIndicator} from 'react-native';
import store from 'react-native-simple-store';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import APIRoutes from '../API/api';
import {server} from '../../../server/env/development';

const _ = require('lodash');
const t = require('tcomb-form-native');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
let myHeaders = new Headers();
let windowWidth = Dimensions.get('window').width;

myHeaders.append('Content-Type', 'application/json');

let Form = t.form.Form;
let SignupForm = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
});

stylesheet.textbox.normal.width = windowWidth * .5;
stylesheet.textbox.normal.minWidth = 200;
stylesheet.textbox.normal.maxWidth = 400;
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderColor = '#48afdb';
stylesheet.textbox.normal.fontSize = 18;
stylesheet.textbox.normal.height = 50;
stylesheet.textbox.normal.color = '#48afdb';

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
      console.log(jsonData);
      //modal to Check mark with successful, then back to home
      return APIRoutes.setUserStorage(jsonData);
    })
    .then( (userInfo) => {
      Actions.TabBar({user: userInfo, type: 'reset', hideBackImage: true});
    })
    .catch( error => console.log('Fetch error ' + error) );

  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            color="#48afdb"
            size="large"
            />
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

export default Signup;