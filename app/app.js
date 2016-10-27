'use strict';

import React, { Component } from 'react';
import {Navigator, AsyncStorage, View, Text} from 'react-native';
import TabBar from './Components/TabBar/TabBar';
import NavBar from './Components/NavBar/NavBar';
import Authentication from './Components/Authentication/authentication';
import Home from './Components/Home/home';
import APIRoutes from './Components/API/api';
import styles from './Components/styles';

export default class App extends Component {

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

  	render() {

	  	if (this.state.isLoading) {
	  		return (
	  			<View style={styles.container}>
	  				<Text>Loading</Text>
	  			</View>
	  		)
	  	} else {

	  		return (
	  			<TabBar user={this.state.user}/>
	  		)
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
}

