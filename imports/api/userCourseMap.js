import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const userCourseMap = new Mongo.Collection('user_course_map');

