/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, Animated } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

class animalGo extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
                            // Start the animation
  }


  renderLoading() {
    return (
        <Image source={require('./images/splash.jpg')} style={styles.container}>


          <MyButton color="blue">
            </MyButton>

          <View style={styles.loader}>
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}
            />
          <Image  source={require('./images/animal1.png')} style={styles.animal}>
          </Image>
            </View>

        </Image>);
  }

  showImagePicker() {

    var options = {
      title: 'דווח מיקום',
      customButtons: {

      },
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React SOS!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>

        <TouchableHighlight
        style={styles.button}
        onPress={this.showImagePicker.bind(this)}>
        <View>
          <Text style={styles.buttonText}>Button!</Text>
        </View>
      </TouchableHighlight>

      <Image source={this.state.avatarSource} style={styles.uploadAvatar} />


      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: null,
      height: null,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems:'stretch',
      resizeMode: 'cover',

  },
  loader: {
      alignItems:'center',
    margin:30,
  },
  animal: {
      width:100,
    height:100,
    transform: [
      {scale: 1},
    ]
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 30,
  },
  uploadAvatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  }
});

AppRegistry.registerComponent('animalGo', () => animalGo);



