import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

import {Fonts} from './utils/Fonts';

export default class Header extends Component{

  render(){
    return(
      <View style={styles.wrapperStyle}>
        <Text style={styles.logoText}>
            O M W
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    height: 75,
    marginBottom: 15
  },
  logoText: {
    color: 'black',
    fontSize: 70,
    textAlign: 'center',
    letterSpacing: 10,
    fontFamily: Fonts.BarlowLight
  }
});

AppRegistry.registerComponent('Header', () => Header);

