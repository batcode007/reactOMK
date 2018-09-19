import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import '../../lib/Util/StudentCourseClass.js';
import {userCourseMap} from '../../imports/api/userCourseMap.js';
import '../styles/studentCourseMap.css';

class StudentCourseMap extends Component{

	constructor(props){
		super(props);
	}

	courseCompletion(){
		const t = this.props.tagWiseCompletion;
				

		if(!t)
			return;
		return t.map((topicStatus) => (
			<div className="list"key={topicStatus} >
	            <div className="title">{topicStatus.shortName}</div>
	            <div className="progress_info">
	            	<div className="progress_value qa_info"></div>
	            </div>
	            <span className="total_status">{topicStatus.percentage}%</span>
	        </div>
		))
	}

	renderGoldStars(){
		const goldStars = this.props.coursePerformance;
		if(!goldStars)
			return;
		else{
			return goldStars.gold.map((starVal) => (
				<i className="fa fa-star rd-icon-gold" key={starVal} ></i>
			));
		}
	}

	renderBlackStars(){
		const blackStars = this.props.coursePerformance;
		if(!blackStars)
			return;
		else{
			return blackStars.black.map((starVal) => (
				<i className="fa fa-star-o" key={starVal}></i>
			));
		}
	}

	componentDidMount(){
		$('body').addClass('overflow_hidden');
		$('body').addClass('studentCourseMap');
	}

	render(){
		return(
			<aside>
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-sm-3 sidebar_container">
                          <div className="sidebar">
                              <span className="side_progress" data-progress="50" id="side_progress_bar"></span>
                              <div className="exam_details">
                                  <div className="logo">
                                      <img src="/assets/global/img/cat.png" />
                                  </div>
                                  <div className="exam_desc">
                                      <h3 data-toggle="tooltip" data-placement="top" title={this.props.courseName}>{this.props.courseName}</h3>
                                      <div className="rating">
                                          {this.renderGoldStars()}                                          
                                          {this.renderBlackStars()}
                                      </div>
                                      <button className="skilltopictable">
                                          <a>
                                              Performance Report
                                          </a>
                                      </button>
                                  </div>

                                  <div className="clearfix"></div>
                                  <div className="course_completion">
                                      <h4>Course Completion</h4>

                                      <div className="course_competion_progress">
                                          {this.courseCompletion()}                                          
                                      </div>
                                  </div>
                              </div>
                              <div className="activity">
                                  <h4>Your Activity</h4>
                                  <div className="chart_container">
                                      <canvas id="Chart" width="150" height="100"></canvas>
                                  </div>
                              </div> 
                          </div>
                      </div>
                      <div className="col-sm-9">
                          <div className="main_container">
                              <div className="main_wrapper">

                                  <div className="coursemap_head clearfix"><h2>{this.props.courseMapName}</h2>
                                  </div>
                                  <div className="milestone_list_wrap">
                                      <div className="milestone_height_wrap">
                                          studentCourseMapGraph _id=this.course_id user_course_map_id=this._id 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        	</aside>
		)
	}	
}
const courseName = new ReactiveVar();
const coursePerformance= new ReactiveVar();
const studentCourseObj = new ReactiveVar();
const courseMapName = new ReactiveVar();
const tagWiseCompletion = new ReactiveVar();

export default withTracker(() =>{
	if(Meteor.user() && userCourseMap.findOne()){
		console.log('check');
		Meteor.call('courseName', Meteor.user().profile.default_course, function(err, res){
		 	if(res){
		 		courseName.set(res);
		 	}
		});

		Meteor.call('courseMapStructure', userCourseMap.findOne().course_map_id, function(err, res){
			if(res){
				studentCourseObj.set(new StudentCourseClass(Meteor.userId(), Meteor.user().profile.default_course, res));
				coursePerformance.set({
					gold: _.range(0,studentCourseObj.get().starsGained()),
					black : _.range(0, studentCourseObj.get().maxNoOfStars() - studentCourseObj.get().starsGained())
				});
				tagWiseCompletion.set(studentCourseObj.get().tagWiseCompletion);
			}
		});
		
		Meteor.call('courseMapName', userCourseMap.findOne().course_map_id, function(err, res){
			if(res){
				courseMapName.set(res);
			}
		})
	}
    return {
        courseName : courseName.get(),
        coursePerformance : coursePerformance.get(),
        courseMapName : courseMapName.get(),
        tagWiseCompletion : tagWiseCompletion.get()
    };
})(StudentCourseMap);