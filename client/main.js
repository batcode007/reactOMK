import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.js';
import '../imports/startup/accounts-config.js';
import { renderRoutes } from '../client/router.js';
Meteor.startup(() => {
	Meteor.subscribe('myUserCourseMap');
	Meteor.call("commonSettings","General", function(error, res){
		if(!error){
      		Meteor.settings.public = res.public;
    	}
  	});
  	render(<App />, document.getElementById('render-target'));
});