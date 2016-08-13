/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Image,
  TouchableHighlight
} from 'react-native';

import FCM from 'react-native-fcm';

// const firebase = require("firebase");

var ImagePicker = require('react-native-image-picker');

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBj4uirFNsfy_YDLOai-O3rvHM1XwzQ8wk",
//   authDomain: "roadtofreedom-aea63.firebaseapp.com",
//   databaseURL: "https://roadtofreedom-aea63.firebaseio.com",
//   storageBucket: "roadtofreedom-aea63.appspot.com",
// };

// firebase.initializeApp(firebaseConfig);
// const rootRef = firebase.database().ref();
// const itemsRef = rootRef.child('spottings');


class animalGo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });

    FCM.subscribeToTopic('/topics/foo-bar');
    FCM.unsubscribeFromTopic('/topics/foo-bar');
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  showImagePicker() {

    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        console.log(source);

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  reportIncident() {

  }

  render() {
    return (
      <View style={styles.mainContainer}>

      <Text style={styles.titleText}>
       דווח על בעל חיים בסכנה
      </Text>


        <Text style={styles.titleLabel}>
          תיאור:
        </Text>

        <TextInput
        style={styles.textEdit}
        onChangeText={(text) => this.setState({text})}
        placeholder="תיאור"
        />

        <TouchableHighlight
        style={styles.button}
        onPress={this.showImagePicker.bind(this)}>
          <View>
            <Text style={styles.buttonText}>הוסף תמונה</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={this.reportIncident.bind(this)}>
          <View>
            <Text style={styles.buttonSend}>שלח דיווח</Text>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#e71d32',
  },
  titleText:{
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 30,
    margin: 10,
  },
  titleLabel:{
    color: '#ffffff',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#0d1111',
  },
  buttonText: {
    fontSize: 30,
    color: '#ffffff',
  },
  buttonSend: {
    fontSize: 30,
    color: '#ffffff',
  },
  uploadAvatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textEdit: {
    alignSelf: 'stretch',
    color: '#ffffff',
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('animalGo', () => animalGo);
