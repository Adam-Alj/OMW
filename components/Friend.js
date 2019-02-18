import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {FriendStyles} from './utils/styles';

export default class Friend extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.friendName,
            address: this.props.friendAddress,
            phone: this.props.friendNumber,
            latitude: this.props.latitude,
            longitude: this.props.longitude
        }
    }
  render(){
    return(
        <View>
            <TouchableOpacity style={FriendStyles.wrapperStyle} onPress={()=>this.props.sendState(this.state)} onLongPress={()=>{this.props.deleteFlag(this.state)}} delayLongPress={500}>
                <View style={FriendStyles.box1}>
                    <Text style={FriendStyles.nameText}>
                        {this.props.friendName}
                    </Text>
                </View>
                <View style={FriendStyles.box2}>
                    <Text style={FriendStyles.addressText}>
                        {this.props.friendAddress}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}

AppRegistry.registerComponent('Friend', () => Friend);

