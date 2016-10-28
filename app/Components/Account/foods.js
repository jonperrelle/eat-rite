'use strict';

import React, { Component, PropTypes } from 'react';
import {Text, Dimensions, Modal, TextInput, View, TouchableOpacity, TouchableHighlight, Navigator, ListView} from 'react-native';
import store from 'react-native-simple-store';
import styles from '../styles';
import APIRoutes from '../API/api';
import Util from '../Util/util';
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

let windowWidth = Dimensions.get('window').width;

stylesheet.textbox.normal.width = windowWidth * .5;
stylesheet.textbox.normal.minWidth = 200;
stylesheet.textbox.normal.maxWidth = 400;
stylesheet.pickerTouchable.normal.height = 28;


let options = {
  auto: 'placeholders',
  stylesheet: stylesheet,
  fields: {
    name: {
      placeholder: 'Enter Food Name'
    },
    aversion: {
      nullOption: {value: '', text: 'Select Restriction Type'}
    }
  }
};

class Foods extends Component {

  constructor(props, context) {
    super(props, context);

    let getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    let getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData
    });
    let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(props.user.food);
    this.state = {
      modalVisible: false,
      modalButtonText: 'Add Food',
      user: props.user,
      food: props.user.food,
      dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    };
  }

  _capitalizeRowData(name) {
    let nameArr = name.split(" ");
    return nameArr.map( n => {
      return n.substr(0,1).toUpperCase() + n.substr(1);
    }).join(" ");
  }

  _openModal(visible, type) {
    this.setState({modalVisible: visible});
    let text = type === 'add' ? 'Add Food' : 'Edit Food';
    this.setState({modalButtonText: text});
  }

  _editFoodModal (rowData) {
    this.setState({addedFood: {id: rowData.id, name: rowData.name, aversion: rowData.aversion}});
    this._openModal.call(this, !this.state.modalVisible, 'edit');

  }

  _addOrEditFood() {
    let food = this.refs.form.getValue();
    if (this.state.modalButtonText === 'Add Food') {
      this._addFood.call(this, food);
    } else {
      this._editFood.call(this, food, this.state.addedFood)
    }
  }

  _addFood(food) {

    APIRoutes.addFood(this.state.user, food)
      .then( (data) => {
        let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(this.state.user.food);
        this.setState({
          dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      })
      .then( () => {
        this._openModal(!this.state.modalVisible);
      });

  }

  _editFood(newFood, oldFood) {

    APIRoutes.editFood(this.state.user, newFood, oldFood)
      .then( (data) => {
        let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(this.state.user.food);
        this.setState({
          dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      })
      .then( () => {
        this._openModal(!this.state.modalVisible);
      });

  }

  _removeFood (rowData) {
    APIRoutes.removeFood(this.state.user, rowData)
      .then( () => {
        let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(this.state.user.food);
        return this.setState({
          dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      })
      .then( () => {
        this.setState({modalVisible: false});
      })
  }

  _renderSectionHeader (sectionData) {
    return (

        <View style={styles.foodSectionHeaderContainer}>
          <Text style={styles.foodSectionHeaderText}>
            {sectionData.character}
          </Text>
        </View>

    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return (

        <View style={styles.foodRow}>
          <TouchableOpacity
            onPress={this._editFoodModal.bind(this, rowData)}
          >
            <Text style={styles.foodRowText}>
              {this._capitalizeRowData(rowData.name)}
            </Text>
          </TouchableOpacity>
        </View>

    );
  }



  _renderHeader () {

    let text = this.props.user.food.length ? 'Your Food Restrictions' : 'You Have No Food Restrictions';

    return (
      <View>
        <Text style={styles.foodRowHeader}>{text}</Text>
      </View>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={rowID}
        style={styles.foodRowSeparator}
      />
    );
  }

  _renderFooter () {

    let text = this.props.user.food.length ? 'Add More' : 'Add Restriction';

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this._openModal.bind(this, !this.state.modalVisible, 'add')}
        >
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
    );

  }

  _renderModalButtons () {
    if (this.state.modalButtonText === 'Edit Food') {
      return (
        <View style={styles.foodModalButtonsContainer}>
          <TouchableOpacity
            style={styles.editFoodButton}
            onPress={this._addOrEditFood.bind(this)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.removeFoodButton}
            onPress={this._removeFood.bind(this, this.state.addedFood)}>
            <Text style={styles.removeButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.addFoodButton}
          onPress={this._addOrEditFood.bind(this)}>
          <Text style={styles.buttonText}>{this.state.modalButtonText}</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {

    return (
      <View style={styles.accountContainer}>
        <ListView
          style={styles.rowContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)}
          renderSeparator={this._renderSeparator}
          renderFooter={this._renderFooter.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
        />
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
          <View style={styles.addFoodModalInnerContainer}>
            <View style={styles.closeModalButton}>
              <TouchableOpacity
                onPress={this._openModal.bind(this, !this.state.modalVisible)}>
                <Icon style={styles.closeIcon} name="times" size={32} />
              </TouchableOpacity>
            </View>
            <View style={styles.addFoodFormContainer}>
              <Form
                ref="form"
                type={AddFoodForm}
                options={options}
                value={this.state.addedFood}>
              ></Form>
            </View>
            {this._renderModalButtons.call(this)}
          </View>
         </View>
        </Modal>
      </View>
      );
  }

}

export default Foods;


