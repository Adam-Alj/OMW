import {AsyncStorage, PermissionsAndroid} from 'react-native';

export async function getLocalData(){
    try {
        let friendsData = await AsyncStorage.getItem('friendsData');
        return (friendsData = friendsData == null ? null : JSON.parse(friendsData));
    } catch (error) {
        console.log(error);
    }
}

export async function getStateData(){
  try {
      let stateData = await AsyncStorage.getItem('stateData');
      return (stateData = stateData == null ? null : JSON.parse(stateData));
  } catch (error) {
      console.log(error);
  }
}

export async function requestSMSPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS
      );
      return granted;
    } catch (err) {
      console.warn(err);
    }
  }

  async function getLocation(){
    try {
      await navigator.geolocation.getCurrentPosition(
        (x) => {},
        (err) => console.log(err),
        { enableHighAccuracy: true, timeout: 60000}
      );
    } catch (err) {
      console.warn(err);
    }
  }

export async function checkAllPermissions(){
  try{
    const smsGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.SEND_SMS).then((v)=>{return v});
    const fineLocationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((v)=>{return v});
    const coarseLocationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((v)=>{return v});

    //console.log('sms: ' + smsGranted + '\nfine loc: ' + fineLocationGranted + '\ncoarse loc: ' + coarseLocationGranted);
    return(smsGranted && fineLocationGranted && coarseLocationGranted);
  
  } catch(error){
    console.log(error);
  }
}

export async function requestAllPermissions(){
  try{
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    ]).then(() => {
      // Need to use this to grab permissions since PermissionsAndroid is scuffed for location...
      getLocation();
    });
  }catch(error){
    console.log(error);
  }
}
/*
export async function checkSMSPermission(){
  try{
    const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.SEND_SMS).then((v)=>{return v});
    return granted;
  } catch(error){
    console.log(error);
  }
}*/