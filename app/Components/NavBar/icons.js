'use strict';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NavBarIcon extends Component {

	constructor(props) {
		super(props);
	}

    render(){
        return (
        	<Icon style={[styles.tabBarIcon, {color: '#48afdb'}]} name="chevron-left" size={32} />

        );
    }
}
