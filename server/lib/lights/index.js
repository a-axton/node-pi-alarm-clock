'use strict';

var WifiBoxModule = require('./wifibox');

var lights = require('./commands');
var box = new WifiBoxModule('192.168.1.101', 8899);
var io = require('../socketio').io;
var flashInterval;

// send commands to wifibox with
// a 50ms delay
function send(command, delay){
     delay = delay || 50;
     setTimeout(function(){
          box.command(command);
     }, delay);
}

// send success back to front-end
function success(command){
     io.emit('success:lights', command);
}

io.on('connection', function(socket){
     socket.on('command:lights', function(command){
         eval('Lights.'+command+'()');
     });
});

var Lights = {
     nightMode: function(brightness){
          brightness = brightness || 80;
          console.log('Night Mode Activated');
          send(lights.on(0));
          send(lights.hue(151));
          send(lights.brightness(brightness));

          success('nightMode');
     },
     morningFadeIn: function(duration){
          var brightness = 1;

          send(lights.on(0));
          send(lights.brightness(1));

          setInterval(function(){
               brightness++;
               send(lights.whiteMode());
               
               // if (brightness > 70){
               //      send(lights.whiteMode());
               // } 
               // else {
               //      var perc = (100 / brightness * 2) * .01;
               //      var hue = perc * 20;
               //      console.log(hue)

               //      hue = Math.round(150 + hue)
               //      console.log(hue)

               //      send(lights.hue(hue));
               // }

               // console.log(brightness)
               send(lights.brightness(brightness));
          }, duration/100);
     },
     allOn: function(brightness){
          // set default value for brightness
          brightness = brightness || 60;

          console.log('Lights On');
          send(lights.off(0));
          send(lights.on(0));
          send(lights.whiteMode());
          send(lights.brightness(brightness));

          success('allOn');
     },
     clearFlash: function(){
          clearInterval(flashInterval);

          send(lights.on(0));
          send(lights.whiteMode());
          send(lights.brightness(70));
     },
     flash: function(color, delay, times){
          var colorModeSet;
          var count = 0;

          function colorMode(){
               if (colorModeSet){ return; }

               if (color == 'white'){
                    send(lights.whiteMode());
               }

               colorModeSet = true;  
          }

          // flash lights
          function flash(){
               send(lights.off(0));
               send(lights.on(0), 500);
               colorMode();
               
               if (times != 'infinite'){
                    count++; 

                    if (count == times){
                         clearInterval(flashInterval);
                    }   
               }
          }

          flashInterval = setInterval(flash, delay);
     },
     allOff: function(){
          console.log('Lights Off');
          send(lights.off(0));
          success('allOff');
     }
}
lights.allOn()
module.exports = Lights;