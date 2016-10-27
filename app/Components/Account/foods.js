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
    aversion: {
      nullOption: {value: '', text: 'Select Aversion Type'}
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
      user: props.user,
      food: props.user.food,
      dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    };
  }

  // _getRowData (dataBlob, sectionID, rowID) {
  //   return dataBlob[sectionID + ':' + rowID];
  // }

  // _getSectionData (dataBlob, sectionID, rowID) {
  //   return dataBlob[sectionID];
  // }

  _getRowTitles () {
    console.log(this.props.user.food);
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
        let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(this.state.user.food);
        this.setState({
          dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      });
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _addFood() {
    let newFood = this.refs.form.getValue();
    APIRoutes.addFood(this.state.user, newFood)
      .then( (data) => {
        let {dataBlob, sectionIDs, rowIDs} = Util.formatFoodData(this.state.user.food);
        this.setState({
          dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
      })
      .then( () => {
        this._setModalVisible(!this.state.modalVisible);
      });

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

  _renderHeader () {
    return (
      <View>
        <Text style={styles.foodRowHeader}>Your Food Aversions</Text>
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
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={this._setModalVisible.bind(this, !this.state.modalVisible)}
        >
          <Text style={styles.buttonText}>Add More</Text>
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
          renderHeader={this._renderHeader}
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
                onPress={this._setModalVisible.bind(this, !this.state.modalVisible)}>
                <Icon style={styles.closeIcon} name="times" size={32} />
              </TouchableOpacity>
            </View>
            <View style={styles.addFoodFormContainer}>
              <Form
                ref="form"
                type={AddFoodForm}
                options={options}
                value={this.state.newFood}>
              ></Form>
            </View>
            <TouchableOpacity
              style={styles.addFoodButton}
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


