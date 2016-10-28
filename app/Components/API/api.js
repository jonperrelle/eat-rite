'use strict'


import React, { Component, PropTypes } from 'react';
import {AsyncStorage} from 'react-native';
import {server} from '../../../server/env/development';
import Authentication from '../Authentication/authentication';
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

module.exports = {

	// loginUser (user) {
	// 	console.log(user);
	// 	return fetch(`http://${server.route}/auth/login`, {
	//         method: "POST",
	//         headers: myHeaders,
	//         mode: 'cors',
	//         cache: 'default',
	//         body: user
	//     })
	//     .then( response => response.json())
	//     .then( jsonData => {
	//       //modal to Check mark with successful, then back to home
	//       return jsonData
	//   	})
	//     .catch( error => console.log('Fetch error ' + error) );

	// },

	async setUserStorage (response) {
		try {
			await AsyncStorage.setItem('USER', JSON.stringify(response.user));
			await AsyncStorage.setItem('TOKEN', JSON.stringify(response.token));
			return response.user;
		} catch (error) {
			console.log('Error', error.message);
		}
	},

	logoutUser () {

	    return fetch(`http://${server.route}/auth/logout`, {
	        method: "GET",
	    })
	    .then( response => {
	      return AsyncStorage.removeItem('USER');
	    })
	    .then( response => {
	      return AsyncStorage.removeItem('TOKEN');
	    })
	    .catch( error => console.log('Fetch error ' + error) );

	},

	addFood (user, food) {

		return AsyncStorage.getItem('TOKEN')
		.then( token => {
			myHeaders.append('Authorization', `Bearer ${token}`)
			return fetch(`http://${server.route}/api/users/${user.id}/food`, {
		        method: "POST",
		        headers: myHeaders,
		        mode: 'cors',
		        cache: 'default',
		        body: JSON.stringify({food: food})
		    })
	    })
	    .then( response => response.json())
	    .then( jsonData => {
	    	user.food.push(jsonData);
	    	return AsyncStorage.mergeItem('USER', JSON.stringify(user));
	    })

	    .catch( error => console.log('Fetch error ' + error) );
	},

	editFood (user, newFood, oldFood) {

		return AsyncStorage.getItem('TOKEN')
		.then( token => {
			myHeaders.append('Authorization', `Bearer ${token}`)
			return fetch(`http://${server.route}/api/users/${user.id}/food`, {
		        method: "PUT",
		        headers: myHeaders,
		        mode: 'cors',
		        cache: 'default',
		        body: JSON.stringify({food: newFood, id: oldFood.id})
		    })
	    })
	    .then( response => response.json())
	    .then( jsonData => {
	    	user.food = user.food.filter( f => f.id !== oldFood.id );
	    	user.food.push(jsonData);
	    	return AsyncStorage.mergeItem('USER', JSON.stringify(user));
	    })

	    .catch( error => console.log('Fetch error ' + error) );
	},

	removeFood (user, food) {

		return AsyncStorage.getItem('TOKEN')
		.then( token => {
			myHeaders.append('Authorization', `Bearer ${token}`)

			return fetch(`http://${server.route}/api/users/${user.id}/food`, {
		        method: "DELETE",
		        headers: myHeaders,
		        mode: 'cors',
		        cache: 'default',
		        body: JSON.stringify({food: food})
		    });
	    })
	    .then( response => {
	    	if (response.status === 204) {
	    		user.food = user.food.filter(f => {
	    			return f.id !== food.id;
	    		})
	    		return AsyncStorage.mergeItem('USER', JSON.stringify(user));
	    	} else {
	    		return new Error('error deleting food');
	    	}
	    })
	    .catch( error => console.log('Fetch error ' + error) );

	}

	// getUserFoods: function (user) {

	//     fetch(`http://${server.route}/api/users/${user.id}`, {
	//       method: "POST",
	//       headers: myHeaders,
	//       mode: 'cors',
	//       cache: 'default',
	//       body: JSON.stringify({upc: e.data})
	//     })
	//       .then( response => response.json())
	//       .then( jsonData => {
	//         console.log('Here', jsonData);
	//         this.setState({isLoading: false})
	//       })
	//       .catch( error => console.log('Fetch error ' + error) );
	// }

}