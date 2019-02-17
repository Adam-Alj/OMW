import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableHighlight} from 'react-native';

import {AddFriendStyles} from './utils/styles';

export default class AddFriend extends Component{

  render(){
    return(
        <View style={AddFriendStyles.wrapperStyle}>
            <TouchableHighlight 
            style={AddFriendStyles.touchStyle}
            underlayColor='rgba(0,0,0,0.1)'
            onPress={this.props.pressFunc}>
                <View>
                    <View style={AddFriendStyles.box1}>
                        <Text style={AddFriendStyles.plusIcon}>
                            +
                        </Text>
                    </View>
                    <View style={AddFriendStyles.box2}>
                        <Text style={AddFriendStyles.botText}>
                            Add a Friend
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={AddFriendStyles.box2}>
                <Text style={AddFriendStyles.lightText}>
                    Press and hold to delete a friend.
                </Text>
            </View>
        </View>
    );
  }
}

AppRegistry.registerComponent('AddFriend', () => AddFriend);

