'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight, Image} from 'react-native';
import styles from '../styles';
import Scanner from '../Scanner/scanner';
import Ingredients from '../Ingredients/ingredients';

let backgroundImg = require('../../../resources/background1.jpg');

class Home extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  componentDidMount() {
  }

  _onCameraPress() {
    this.props.navigator.push({
      title: 'Scanner',
      component: Scanner
    });
  }

   _onIngredientPress() {
    this.props.navigator.push({
      title: 'Ingredients',
      component: Ingredients
    });
  }

  render() {
    return (
      <Image source={backgroundImg} style={styles.homeContainer}>
        <View>
          <TouchableHighlight
            style={styles.homeButton}
            onPress={this._onCameraPress.bind(this)}>
            <Text style={styles.homeButtonText}>Scan Barcode</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.homeButton}
            onPress={this._onIngredientPress.bind(this)}>
            <Text style={styles.homeButtonText}>List of Ingredients</Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }

}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Home.defaultProps = {
  title: 'Food Check App'
}

export default Home;


