'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from '../styles';
import server from '../../../server/env/development'
const Camera = require('react-native-camera');
let myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');

class Scanner extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      cameraType: Camera.constants.Type.back
    }
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
        <Camera
          ref="cam"
          style={styles.container}
          onBarCodeRead={this._onBarCodeRead.bind(this)}
          type={this.state.cameraType}
        >
        </Camera>
      );
    }
  }

  _onBarCodeRead(e) {
    this.setState({isLoading: true})

    fetch(`http://${server.route}/api/scanner`, {
      method: "POST",
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({upc: e.data})
    })
      .then( response => response.json())
      .then( jsonData => {
        console.log('Here', jsonData);
        this.setState({isLoading: false})
      })
      .catch( error => console.log('Fetch error ' + error) );

  }
}

Scanner.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Scanner.defaultProps = {
  title: 'Scanner'
}

export default Scanner;

