'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, AlertIOS, Modal} from 'react-native';
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
    console.log(props);
    this.state = {
      user: this.props.user,
      isLoading: false,
      modalVisible: false,
      allowed: false,
      cameraType: Camera.constants.Type.back
    };
  }

  _setModalVisible(visible) {
    console.log('Here', visible);
    this.setState({modalVisible: visible});
  }

  _goToReasons() {
    console.log('Here');
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
        let aversions = util.checkFood(this.state.user.food, jsonData.contents);
        if (aversions.length) {
          this.setState({allowed: false});
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
                onPress={this._goToReasons.bind(this)}>
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
        console.log(this.state.modalVisible);
      return (
        <View style={{backgroundColor: 'transparent', flex: 1}}>
            <Camera
              ref="cam"
              style={styles.container}
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

