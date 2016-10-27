'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableOpacity, AsyncStorage, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';


class AversionDetails extends Component {

  constructor(props,context) {
    super(props,context);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
    this.state = {
      user: props.user,
      details: props.details.aversions,
      product: props.details.product,
      dataSource: this.ds.cloneWithRows(this._getRowTitles())
    };
  }

  _getRowTitles () {
      if (this.props.details.aversions.length) return this.props.details.aversions;
      return ['Error'];
  }

  _capitalizeRowHeading(ing) {
    let ingArr = ing.split(" ");
    return ingArr.map( i => {
      return i.substr(0,1).toUpperCase() + i.substr(1);
    }).join(" ");
  }

  _returnToScanner () {
    Actions.pop();
  }

  _renderRow(rowData, sectionID, rowID) {

    let closing = '';
    switch(rowData.aversion) {
      case 'Allergy':
        closing = 'of your allergy to';
        break;
      case 'Dislike':
        closing = 'you don\'t like';
        break;
      default:
        closing = 'of your dietary aversion to';
    }

    return (
      <View style={styles.aversionDetailsRow}>
        <Text style={styles.aversionDetailsRowHeading}>{this._capitalizeRowHeading(rowData.ingredient)}</Text>
        <Text style={styles.aversionDetailsRowText}>
             This product contains {rowData.ingredient} which you cannot eat because {closing} {rowData.food}.
        </Text>
      </View>

    );
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.aversionDetailsSeparator}
      />
    );
  }

  _renderHeader () {
    return (
      <View style={styles.aversionDetailsHeadingContainer}>
          <Text style={styles.aversionDetailsHeading}>{this.state.product}</Text>
          <Text style={styles.aversionDetailsSubHeading}>Forbidden Ingredients</Text>
      </View>
    );

  }

  _renderFooter () {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this._returnToScanner.bind(this)}
        >
          <Text style={styles.buttonText}>Return to Scanner</Text>
        </TouchableOpacity>
      </View>
    );

  }

  render() {

    return (
      <View style={styles.aversionDetailsContainer}>
        <ListView
            style={styles.aversionDetailsRowContainer}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator}
            renderHeader={this._renderHeader.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
          />
      </View>
    );
  }

}

export default AversionDetails;