'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, Navigator, ListView, AsyncStorage} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import Scanner from '../Scanner/scanner';
import Ingredients from '../Ingredients/ingredients';
import Authentication from '../Authentication/authentication';
import NavBar from '../NavBar/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foods from './foods';
import Products from './products';
import Settings from './settings';


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
    {title: 'Foods', comp: Foods},
    {title: 'Products', comp: Products},
    {title: 'Settings', comp: Settings}
    ]
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
            {rowData.title}
          </Text>
        </View>

      </TouchableOpacity>
    );
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
    this.props.navigator.push({
      name: rowData.title,
      title: rowData.title,
      component: rowData.comp,
      user: this.state.user,
    });
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

export default Account;


