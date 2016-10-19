'use strict';

import React, { Component } from 'react';
import {NavigatorIOS} from 'react-native';
import Home from './Components/Home/home';
import styles from './Components/styles';

export default class App extends Component {

  render() {

    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'Food Check App',
        }}
        style={styles.wrapper}
      />
    );
  }
}

