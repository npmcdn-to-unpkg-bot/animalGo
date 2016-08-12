var express = require('express');
var app = express();
var firebase = require("firebase");


var config = {
	apiKey: "AIzaSyBj4uirFNsfy_YDLOai-O3rvHM1XwzQ8wk",
	authDomain: "roadtofreedom-aea63.firebaseapp.com",
	databaseURL: "https://roadtofreedom-aea63.firebaseio.com",
	storageBucket: "roadtofreedom-aea63.appspot.com",
};
firebase.initializeApp(config);

var serverStart = new Date();


var spottingsRef = firebase.database().ref('spottings');
var usersRef = firebase.database().ref('users');
spottingsRef.on('child_added', function(data) {

        var now = new Date();
        var delta = now - serverStart;

		if (delta > 2000) {
				console.log('val -> ', data.val());
		}
});// listening to changes

function findCloseUsers(location) {
    usersRef.once("value", function (snapshot) {
        var users = snapshot.val();
        Object.keys(users).forEach(function (userId) {
            var user = users[userId];
            console.log(user);

        });
    });
}

function newSpotting() {
	spottingsRef.push().set({
		description: "hello2"
	});

	findCloseUsers();
}

setTimeout(function () {
    newSpotting();
}, 3000);

function writeSpotting(userId, name, email, imageUrl) {
	firebase.database().ref('users/' + userId).set({
		username: name,
		email: email,
		profile_picture : imageUrl
	});
}