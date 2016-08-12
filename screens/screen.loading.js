import React, {
	Component,
} from 'react';

import {
	StyleSheet,
	Image,
	Button,
	Text,
	TouchableHighlight,
	ListView,
	View
} from 'react-native';


export default class LoadingScreen extends Component {

	constructor(props) {
		super(props);


	}

	componentDidMount() {
		setTimeout(() => {
		}, 3000);
	}
	render() {
		// ToastAndroid.show('So Awesome!', ToastAndroid.LONG);

		return (
			<Image source={require('./../images/splash.jpg')} style={stylesLoading.container}>

				<Text>
					Hello
				</Text>

			</Image>
		);
	}

	loadRecipes() {
		//this.props.navigator.push({index: Stages.STAGE_LIST});
	}




}

const stylesLoading = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems:'stretch',
		resizeMode: 'cover',
	},
	image: {
		width: null,
		height: 245,
		resizeMode: 'contain',
	},



});
