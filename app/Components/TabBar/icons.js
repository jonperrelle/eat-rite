'use strict';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class AccountTabIcon extends Component {

	constructor(props) {
		super(props);
	}

    render(){
        return (
        	<View style={styles.tabBarContainer}>
        		<Icon style={[styles.tabBarIcon, {color: this.props.selected ? '#48afdb' :'#3a424c'}]} name="user" size={32} />
            	<Text style={[styles.tabBarText, {color: this.props.selected ? '#48afdb' :'#3a424c'}]}>{this.props.title}</Text>
            </View>
        );
    }
}

class ScannerTabIcon extends Component {

	constructor(props) {
		super(props);
	}

    render(){
        return (
        	<View style={styles.tabBarContainer}>
        		<Icon style={[styles.tabBarIcon, {color: this.props.selected ? '#48afdb' :'#3a424c'}]} name="barcode" size={32} />
            	<Text style={[styles.tabBarText, {color: this.props.selected ? '#48afdb' :'#3a424c'}]}>{this.props.title}</Text>
            </View>
        );
    }
}

export { AccountTabIcon, ScannerTabIcon }