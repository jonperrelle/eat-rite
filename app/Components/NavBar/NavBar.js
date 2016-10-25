'use strict';

import React, { Component, PropTypes } from 'react';
import {Navigator, TouchableHighlight, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
import Scanner from '../Scanner/scanner';
import Ingredients from '../Ingredients/ingredients';


export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        buttonLogic={route.buttonLogic}
        user={route.user}
        {...route.passProps}/>
    );
  }

  render() {
      return (
        <Navigator
          initialRoute={{
            name: this.props.name,
            component: this.props.component,
            title: this.props.title,
            buttonLogic: this.props.buttonLogic || undefined,
            user: this.props.user,
          }}
          style={styles.wrapper}
          renderScene={this.renderScene}
          navigationBar={<Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={{
              LeftButton(route, navigator, index, navState) {
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
                let buttonLogic = route.buttonLogic;
                if (buttonLogic) { return buttonLogic(route, navigator); }
              },

              Title(route, navigator, index, navState) {
                return <Text style={styles.navBarText}>{route.name}</Text>;
              }
            }}
          />}/>
        );
    }
}




