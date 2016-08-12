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
  View,
  Image
} from 'react-native';

import LoadingScreen from './screens/screen.loading'

class animalGo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
        this.state.bounceValue,                 // Animate `bounceValue`
        {
          toValue: 0.8,                         // Animate to smaller size
          friction: 1,                          // Bouncier spring
        }
    ).start();                                // Start the animation
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
          <Animated.Image  source={require('./images/animal1.png')} style={styles.animal}>
          </Animated.Image>
            </View>

        </Image>
    );
  }

  render() {

    return this.renderLoading();


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
      {scale: this.state.bounceValue},
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
});

AppRegistry.registerComponent('animalGo', () => animalGo);


var that = this;

