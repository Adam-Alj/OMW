import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, ScrollView, BackHandler, Alert} from 'react-native';


import {getLocalData, getStateData} from './utils/helpers';

import FriendContainer from './FriendContainer';
import AddFriend from './AddFriend';
import AddFriendInterface from './AddFriendInterface';
import Navigating from './Navigating';
import BackupNavPage from './BackupNavPage';

export default class Content extends Component{
  
  constructor(props) {
    super(props);
    // page 1 = main page
    // page 2 = add friend page
    // page 3 = navigation page
    this.state = {
      page: 1,
      loading: true,
      callingChildState: ""
    }
  }

  updateFriends = async () =>{
    let data = await getLocalData();
    if (data == null) {
      AsyncStorage.setItem('friendsData', JSON.stringify([]));
      this.setState({ friends: [], loading: false });
    } else {
      this.setState({ friends: data, loading: false });
    }
  }

  updateState = async () =>{
    let data = await getStateData();
    
    if(data.navigating && !data.cleanExit){
      this.setState({page: 4});
    }
  }

  deleteFriend(retval){
    Alert.alert(
      'Remove ' + retval.name + '?',
      '',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'OK', onPress: () => {
          AsyncStorage.setItem('friendsData', JSON.stringify(this.state.friends.filter((friend) => {
            return friend.key != retval.id
          }))).then(
            this.updateFriends()
          );
        }},
      ],
      {cancelable: true},
    );
  }

  openNavigation(childState){
    this.setState({callingChildState: childState, page: 3});
    AsyncStorage.setItem('stateData', JSON.stringify({navigating: true, cleanExit: false}));
  }

  // Handles loading/initialization of stored Friend data
  componentDidMount(){

    // clear for debug
    //AsyncStorage.clear();
    
    this.updateFriends();
    this.updateState().then(()=>console.log(this.state));

    BackHandler.addEventListener('hardwareBackPress',
      () => {
        switch (this.state.page) {
          case 1:
            return false;
          case 2:
            this.setState({ page: 1 });
            this.updateFriends();//.then(()=>console.log(this.state.friends));
            return true;
          case 3:
            return true;
        }
      });
  }

  navToAddFriend(){
    this.setState({page: 2});
  }

  navToHome(){
    this.updateFriends();//.then(()=>console.log(this.state.friends));
    this.setState({page: 1});
  }

  render(){
    if(this.state.page == 1){
      return(
        <ScrollView style={{marginBottom: 100}}>
          <FriendContainer loading={this.state.loading} friends={this.state.friends} navReturn = {(retval) => this.openNavigation(retval)} deleteFriend = {(ret)=> this.deleteFriend(ret)}/>  
          <AddFriend pressFunc = {() => this.navToAddFriend()}/>
        </ScrollView>
      );
    } else if(this.state.page == 2){
      return(
        <AddFriendInterface pressFunc = {() => this.navToHome()}/>
      );
    } else if(this.state.page == 3){
      return(
        <Navigating info={this.state.callingChildState} pressFunc = {() => this.navToHome()}/>
      );
    } else {
      return(
        <BackupNavPage />
      );
    }
  }
}

AppRegistry.registerComponent('Content', () => Content);

