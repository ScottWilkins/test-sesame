var express = require('express');

var five = require("johnny-five");
var board = new five.Board();
var app = express();
var http = require('http')
var firebase = require("firebase");
var server = http.createServer();
var config = {
  databaseURL: "https://todo-cc9d9.firebaseio.com/",
  storageBucket: "",
};


firebase.initializeApp(config);
 var database = firebase.database();
 var items = firebase.database().ref('items');
 board.on("ready", function() {
   var servo = new five.Servo({
     pin: 10,
     range: [35, 145],
     startAt: 35
   }
   );

   items.on('value', function(snapshot) {

     console.log("ooooooooooooooooooooooooooooooooooooooooooooooo");
     var arr = Object.keys(snapshot.val())
     var command = snapshot.val()[arr[arr.length - 1]].title
     console.log(command);
     if (command == 'on') {
          servo.min();
     } else {
          servo.max()
     }
   });




 });





if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user



module.exports = app;
