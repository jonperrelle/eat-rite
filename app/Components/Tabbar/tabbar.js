'use strict';

import React, { Component, PropTypes } from 'react';
import {TabBarIOS, Navigator} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import Account from '../Account/accountHome';
import NavBar from '../NavBar/NavBar';
import Scanner from '../Scanner/scanner';
import Ingredients from '../Ingredients/ingredients';
import Icon from 'react-native-vector-icons/FontAwesome';



let barcodeIcon = require('../../../resources/barcode-icon.png');

class TabBar extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: props.user,
      selectedTab: 'Account',
    };
  }

  componentWillMount () {

  }

  _setTab(tabName) {
    this.setState({selectedTab: tabName});
  }

  _renderScene(route, navigator) {
    console.log(route);
    return  (
      <route.component
        navigator={navigator}
        {...route.passProps}
      />
    );
  }

  render() {

    return (
      <TabBarIOS
      	style={styles.wrapper}
      	itemPositining="fill"
      	transulcent={true}
      >
        <Icon.TabBarItemIOS
          title="My Account"
          iconName="user"
          selected={this.state.selectedTab === 'Account'}
          onPress={() => this._setTab('Account')} >
          <NavBar name='My Account' component={Account} title='Account' user={this.state.user}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
        	title="Scanner"
        	iconName="camera"
        	selected={this.state.selectedTab === 'Scanner'}
        	onPress={() => this._setTab('Scanner')} >
        	<NavBar name='' component={Scanner} title='Scanner' user={this.state.user} />
        </Icon.TabBarItemIOS>
      </TabBarIOS>

    );
  }

}



export default TabBar;