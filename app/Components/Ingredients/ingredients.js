'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from '../styles';

class Ingredients extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          List of Ingredients
        </Text>
      </View>
    );
  }
}

Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

Ingredients.defaultProps = {
  title: 'Ingredients'
}

export default Ingredients;

