'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, AlertIOS, Modal} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
import {server} from '../../../server/env/development';
import util from '../Util/util';

const Camera = require('react-native-camera');
let myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');

class Scanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isLoading: false,
      modalVisible: false,
      allowed: false,
      details: null,
      cameraType: Camera.constants.Type.back
    };
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _goToDetails() {
    this.setState({modalVisible: false});
    Actions.scanner_details({user: this.state.user, details: this.state.details})
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
        console.log(jsonData);
        let aversions = util.checkFood(this.state.user.food, jsonData);
        if (aversions.length) {
          let details = {
            aversions: aversions,
            product: jsonData.product
          };

          this.setState({allowed: false});
          this.setState({details: details});
          this._setModalVisible(!this.state.modalVisible);
        } else {
          this.setState({allowed: true});
          this._setModalVisible(!this.state.modalVisible);
          // this.renderModalContent(this.state.modalVisible);
        }
        this.setState({isLoading: false})
      })
      .catch( error => console.log('Fetch error ' + error) );

  }

  renderModalContent (visible, allowed) {

    if (allowed) {
      return (
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
          <View style={styles.scannerInnerContainer}>
            <View style={styles.closeModalButton}>
              <TouchableOpacity

                onPress={this._setModalVisible.bind(this, !visible)}>
                <Icon style={styles.closeIcon} name="times" size={32} />
              </TouchableOpacity>
            </View>
            <Icon style={styles.allowedIcon} name="check-circle-o" size={128} />
            <Text style={styles.scannerModalText}>This is allowed!</Text>
          </View>
         </View>
        </Modal>
      )
    } else {
      return (
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
          <View style={styles.scannerInnerContainer}>
            <View style={styles.closeModalButton}>
              <TouchableOpacity

                onPress={this._setModalVisible.bind(this, !visible)}>
                <Icon style={styles.closeIcon} name="times" size={32} />
              </TouchableOpacity>
            </View>
            <Icon style={styles.notAllowedIcon} name="times-circle-o" size={128} />
            <Text style={styles.scannerModalText}>This is not allowed!</Text>
            <TouchableOpacity
              style={styles.scannerModalButton}
              onPress={this._goToDetails.bind(this)}>
              <Text style={styles.scannerModalButtonText}>See Why</Text>
            </TouchableOpacity>
          </View>
         </View>
        </Modal>
      )
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
        <View style={styles.scannerContainer}>
            <Camera
              ref="cam"
              style={styles.camera}
              onBarCodeRead={this._onBarCodeRead.bind(this)}
              type={this.state.cameraType}
            >
            </Camera>
            {this.renderModalContent(this.state.modalVisible, this.state.allowed)}
        </View>

      );
    }
  }
}

Scanner.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Scanner;

