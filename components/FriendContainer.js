import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import SendSMS from 'react-native-sms-x';

import Friend from './Friend';

import {FriendContainerStyles} from './utils/styles';


export default class FriendContainer extends Component{


  render(){
    if(this.props.loading){
      return(
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      );
    } else {
      return(
        <View style={FriendContainerStyles.container}>
          {this.props.friends.map(friend => <Friend key={friend.key} 
          id={friend.key} 
          friendName = {friend.name} 
          friendAddress = {friend.address} 
          friendNumber = {friend.phone}
          latitude = {friend.latitude}
          longitude = {friend.longitude}
          sendState = {(retval) => this.props.navReturn(retval)}
          deleteFlag = {(retval) => this.props.deleteFriend(retval)}
          />)}
        </View>
      );
    }
  }
}
AppRegistry.registerComponent('FriendContainer', () => FriendContainer);

