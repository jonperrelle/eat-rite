'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, ListView, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import store from 'react-native-simple-store';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';


class Account extends Component {

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      user: props.user,
      dataSource: ds.cloneWithRows(this._getRowData())
    };
  }

  _getRowData () {

    return [
    {title: 'Foods', name:'Food Aversions'},
    {title: 'Products', name: 'Product Aversions'},
    {title: 'Settings', name: 'Settings'}
    ];
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        onPress={
          this._onRowPress.bind(this, rowData)
        }
      >
        <View style={styles.accountRow}>
          <Text style={styles.rowText}>
            {rowData.name}
          </Text>
        </View>

      </TouchableOpacity>
    );
  }

  _renderHeader () {
    return (
      <View>
        <Text style={styles.foodRowHeader}>Welcome {this.state.user.fullName}!</Text>
      </View>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.accountRowSeparator}
      />
    );
  }

  _onRowPress(rowData) {
    let route = 'account_' + rowData.title.toLowerCase()
    Actions[route]({user:this.state.user});
  }

  render() {
    return (
      <View style={styles.accountContainer}>
        <ListView
          style={styles.rowContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          renderSeparator={this._renderSeparator}
        />
      </View>

      );
  }

}

export default Account;


