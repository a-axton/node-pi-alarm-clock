var fs = require('fs');
var path = require('path');
// var Player = require('player');
var child_process = require('child_process');
// create player instance

var moment = require('moment');
var CronJob = require('cron').CronJob;
var lights = require('../lights');
var alarmSound;

var job = {
    wakeUpStart: null,
    wakeUpTrigger: null,
    bedTimeStart: null,
    bedTimeTrigger: null
}

var defaultWakeUp = {
    hours: moment().hours(),
    minutes: moment().minutes()+2
}

var defaultBedTime = {
    hours: moment().hours(),
    minutes: moment().minutes()+2
}

// init Alarm object
var Alarm = function(){}


function formatCronTime(hours, minutes){
    return '00 '+minutes+' '+hours+' * * 1-7';
}

function wakeUpStart(){
    console.log('wake up start')

    lights.morningFadeIn(360000);
}

function wakeUpComp(){
    var now = moment();
    
    child_process.spawn('pmset', [ 'schedule', 'wake', 'time', now.hours()+':'+now.minutes()+':'+now.seconds()+30 ]);
}

function wakeUpTrigger(){
    console.log('wake up trigger')
    

    lights.flash('white', 1000, 'infinite');
    // alarmSound = new Player(__dirname + '/alarm.mp3');
    // alarmSound.play(function(err, player){
    //     console.log('playend!');
    // });
}

function bedTimeStart(){
    console.log('bed time start')
    lights.nightMode();   
}

function bedTimeTrigger(){
    console.log('bed time trigger')
}

// start wake up jobs
function startWakeUpSequence(time, snooze){
    if (job.wakeUpStart){
        job.wakeUpStart.stop();
        job.wakeUpTrigger.stop();
    }

    if (!snooze){
        job.wakeUpStart = new CronJob(formatCronTime(time.hours,time.minutes-1), wakeUpStart, null, true);
    }
    
    job.wakeUpComp = new CronJob(formatCronTime(time.hours,time.minutes-1), wakeUpComp, null, true); 
    job.wakeUpTrigger = new CronJob(formatCronTime(time.hours,time.minutes), wakeUpTrigger, null, true); 
}

// start bed time jobs
function startBedTimeSequence(time){
    if (job.bedTimeStart){
        job.bedTimeStart.stop();
        job.bedTimeTrigger.stop();
    }

    job.bedTimeStart = new CronJob(formatCronTime(time.hours,time.minutes-1), bedTimeStart, null, true);
    job.bedTimeTrigger = new CronJob(formatCronTime(time.hours,time.minutes), bedTimeTrigger, null, true);  
}


// set time for alarm
Alarm.prototype.wakeUpSet = function(){

}

Alarm.prototype.bedTimeSet = function(){

}

Alarm.prototype.snooze = function(){
    var now = moment();
    var snoozeTime = {
        hours: now.hours(),
        minutes: now.minutes()+10
    }

    startWakeUpSequence(snoozeTime, true);
    lights.clearFlash();
}

Alarm.prototype.stop = function(){
    lights.clearFlash();
    // alarmSound.stop();

    // reset alarm here
}

// startWakeUpSequence(defaultWakeUp);
// startBedTimeSequence(defaultBedTime);

module.exports = Alarm; 