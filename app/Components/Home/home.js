'use strict';

import React, { Component } from 'react';
import {Navigator, AsyncStorage, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import TabBar from '../TabBar/TabBar';
// import NavBar from '../NavBar/NavBar';
// // import Authentication from '../Authentication/authentication';
// import APIRoutes from '../API/api';
// import styles from '../styles';

export default class Home extends Component {

  	constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        user: null,
        isLoading: true
      }
    }

    componentWillMount() {
      this.fetchUser().done();
    }

    async fetchUser () {
      try {
        let response = await AsyncStorage.getItem('USER');
        this.setState({user: JSON.parse(response)});
        this.setState({isLoading: false});
      } catch (error) {
        console.log('Error', error);
      }
    }

    goToTabBar () {
      Actions.TabBar({user: this.state.user})
    }

    goToAuthentication () {
      Actions.Authentication;
    }

  	render() {

      if (this.state.isLoading) {
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        )
      } else {

        if (this.state.user) {
          {this.goToTabBar()}

        } else {
          {this.goToAuthentication()}
        }
      }

  		// if (this.state.user) {
	  	// 	return (
		  //     <TabBar user={this.state.user}/>
		  //   );
	  	// } else {
	  	// 	return (
	  	// 		<NavBar name='' component={Authentication} title='Authentication'/>
	  	// 	);
	  	// }
  	}
}