'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';

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
    Actions.Signup();
  }

   _onLoginPress() {
    Actions.Login();
  }

  render() {
    return (
      <Image source={backgroundImg} style={styles.bgImageContainer}>
        <View style={styles.authContainer}>
          <Text style={styles.authHeading}>EatRite</Text>
          <Text style={styles.authSubHeading}>Make sure that you can eat the food you want.</Text>
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

// Authentication.propTypes = {
//   title: PropTypes.string.isRequired,
//   navigator: PropTypes.object.isRequired,
// }

// Authentication.defaultProps = {
//   title: 'Authentication'
// }

export default Authentication;


