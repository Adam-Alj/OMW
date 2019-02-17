import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableHighlight, StyleSheet} from 'react-native';

import {Fonts} from './utils/Fonts';
import {GeneralStyles} from './utils/styles';

export default class PermissionsPage extends Component{

  render() {
    return (
      <View style={styles.wrapperStyle}>
        <Text style={[styles.textBig, {marginTop: 70}]}>
          Hey, we need some permissions to do our work!
        </Text>
        <View style={styles.textWrapperStyle}>
          <Text style={[styles.textBig, {textAlign: 'left'}]}>
            SMS:
          </Text>
          <Text style={styles.textSmall}>
            We need to be able to send your friends text messages while you're driving, so that they
            know when they should be outside waiting.
          </Text>
          <Text style={[styles.textBig, {textAlign: 'left', marginTop: 15}]}>
            Location:
          </Text>
          <Text style={styles.textSmall}>
            We need to keep track of your location while you're on your way to pick up a friend, so that 
            we can let them know exactly when to come outside.
          </Text>
        </View>
        <TouchableHighlight
          underlayColor='rgba(0,0,0,0.1)'
          onPress={this.props.reqFunc}
          style={GeneralStyles.buttonWrapperStyle}>
          <Text style={GeneralStyles.buttonTextStyle}>
            GIVE PERMISSION
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 25,
    flex: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    },
  textWrapperStyle: {
    width: '90%',
    marginTop: 70,
    marginBottom: 70
  },
  textBig: {
    fontSize: 18,
    fontFamily: Fonts.BarlowMed
  },
  textSmall: {
    fontFamily: Fonts.BarlowMed
  }
});

AppRegistry.registerComponent('PermissionsPage', () => PermissionsPage);

