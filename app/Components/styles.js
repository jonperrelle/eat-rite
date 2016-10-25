'use strict';

import {
  StyleSheet, Dimensions
} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  bgImageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#48afdb',
    marginTop: windowHeight * 2/10,
  },
  authHeading: {
    fontSize: 40,
    color: '#F5F5F5',
    fontFamily: 'PingFang SC',
    fontWeight: "900",
    marginTop: 20,
    textAlign: 'center',
  },
   authButton: {
    height: 70,
    width: 200,
    borderColor: '#F5F5F5',
    borderRadius: 35,
    borderWidth: 2,
    margin: 10,
    justifyContent: 'center'
  },
  authButtonText: {
    textAlign: 'center',
    color: '#F5F5F5',
    marginBottom: 5,
    fontSize: 20,
    marginHorizontal: 5,
  },
  authSubHeading: {
    textAlign: 'center',
    width: windowWidth * .8,
    fontSize: 16,
    color: '#F5F5F5',
    fontFamily: 'PingFang SC',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#48afdb',
  },
  scannerContainer: {
    backgroundColor: 'transparent'
  },
  navBar: {
    backgroundColor: '#F5F5F5',
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarText: {
    color: '#48afdb',
    fontSize: 20,
  },
  navIcon: {
    color: '#48afdb',
    paddingHorizontal: 5,
    marginTop: -5,
  },
  anchor: {
    marginTop: 10,
  },
  anchorText: {
    fontSize: 14,
    color: '#FF5722',
    fontFamily: 'PingFang SC',
    textDecorationLine: 'underline',
  },
  accountContainer: {
    flex: 1,
    backgroundColor: '#48afdb',
    paddingBottom: 40,
  },
  rowContainer: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 20,
  },
  accountRow: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  rowText: {
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    color: '#48afdb',
  },
  accountRowSeparator: {
    backgroundColor: '#48afdb',
    height: 10,
  },
  foodRow: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
  },
  foodRowText: {
    fontSize: 20,
    flex: 1,
    color: '#48afdb',
  },
  foodRowSeparator: {
    backgroundColor: '#48afdb',
    height: 5,
  },
  plusIcon: {
    color: 'green',
  },
  minusIcon: {
    color: 'red',
    paddingHorizontal: 10,
  },
  allowedIcon: {
    color:'#41e272',
    textAlign:'center'
  },
  notAllowedIcon: {
    color:'#f93e3e',
    textAlign:'center'
  },
  closeModalButton: {
    flex: 1,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    color: '#CCCCCC',
  },
  scannerModalText: {
    textAlign: 'center',
    fontSize: 24,
    flex: 1,
    color: '#48afdb',
    paddingVertical: 10,
  },
  scannerModalButton: {
    height: 60,
    borderColor: '#48afdb',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  scannerModalButtonText: {
    fontSize: 20,
    color: '#48afdb',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#48afdb',
    padding: 20,
  },
  footerButton: {
    height: 50,
    borderColor: '#48afdb',
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#48afdb',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  addFoodModalInnerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  scannerInnerContainer: {
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
  }


});