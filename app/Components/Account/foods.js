'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, Modal, TextInput, View, TouchableOpacity, TouchableHighlight, Navigator, ListView} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import Scanner from '../Scanner/scanner';
import Ingredients from '../Ingredients/ingredients';
import Authentication from '../Authentication/authentication';
import NavBar from '../NavBar/NavBar';
import APIRoutes from '../API/api';
import Icon from 'react-native-vector-icons/FontAwesome';
const _ = require('lodash');
const t = require('tcomb-form-native');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

let Form = t.form.Form;
let AddFoodForm = t.struct({
  name: t.String,
  aversion: t.enums({
    Allergy: 'Allergy',
    Diet: 'Diet',
    Dislike: 'Dislike'
  }),
});

stylesheet.textbox.normal.width = 200;
stylesheet.pickerValue.normal.width = 200;
stylesheet.pickerValue.normal.borderWidth = 1;
stylesheet.pickerValue.normal.padding = 7;
stylesheet.pickerValue.normal.borderRadius = 4;
stylesheet.pickerValue.normal.borderColor = '#cccccc';
stylesheet.pickerValue.normal.color = '#cccccc';


let options = {
  auto: 'placeholders',
  stylesheet: stylesheet,
  fields: {
    aversion: {
      nullOption: {value: '', text: 'Select Aversion Type'}
    }
  }
};

class Foods extends Component {

  constructor(props, context) {
    super(props, context);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      modalVisible: false,
      user: props.user,
      food: props.user.food,
      dataSource: this.ds.cloneWithRows(this._getRowTitles())
    };
  }

  _getRowTitles () {
    console.log(this.props.user);
      if (this.props.user.food.length) return this.props.user.food;
      return [{name: 'No Foods Currently Listed', aversion: 'none'}];
  }

  _capitalizeRowData(name) {
    let nameArr = name.split(" ");
    return nameArr.map( n => {
      return n.substr(0,1).toUpperCase() + n.substr(1);
    }).join(" ");
  }

  _removeFood (rowData) {
    APIRoutes.removeFood(this.state.user, rowData)
      .then( () => {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.state.user.food)
        })
      })
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  _addFood() {
    let newFood = this.refs.form.getValue();
    APIRoutes.addFood(this.state.user, newFood)
      .then( () => {
        this.setState({
          dataSource: this.ds.cloneWithRows(this.state.user.food)
        })
      })
      .then( () => {
        this._setModalVisible(!this.state.modalVisible)
      });

  }

  _renderRow(rowData, sectionID, rowID) {
    return (

        <View style={styles.foodRow}>
          <Text style={styles.foodRowText}>
          {this._capitalizeRowData(rowData.name)}
          </Text>
          <TouchableOpacity
            onPress={this._removeFood.bind(this, rowData)}
          >
            <Icon style={styles.minusIcon} name="minus-circle" size={20}/>
          </TouchableOpacity>
        </View>

    );
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.foodRowSeparator}
      />
    );
  }

  _renderFooter () {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this._setModalVisible.bind(this, !this.state.modalVisible)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );

  }

  render() {

    return (
      <View style={styles.accountContainer}>
        <ListView
          style={styles.rowContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter.bind(this)}
        />
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
          <View style={styles.addFoodModalInnerContainer}>
            <Form
              ref="form"
              type={AddFoodForm}
              options={options}
              value={this.state.newFood}>
            ></Form>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={this._addFood.bind(this)}>
              <Text style={styles.buttonText}>Add Food</Text>
            </TouchableOpacity>

          </View>
         </View>
        </Modal>
      </View>
      );
  }

}

export default Foods;


