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

console.log("starting...");
var spottingsRef = firebase.database().ref('spottings');
console.log("got spottings from DB");
var usersRef = firebase.database().ref('users');
console.log("got users from DB");
var spottingsusersRef=firebase.database().ref('spottingsusers');
spottingsRef.on('child_added', function(data) {
	console.log("event spottings changed");
        var now = new Date();
        var delta = now - serverStart;
	console.log("delta is "+ delta);
		//if (delta > 2000) {
				console.log('val -> ', data.val());
	findCloseUsers(data.val()["address"],data.index)
		//}
});// listening to changes

function findCloseUsers(location,spottingid) {
    usersRef.once("value", function (snapshot) {
        var users = snapshot.val();
        Object.keys(users).forEach(function (userId) {
            var user = users[userId];
            console.log(user);
          console.log(user["lastlocation"]["lat"]);
            console.log(user["lastlocation"]["lng"]);
			console.log(location["lat"]);
           var distance=( Math.sqrt(

           Math.abs(Math.pow(2,user["lastlocation"]["lat"]-location["lat"])+
			   Math.pow(2,user["lastlocation"]["lng"]-location["lng"]))));
			console.log("distance is " + distance);
			if (distance<2)
			{
				spottingsusersRef.push({ "userid":user["id"], "spottingid":1});
			//	var notificationData = snapshot.val();
			//	sendNotification(notificationData);
			//	snapshot.ref().remove;

			}
		//
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
  //  newSpotting();
}, 3000);

function writeSpotting(userId, name, email, imageUrl) {
	firebase.database().ref('users/' + userId).set({
		username: name,
		email: email,
		profile_picture : imageUrl
	});
}