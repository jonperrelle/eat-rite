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
    backgroundColor: '#F5F5F5',
    marginTop: windowHeight * 2/10,

  },
  authHeading: {
    fontSize: 40,
    color: '#48afdb',
    fontFamily: 'PingFang SC',
    fontWeight: "900",
    marginTop: 20,
    textAlign: 'center',
  },
   authButton: {
    height: 70,
    width: 200,
    borderColor: '#48afdb',
    borderWidth: 2,
    margin: 10,
    justifyContent: 'center'
  },
  authButtonText: {
    textAlign: 'center',
    color: '#48afdb',
    marginBottom: 5,
    fontSize: 16,
    marginHorizontal: 5,
  },
  authSubHeading: {
    textAlign: 'center',
    width: windowWidth * .8,
    fontSize: 20,
    fontWeight: '700',
    color: '#48afdb',
    fontFamily: 'PingFang SC',
    marginTop: 20,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#F5F5F5',
    height: 60,
  },
  tabBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tabBarIcon: {
    textAlign: 'center',
    marginBottom: 3
  },
  tabBarText: {
    fontSize: 14,
  },
  navBar: {
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 0,
  },
  navBarText: {
    color: '#48afdb',
    fontSize: 20,
    marginTop: -5,
  },
  navBarIcon: {
    tintColor: '#48afdb',
    paddingHorizontal: 5,
    marginTop: -5,
  },
  accountContainer: {
    flex: 1,
    backgroundColor: '#48afdb',
    paddingBottom: 60,
  },
  rowContainer: {
    flex: 1,
    marginTop: 80,
    marginHorizontal: 20,
  },
  accountRow: {
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#F5F5F5',
  },
  rowText: {
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    color: '#48afdb',
  },
  accountRowSeparator: {
    backgroundColor: '#48afdb',
    height: 2,
  },
  foodRow: {
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
  foodRowHeader: {
    fontSize: 24,
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 10,
  },
  foodRowText: {
    fontSize: 20,
    flex: 1,
    color: '#48afdb',
  },
  foodRowSeparator: {
    backgroundColor: '#48afdb',
    height: 1,
  },
  foodSectionHeaderContainer: {
    backgroundColor: '#dddddd',
  },
  foodSectionHeaderText: {
    padding: 8,
    color: '#48afdb',
    fontWeight: '700',
    fontSize: 24,
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
    padding: 30,
    backgroundColor: '#F5F5F5'
  },
  footerButton: {
    height: 50,
    borderColor: '#48afdb',
    borderWidth: 2,
    marginHorizontal: 20,
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
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  addFoodFormContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  addFoodButton: {
    height: 50,
    borderColor: '#48afdb',
    borderWidth: 2,
    marginHorizontal: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  scannerInnerContainer: {
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  aversionDetailsContainer: {
    flex: 1,
    backgroundColor: '#48afdb',
    paddingBottom: 40,
  },
  aversionDetailsRowContainer: {
    flex: 1,
    marginTop: 80,
    marginHorizontal: 20,
  },
  aversionDetailsHeadingContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#F5F5F5'
  },
  aversionDetailsHeading: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: '700',
    color: '#48afdb',
    textAlign: 'center',
  },
  aversionDetailsSubHeading: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  aversionDetailsRow: {
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  aversionDetailsRowHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#48afdb',
    paddingVertical: 5,
    textAlign: 'center',
  },
  aversionDetailsRowText: {
    fontSize: 14,
  },
  aversionDetailsSeparator: {
    backgroundColor: '#CCCCCC',
    height: 1,
  }


});