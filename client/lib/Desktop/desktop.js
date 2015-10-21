// Meteor.isElectron
Meteor.isElectron = (typeof require !== 'undefined');

// Template helper
Template.registerHelper('isElectron', function(){
  return Meteor.isElectron;
});

// Do all desktop app things here
if (Meteor.isElectron) {
  Desktop = {};

  Meteor.startup(function () {
    // ipc for talking to electron
    Desktop.ipc = require('ipc');
    // remote for calling remote methods
    Desktop.remote = require('remote');
    // shell for opening files, links in browser, etc.
    Desktop.shell = require('shell');


    // On user id change != null means user is logged in
    Tracker.autorun(function () {
      var connected = Meteor.status().connected;
      var userId = Meteor.userId();
      // If userId is present and we'r connected, send login event with token
      if (userId && connected) {
        Desktop.ipc.send('logged-in', localStorage.getItem('Meteor.loginToken'));
      }
    });

  });
} else {
  Desktop = false;
}
