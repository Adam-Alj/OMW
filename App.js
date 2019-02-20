import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';

import { checkAllPermissions, requestAllPermissions} from './components/utils/helpers';

import Header from './components/Header';
import Content from './components/Content';
import PermissionsPage from './components/PermissionsPage';
import StartupPage from './components/StartupPage';

export default class App extends Component {

  state = {
    permissionsGranted: false,
    initializing: true
  }

  startupTimeout(){
    setTimeout(() => {
      this.setState({initializing: false});
    }, 2000);
  }

  requestPermissions(){
    requestAllPermissions().then(() => {
      checkAllPermissions().then((retVal) => {
        if(retVal){
          this.setState({permissionsGranted: true});
        }
      })
    });
  }

  componentDidMount(){
    checkAllPermissions().then((retVal) => {
      this.startupTimeout();
      //console.log( '1' + retVal);
      if(retVal){
        this.setState({permissionsGranted: true});
      }
    });
  }

  componentWillUnmount(){
    console.log('APP UNMOUNTING!!!!!!!!!!!!!!!!');
  }

  render() {
    if (this.state.initializing) {
      return (
        <StartupPage />
      );
    } else {
      if (this.state.permissionsGranted) {
        return (
          <View>
            <Header />
            <Content />
          </View>
        );
      } else {
        return (
          <View>
            <Header />
            <PermissionsPage reqFunc={()=>this.requestPermissions()}/>
          </View>
        );
      }
    }
  }
}

AppRegistry.registerComponent('App', ()=>App );