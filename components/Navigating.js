import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight, BackHandler} from 'react-native';

import SendSMS from 'react-native-sms-x';
import BackgroundTimer from 'react-native-background-timer';

import {Fonts} from './utils/Fonts';
import {GeneralStyles} from './utils/styles';

export default class Navigating extends Component{

  constructor(props){
    super(props);

    this.state = {
      lat: props.info.latitude,
      long: props.info.longitude,
      name: props.info.name,
      address: props.info.address,
      phone: props.info.phone
    }
  }

  componentDidMount(){
    this.startNavigating();
  }

  // Haversine formula. Stolen from stackoverflow.
  calculateDistance(lat1, lon1, lat2, lon2){
    let p = 0.017453292519943295;    
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  }

  startNavigating(){
    SendSMS.send(123, this.state.phone, "I'm on my way!", (msg)=>{});
    const interval = BackgroundTimer.setInterval(
      ()=>{
        try {
          navigator.geolocation.getCurrentPosition(
            (y) => {
              let soonMessageSent = false;
              let hereMessageSent = false;
              let distance = this.calculateDistance(y.coords.latitude, y.coords.longitude, this.state.lat, this.state.long);
              console.log('tic');
              if(!soonMessageSent && distance <= 0.35){
                soonMessageSent = true;
                SendSMS.send(123, this.state.phone, "I'll be here soon!", (msg)=>{ console.log(msg) });
              }
              if(!hereMessageSent && distance <= 0.1){
                hereMessageSent = true;
                SendSMS.send(123, this.state.phone, "I'm outside!", (msg)=>{ this.terminateApp(); });
              }
            },
            (err) => console.log(err),
            { enableHighAccuracy: true, timeout: 60000, maximumAge: 2000}
          );
        } catch (err) {
          console.warn(err);
        }
      }, 2000
    );
    this.setState({intervalTimer: interval});
  }

  terminateApp(){
    BackgroundTimer.clearInterval(this.state.intervalTimer);
    this.props.pressFunc();
    BackHandler.exitApp();
  }

  cancelNavigating = () => {
    BackgroundTimer.clearInterval(this.state.intervalTimer);
    this.props.pressFunc();
  }

  render(){
    return(
      <View style={styles.wrapperStyle}>
        <Text style={styles.textBig}>
            We can do this in the background. Safe travels!
        </Text>
        <TouchableHighlight
        style={[GeneralStyles.buttonWrapperStyle, {marginTop: 70}]}
        underlayColor='rgba(0,0,0,0.1)'
        onPress = {this.cancelNavigating}>
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

