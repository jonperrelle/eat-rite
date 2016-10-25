'use strict';

import React, { Component } from 'react';
import {Navigator, AsyncStorage, View, Text} from 'react-native';
import TabBar from '../TabBar/TabBar';
import NavBar from '../NavBar/NavBar';
import Authentication from '../Authentication/authentication';
import APIRoutes from '../API/api';
import styles from '../styles';

export default class Home extends Component {

  	constructor(props) {
    	super(props);
    	console.log(props);
    	this.state = {
    		user: props.user,
    	}
  	}

  	render() {
  		if (this.state.user) {
	  		return (
		      <TabBar user={this.state.user}/>
		    );
	  	} else {
	  		return (
	  			<NavBar name='' component={Authentication} title='Authentication'/>
	  		);
	  	}
  	}
}