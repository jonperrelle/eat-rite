'use strict';

import React, { Component, PropTypes } from 'react';
import {Navigator, TouchableHighlight, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';

export default class CustomNavBar extends Component {

  constructor(props) {
    super(props);
    console.log(props.navState)
  }

  render () {
    // if (this.props.navState.routeStack.slice(-1)[0].navigationBarHidden === true) {
    //   return null;
    // } else {
      return (
        <Navigator.NavigationBar
          style={styles.navBarDisplay}
          routeMapper={{
            LeftButton(route, navigator, index, navState) {
              console.log('Here', arguments)
              if (index > 0) {
                return (
                  <TouchableOpacity
                  underlayColor="transparent"
                  onPress={() => navigator.pop()}>
                    <View style={styles.navBarView}>
                      <Icon style={styles.navIcon} name="angle-left" size={32} />
                      <Text style={styles.navBarText}>Back</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            },

            RightButton(route, navigator, index, navState) {
              console.log(route)
              return null;
              // let buttonLogic = route.buttonLogic;
              // if (buttonLogic) { return buttonLogic(route, navigator); }
            },

            Title(route, navigator, index, navState) {
              return <Text style={styles.navBarText}>{route.name}</Text>;
            }
          }}
        />
      )
    // }
  }
}