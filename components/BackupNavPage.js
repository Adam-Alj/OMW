import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight, BackHandler, AsyncStorage} from 'react-native';

import {Fonts} from './utils/Fonts';
import {GeneralStyles} from './utils/styles';

export default class Navigating extends Component{

  terminateApp(){
    AsyncStorage.setItem('stateData', JSON.stringify({navigating: false, cleanExit: true})).then( () => {
      BackHandler.exitApp();
    });
  }

  render(){
    return(
      <View style={styles.wrapperStyle}>
        <Text style={styles.textBig}>
            We can do this in the background. Safe travels!
        </Text>
        <Text style={styles.textBig}>
            We can do this in the background. Safe travels!
        </Text>
        <TouchableHighlight
        style={[GeneralStyles.buttonWrapperStyle, {marginTop: 70}]}
        underlayColor='rgba(0,0,0,0.1)'
        onPress = {this.terminateApp}>
          <Text style={GeneralStyles.buttonTextStyle}>
            CANCEL
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    marginTop: 0,
    flex: 0,
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'
    },
  textBig: {
    fontSize: 18,
    fontFamily: Fonts.BarlowMed
  }
});

AppRegistry.registerComponent('Navigating', () => Navigating);

