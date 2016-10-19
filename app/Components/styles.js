'use strict';

import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeButton: {
    height: 100,
    width: 100,
    backgroundColor: '#F5F5F5',
    margin: 10,
  },
  homeButtonText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});