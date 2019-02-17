import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text, TextInput, TouchableHighlight, AsyncStorage} from 'react-native';

import {getLocalData} from './utils/helpers';
import {GeneralStyles} from './utils/styles';

export default class AddFriendInterface extends Component{

  state = {
    name: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    formattedAddress: "",
    addressResolved: false,
    checkingAddress: false
  }

  // The worst 'hashing' function ever
  generateKey(){
    let key = 0;
    for(var i = 0; i < this.state.name.length; i++){
      key += this.state.name.charCodeAt(i);
    }
    for(var j=0; j<this.state.address.length; j++){
      key -= this.state.address.charCodeAt(j);
    }
    key = key*this.state.phone.charCodeAt(this.state.phone.length - 1);

    this.setState({key: key});
  }

  /*
    TODO:  - ensure phone # has only digits.
           - contact import?
  */
  async addFriend(){
    if (this.state.name == "") {
      alert("Please enter your friends name.");
    } else if (this.state.phone == "") {
      alert("Please enter your friends phone number.");
    } else if (this.state.formattedAddress == "" || !this.state.addressResolved){
      alert("Please enter and check your friends address.");
    } else {
      this.generateKey();
      let data = await getLocalData();
      data.push(this.state);
      await AsyncStorage.setItem('friendsData', JSON.stringify(data)).then(
        this.props.pressFunc
      );
    }
  }

  async fetchLocation() {
    if (this.state.address != "") {
      if (!this.state.checkingAddress) {
        try {
          this.setState({ formattedAddress: "Checking...", checkingAddress: true });
          await navigator.geolocation.getCurrentPosition(
            (curLocation) => {
              let location = curLocation.coords.latitude + ',' + curLocation.coords.longitude;
              //console.log(location)
              fetch('https://api.opencagedata.com/geocode/v1/json?q=' + encodeURI(this.state.address) + '&key= YOUR KEY HERE &pretty=1&no_annotations=1&proximity=' + location).then(
                (response) => {
                    let result = JSON.parse(response._bodyInit);
                    //console.log(result);

                    if (result.results.length > 0) {
                      this.setState({ formattedAddress: result.results[0].formatted, addressResolved: true, checkingAddress: false });
                      this.setState({ latitude: result.results[0].geometry.lat, longitude: result.results[0].geometry.lng });
                      //console.log(this.state.formattedAddress);
                      //console.log(this.state.latitude + ',  ' + this.state.longitude);
                    } else {
                      this.setState({checkingAddress: false});
                      alert("Sorry, we couldn't find that address. Try being more specific!");
                    }
                }
              ).catch((error)=> {
                this.setState({formattedAddress: "There seems to have been a connection problem.\n\nTry again!", checkingAddress: false});
              });
            },
            (err) => console.log(err),
            { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 }
          );
        } catch (err) {
          console.warn(err);
        }
      }
    } else {
      alert("Please enter an address for us to check!");
    }
  }

  render(){
    return(
        <View>
            <View style={styles.wrapperStyle}>
                <TextInput 
                  placeholder="Name" 
                  style={GeneralStyles.textInputStyle}
                  onChangeText = {(text) => this.setState({name: text})}
                >
                </TextInput>
                <TextInput 
                  placeholder="Phone number" 
                  style={GeneralStyles.textInputStyle}
                  onChangeText = {(text) => this.setState({phone: text})}
                >
                </TextInput>
                <TextInput 
                  placeholder="Pickup address      (Address, City, Country)" 
                  style={[GeneralStyles.textInputStyle, {marginBottom: 70}]}
                  onChangeText = {(text) => this.setState({address: text})}
                >
                </TextInput>
                <Text>
                  Make sure to check the address.
                </Text>
                <TouchableHighlight 
                style={[GeneralStyles.buttonWrapperStyle, {marginBottom: 50, marginTop: 3}]} 
                underlayColor='rgba(0,0,0,0.1)' 
                onPress={()=>this.fetchLocation()}> 
                  <Text style={GeneralStyles.buttonTextStyle}>
                    CHECK ADDRESS
                  </Text>
                </TouchableHighlight>
                <Text style={styles.addressFontStyle}>
                  {this.state.formattedAddress}
                </Text>
                <TouchableHighlight 
                style={[GeneralStyles.buttonWrapperStyle, {width: 200, marginTop: 70}]} 
                underlayColor='rgba(0,0,0,0.1)' 
                onPress={()=>this.addFriend()}> 
                  <Text style={[GeneralStyles.buttonTextStyle, {fontSize: 40, paddingBottom: 7}]}>
                    ADD
                  </Text>
                </TouchableHighlight>
            </View>
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
  nameInputStyle: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    width: '85%'
  },
  phoneInputStyle: {
    marginBottom: 40,
    backgroundColor: 'gray',
    width: '85%'
  },
  addressInputStyle: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'gray',
    width: '85%'
  },
  addressFontStyle: {
    fontSize: 15
  }
});

AppRegistry.registerComponent('AddFriendInterface', () => AddFriendInterface);

