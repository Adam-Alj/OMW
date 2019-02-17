import {StyleSheet} from 'react-native';
import {Fonts} from './Fonts';

const AddFriendStyles = StyleSheet.create({
    wrapperStyle: {
        marginTop: 25,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50
    },
    touchStyle: {
        borderRadius: 50,
        width: 100,
        height: 100,
        flex: 0,
        justifyContent: 'center'
    },
    plusIcon: {
        fontSize: 50
    },
    box1: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box2: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    botText: {
        fontFamily: Fonts.BarlowMed
    },
    lightText: {
        fontFamily: Fonts.BarlowLight
    }
  });

  const FriendStyles = StyleSheet.create({
    wrapperStyle: {
        marginTop: 5,
        backgroundColor: 'rgb(220,220,220)',
        flex: 0,
        flexDirection: 'column'
    },
    box1: {
        height: 55,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },
    box2: {
        height: 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    nameText: {
        fontFamily: Fonts.BarlowMed,
        color: 'black',
        fontSize: 30,
        marginLeft: 20
    },
    addressText: {
        fontFamily: Fonts.BarlowLightItalic,
        color: 'black',
        fontSize: 20,
        marginRight: 15
    }
  });

  const FriendContainerStyles = StyleSheet.create({
    container: {
        flex: 1
    }
  });

  const GeneralStyles = StyleSheet.create({
    buttonWrapperStyle: {
        borderColor: 'black',
        borderWidth: 1
    },
    buttonTextStyle: {
        textAlign: 'center',
        fontFamily: Fonts.BarlowMed,
        fontSize: 24,
        letterSpacing: 2,
        paddingBottom: 2,
        paddingLeft: 3,
        paddingRight: 3
    },
    textInputStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderLeftColor: 'black',
        borderLeftWidth: 1,
        width: '85%'
    }
  });



  export {AddFriendStyles, FriendStyles, FriendContainerStyles, GeneralStyles};