'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, Navigator, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import store from 'react-native-simple-store';
import styles from '../styles';
import APIRoutes from '../API/api';
import Icon from 'react-native-vector-icons/FontAwesome';


class Settings extends Component {

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._getRowTitles())
    };
  }

  _getRowTitles () {
    return ['Logout']
  }

  _onRowPress(rowData) {
     APIRoutes.logoutUser()
      .then( () => {
        //modal to show that logout was successful
        Actions.Authentication();
      });
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        onPress={this._onRowPress.bind(this,rowData)}
      >
        <View>
          <View style={styles.foodRow}>
            <Text style={styles.foodRowText}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.foodRowSeparator}
      />
    );
  }

  render() {
    return (
      <View style={styles.accountContainer}>
        <ListView
          style={styles.rowContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
        />
      </View>

      );
  }

}

export default Settings;


