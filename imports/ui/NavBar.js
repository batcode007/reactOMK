import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Courses } from '../api/courses.js';
import { userCourseMap } from '../api/userCourseMap.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import OnlineStatus from './OnlineStatus.js';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {

	constructor(props){
		super(props);
	}


	renderCourse(courseId){
		return _.findWhere(this.props.allCourseNames, {_id:courseId}).name;
	}

	renderUserCourseMaps(){
		let userCourseMaps =  this.props.userCourseMaps;
		return userCourseMaps.map((ucm) =>(
			<li key={ucm._id}> <Link to={"/student/course/" + ucm.course_id + "/" + ucm._id} className="change-course-map">{this.renderCourse(ucm.course_id)} </Link></li>
		));
	}	

 	render() {
 		return (
	    	<nav className = 'navBackground navbar navbar-default navbar-fixed-top'>
	    		<div className="container-fluid">
			    	<div className="navbar-header">
		                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" 
		                	aria-expanded="false">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <Link to="/home" className="navbar-brand">
		                    <img src="/assets/global/img/ONLINEMOCKS.png" alt="logo" className="logo-default" />
		                </Link>
		            </div>

	            	<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			            {this.props.SubscribedToCourse ?  
			    		<ul className="nav navbar-nav left_menu">
		          			<li className="dropdown activeOnBackCourse">
		              			<a href="#" className="dropdown-toggle d1" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
		              				{this.props.courseName}
		              				<span className="caret"></span>
		              			</a>
		              			<ul className="dropdown-menu">
		                			{this.renderUserCourseMaps()}
		                            <li className="addCourse"><Link to="/student/choose_course">My Courses</Link></li>
		              			</ul>
		          			</li>
				          	<li className="classic-menu-dropdown my-default-course active">
				            	<a href="{{home}}"> Learn & Prepare
				                  <span className="selected"> </span>
				              	</a>
				          	</li>
		          			<li className="classic-menu-dropdown activeOnBack ">
		                  		<a href="javascript:;" className="dropdown-toggle d1" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Practise & Test
		                      		<span className="caret"></span>
		                  		</a>
			                  	<ul className="dropdown-menu">
			                      <li className="studenttest">
			                      	<Link to={"/student/student_view/"}>
			                          <i className="fa fa-bookmark-o"></i>OMCATs (Test Series)
			                        </Link>
			                      </li>
			                  	</ul>
		          			</li>
		          			<li className="classic-menu-dropdown library"><a>Revise & Discuss</a></li>
		       			</ul>
		       			: ''
       					}
   				
			       		<ul className="nav navbar-nav navbar-right">
			   				<AccountsUIWrapper />
			   				<OnlineStatus />
			   			</ul>
   					</div>
   				</div>
	  		</nav>
	    );
  	}
}
const allCourseNames = new ReactiveVar();
const courseName = new ReactiveVar();
const SubscribedToCourse = new ReactiveVar(false);
Meteor.call('allCourseNames', function(err, res){
	if(res){
		allCourseNames.set(res);
	}
});
 	
export default withTracker(() =>{
	if(Meteor.user()){
		SubscribedToCourse.set(Meteor.user().profile.default_course);
		Meteor.call('courseName', Meteor.user().profile.default_course, function(err, res){
	 		if(res){
	 			courseName.set(res);
	 		}
	 	});
 	}
 	SubscribedToCourse.set(false);
	
	return {
		userCourseMaps : userCourseMap.find({user_id : Meteor.userId()}).fetch(),
		SubscribedToCourse : SubscribedToCourse,
		courseName : courseName.get(),
		allCourseNames : allCourseNames.get()
	};
})(NavBar);