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
	TouchableHighlight,
	Animated
} from 'react-native';

import FCM from 'react-native-fcm';

import * as firebase from 'firebase';

var ImagePicker = require('react-native-image-picker');
import Spinner from 'react-native-loading-spinner-overlay';

let animals = [];
animals[0] = require('./images/animal1.png');
animals[1] = require('./images/animal2.png');
animals[2] = require('./images/animal3.png');
animals[3] = require('./images/animal4.png');
animals[4] = require('./images/animal5.png');
animals[5] = require('./images/animal6.png');
animals[6] = require('./images/animal7.png');

class animalGo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),
			stage: 'LOADING',
			animal: animals[0],
			progress: false,
		}
	}

	componentDidMount() {
		FCM.requestPermissions(); // for iOS
		FCM.getFCMToken().then(token => {
			console.log('token -> ', token)
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

		this.loadAnimals(0);
		//this.loadAnimal(2);


	}


	loadAnimals(i) {

			this.loadAnimal(i)

		if (i < 7) {
			setTimeout(() => {
				this.loadAnimals(i + 1);
			}, 1500);
		} else {
			this.setState({
				stage: 'MAIN',
			})
		}
	}

	loadAnimal(index) {
		this.fadeTo(1, 0);
		this.fadeTo(0, 1000);

		this.setState({
			animal: animals[index]
		});


	}

	fadeTo(value, delay) {
		setTimeout(() => {
			Animated.timing(          // Uses easing functions
				this.state.fadeAnim,    // The value to drive
				{toValue: value}            // Configuration
			).start();
		}, delay);
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
				this.setState({
					stage: 'POST',
					progress: false,
				});

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

		this.setState({
			progress: true
		});


		setTimeout(() => {
			this.setState({
				stage: 'SUCCESS'
			});
		}, 3500);

	}

	renderLoading() {
		return (
			<Image source={require('./images/splash.jpg')} style={styles.loading}>

				<Text style={ styles.textLoading } >
					טוען נתונים...
					</Text>
				<Animated.View          // Special animatable View
					style={{opacity: this.state.fadeAnim}}>
					<Image source={ this.state.animal } style={styles.animal1}>

					</Image>
				</Animated.View>


			</Image>
		)
	}

	renderPrepostForm() {
		return (
			<Image source={require('./images/bk.jpg')} style={styles.mainContainer}>

				<Spinner visible={this.state.progress} />

				<Text style={styles.titleText1}>
					דיווח חי מהשטח
				</Text>

				<Text style={styles.titleText2}>
					מקרה #1490
				</Text>


				<Image source={require('./images/lost-dog-1.jpg')} style={styles.logo} />

				<Text style={ styles.address } >
					יגאל אלון 98 ת״א
				</Text>
				<Text style={ styles.address2 } >
					32.0699826,34.7951477
				</Text>

				<TextInput
					style={styles.textEdit}
					onChangeText={(text) => this.setState({text})}
					placeholder="תיאור"
				/>

				<TouchableHighlight
					style={styles.button}
					onPress={this.reportIncident.bind(this)}>
					<View>
						<Text style={styles.buttonSend}>שלח דיווח</Text>
					</View>
				</TouchableHighlight>

			</Image>);

	}

	renderMain() {
		return (
			<Image source={require('./images/bk.jpg')} style={styles.mainContainer}>

				<Image source={require('./images/logo.png')} style={styles.logo} />

			<Text style={styles.titleText}>
				ראית כלב נטוש, חתולה שהמליטה, בעל חיים שזקוק לתשומת לב ועזרה?
			</Text>





			<TouchableHighlight
				onPress={this.showImagePicker.bind(this)}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>
						צלמ/י עכשיו
					</Text>
				</View>
			</TouchableHighlight>

				<Text style={styles.titleLabel}>
					ודיווח יישלח עם מיקומך ותיאור המקרה למאות מתנדבים הנמצאים ברדיוס האירוע
				</Text>



		</Image>);

	}

	renderSuccess() {
		return (	<Image source={require('./images/bk.jpg')} style={styles.mainContainer}>


				<Text style={styles.titleText10}>
					הדיווח התקבל בהצלחה!
				</Text>

				<Text style={styles.titleText2}>
					מקרה #1490
				</Text>


				<Image source={require('./images/winner.png')} style={styles.logo2} />

				<Text style={ styles.address } >
					דורון זכית ב- 10 נקודות
				</Text>
				<Text style={ styles.address2 } >
					יש לך סה״כ 124 נקודות (מקום שני)
				</Text>




			</Image>);
	}
	render() {

		switch (this.state.stage) {
			case 'LOADING':
				return this.renderLoading();
			case 'MAIN':
				return this.renderMain();
			case 'POST':
				return this.renderPrepostForm();
			case 'SUCCESS':
				return this.renderSuccess();
			default:
				return this.renderLoading();
		}

	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: null,
		height: null,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems:'center',
		resizeMode: 'cover',
	},
	titleText: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 23,
		textAlign:'center',
		margin: 10,
	},
	titleText1: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 26,
		textAlign:'center',
		marginTop:10,
	},
	titleText2: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 20,
		textAlign:'center',
	},	titleText10: {
		alignSelf: 'center',
		color: '#ffffff',
		fontSize: 30,
		textAlign:'center',
		marginTop:100,
	},
	titleBig: {
		fontSize: 30,
		textAlign:'center',
		margin: 10,
	},
	titleLabel: {
		color: '#ffffff',
		fontSize: 24,
		margin:50,
		textAlign:'center',
	},
	button: {
		backgroundColor: '#0d1111',
		paddingHorizontal:10,
		paddingVertical:10,
		margin:20,
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
		height: 40,
		borderColor: 'grey',
		backgroundColor: 'white',
		borderWidth: 1,
		margin:10,
		marginHorizontal: 40,
	},
	loading: {
		flex: 1,
		width: null,
		height: null,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems:'stretch',
		resizeMode: 'cover',
	},
	animal1: {
		width:100,
		height:120,
		resizeMode: 'cover',
		alignSelf:'center',
		margin:10,
	},
	textLoading: {
		color:'white',
		textAlign:'center',
		fontSize:20,
	},
	logo: {
		margin:20,
		width:300,
		height:150,
		resizeMode:'contain',
	},
	logo2: {
		margin:20,
		width:300,
		height:250,
		resizeMode:'contain',
	},
	address: {
		color:'white',
		fontSize:20,
	},
	address2: {
		color:'white',
		fontSize:16,
	}
});

AppRegistry.registerComponent('animalGo', () => animalGo);
