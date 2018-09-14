import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";
import { Courses } from '../imports/api/courses.js';
import {userCourseMap} from '../imports/api/userCourseMap.js';
import {CommonSettings} from '../imports/api/commonSettings.js';
onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});

Meteor.publish('myUserCourseMap', function() { //Change this later to user specific
    if (this.userId) {
        return userCourseMap.find({
            user_id: this.userId
        });
    }
});

Meteor.publish('courses', function(limit) {
    var flag = true;
    flag = typeof limit !== 'undefined' ? true : false;
    if (this.userId) {
        return Courses.find();
    }
});

Meteor.methods({
    courseName(courseId){
        return Courses.findOne(courseId).name;
    },

    commonSettings(type){
        return CommonSettings.findOne({type : type});

    },

    SendEmail: function(to, from, subject, text) {
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});