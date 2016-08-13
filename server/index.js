var express = require('express');
var app = express();
var firebase = require("firebase");
var FCM = require('fcm-push');

var serverKey = 'AIzaSyAp-WW5uuuwgKam6EWze9Yg2ZPZ6s7mTtY';
var fcm = new FCM(serverKey);
var user_token = 'eTVT1urfJdc:APA91bGqiPf7fOeFGp5uVUQShXE92K9t6xKNmaVyxVI1Z6VVt8BbimnbdhXTCkAJTtyfXrGMlR-PC7xH-AWkdkZVCkCXZlstysV7Iy1JSbF8rM-uBs81DHe1M6_p-NRmyk81uS_gtGB2';
user_token = 'eTVT1urfJdc:APA91bGqiPf7fOeFGp5uVUQShXE92K9t6xKNmaVyxVI1Z6VVt8BbimnbdhXTCkAJTtyfXrGMlR-PC7xH-AWkdkZVCkCXZlstysV7Iy1JSbF8rM-uBs81DHe1M6_p-NRmyk81uS_gtGB2';
//collapse_key: 'your_collapse_key',

//user_token = 'eZOMxdjXfKo:APA91bFi33c1LqRCF_4ZLBTUhzWX2pmMeWMoQmDnObKTT28wr3aetjZpWv_OslqMUwF8gK-rm2Kms6FkNiRqJBpTZCkODQIRwFeKCEPcrgkcV0XCKyTdvwWIa9aEoRY2CwuOZsF_dB0S';


var message = {
	to: user_token, // required
	data: {
		spotting_id: 10
	},
	notification: {
		title: 'A new animal in need!',
		body: 'Go go go and be of service'
	}
};

fcm.send(message, function(err, response){
	if (err) {
		console.log("Something has gone wrong!");
	} else {
		console.log("Successfully sent with response: ", response);
	}
});

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
		//		console.log('val -> ', data.val());
	findCloseUsers(data.val()["address"],data.index)
		//}
});// listening to changes

function findCloseUsers(location,spottingid) {
    usersRef.once("value", function (snapshot) {
        var users = snapshot.val();
        Object.keys(users).forEach(function (userId) {
            var user = users[userId];
            //console.log(user);
          	//console.log(user["lastlocation"]["lat"]);
            //console.log(user["lastlocation"]["lng"]);
			//console.log(location["lat"]);
           var distance=( Math.sqrt(

           Math.abs(Math.pow(2,user["lastlocation"]["lat"]-location["lat"])+
			   Math.pow(2,user["lastlocation"]["lng"]-location["lng"]))));
			//console.log("distance is " + distance);
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