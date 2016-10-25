'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';
import Signup from './signup';
import Login from './login';

let backgroundImg = require('../../../resources/background1.jpg');

class Authentication extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props)
  }

  _onCreateAccountPress() {
    this.props.navigator.push({
      name: 'Signup',
      title: 'Signup',
      component: Signup,
    });
  }

   _onLoginPress() {
    this.props.navigator.push({
      name: 'Login',
      title: 'Login',
      component: Login,
    });
  }

  render() {
    return (
      <Image source={backgroundImg} style={styles.bgImageContainer}>
        <View style={styles.authContainer}>
          <Text style={styles.authHeading}>Food Check</Text>
          <Text style={styles.authSubHeading}>Create an account to make sure you can eat the food products you want to buy.</Text>
          <TouchableHighlight
            style={styles.authButton}
            onPress={this._onCreateAccountPress.bind(this)}>
            <View>
              <Text style={styles.authButtonText}>Create Account</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.authButton}
            onPress={this._onLoginPress.bind(this)}>
            <View>
              <Text style={styles.authButtonText}>Login</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }

}

Authentication.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Authentication.defaultProps = {
  title: 'Authentication'
}

export default Authentication;


