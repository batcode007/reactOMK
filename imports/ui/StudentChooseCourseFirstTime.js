import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';
import { userCourseMap } from '../api/userCourseMap.js';
import { Link } from 'react-router-dom';

class StudentChooseCourseFirstTime extends Component{

	getCourseName(courseId){
		return _.findWhere(this.props.allCourseNames, {_id:courseId}).name;
	}

	componentDidMount(){
		var maxStepValue =10;
		
		// var testAttemptsDayWiseData = _.map(Template.instance().dates["rawDate"], function(d) {
		// 	let m = moment(d);
		// 	m = moment(m).add(1, 'day');
		// 	return testAttempts.find({
		// 		user_id: Meteor.userId(),
		// 		course_id: Meteor.user().profile.default_course, 
		// 		activity_type:{$nin:["SWOT-TEST"]},
		// 		start_time: {
		// 			$gte: d,
		// 			$lt: m._d
		// 		}
		// 	}).count();
		// });

		// if (_.max(testAttemptsDayWiseData) > 0) {
		// 	maxStepValue = (Math.ceil((_.max(testAttemptsDayWiseData) / 10)) * 10);
		// } else {
		// 	maxStepValue = 10;
		// }
		const options = {
			//String - Colour of the grid lines

			legend: {
				display: false
			},
			scaleGridLineColor: "rgba(0,0,0,.04)",
			bezierCurve: false,
			pointDotRadius: 3,
			pointHitDetectionRadius: 3,
			pointStrokeWidth: 1,
			datasetStrokeWidth: 1,
			tooltipFillColor: "rgba(181,73,198,1)",
			tooltipFontSize: 12,
			scales: {
				yAxes: [{
					ticks: {
						min: 0,
						max: maxStepValue
					},
					scaleLabel: {
						display: true,
						labelString: 'Number of Attempts'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Last 7 days'
					}
				}]
			},
			label: "Number of attempts",
			tension: 0,
			backgroundColor: "rgba(181,73,198,0.2)",
			borderColor: "#ef6100",
			pointBackgroundColor: "#b549c6",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "#b549c6",
			// data: testAttemptsDayWiseData.reverse()
			
		};

				$('#modalChooseCourse').css('max-height', $(window).height() * 0.8);
		$('.slimScrollDiv').css('max-height', $(window).height() * 0.4);
		$('.scroller').css('max-height', $(window).height() * 0.4);
	}

	renderUserCourseMaps(){
		let userCourseMaps =  this.props.userCourseMaps;
		return userCourseMaps.map((ucm) =>(
			<div className="col-sm-3" key={ucm._id}>
		        <div className="exam_lists">
		            <span className="side_progress" data-progress=''></span>
		            <Link to={"/student/course/" + ucm.course_id + "/" + ucm._id} className="change-course-map">
		            	<div className="exam_details">
		                    <div className="logo">
		                        <img src="/assets/global/img/cat.png" />
		                    </div>
		                    <div className="exam_desc">
		                       	<h3>{this.getCourseName(ucm.course_id)} </h3>
		                        <div className="rating">
		                            with performance ucm._id}}
		                                each gold}}
		                                    <i className="fa fa-star rd-icon-gold"></i>
		                                each}}
		                            	each this.black}}
		                                	<i className="fa fa-star-o"></i>
		                                each}}
		                            with}}
		                        </div>
		                    </div>
		                    <div className="clearfix"></div>
		                </div>
		            </Link>
		            <Link to={"/student/course/" +  ucm.course_id + "/" + ucm._id} className="change-course-map">
		                <div className="info_wrapper">
		                    <div className="course_completion">
		                        <h4>course completion</h4>
		                        <div className="course_competion_progress">
		                            each courseCompletion}}
		                                <div className="list">
		                                    <div className="title">shortName}}</div>
		                                    <div className="progress_info">
		                                        <div className="progress_value qa_info" data-qavalue="0" data-qalength="10" />
		                                    </div>
		                                </div>
		                                <span className="total_status">percentage}}%</span>
		                            each}}
		                        </div>
		                    </div>
		                    <div className="activity">
		                    	<h4>Your Activity</h4>
		                        <div className="chart_container">
		                            <canvas id={ucm.course_id} width="150" height="100"></canvas>
		                        </div>
		                    </div>
		                </div>
		            </Link>
		            <div className="arrow_click">
		                <img src="/assets/global/img/arrow_down.png" alt="arrow" />
		            </div>
					<div className= "button subscribed_course">
						<Link to="/home">Subscribed</Link>
					</div>
		        </div>
		    </div>
		));
	}

	renderAvailableCourses(){
		let subscribedCourseIds = _.pluck(this.props.userCourseMaps, "course_id");
		Meteor.call("studentAvailableCourses", subscribedCourseIds, function(err, res){
			if(!err){
				return res.map((course) =>(
					
		                <div className="exam_lists">
		                	<div className="exam_details" >
		                        <div className="logo">
		                            <img src="/assets/global/img/cat.png" />
		                        </div>
		                        <div className="exam_desc">
		                            <h3 data-toggle="tooltip" title={course.name}>
		                                <span data-value="name" data-counter="counterup" value="{course.name}">{course.name}</span>
		                            </h3>
		                        </div>
		                        <div className="clearfix"></div>
		                        <div className="info_wrap">
		                            <div className="info_desc">
		                          	    <p>{course.description}</p>
		                            </div>
		                            <div className="clearfix"></div>
		                            <a href="javascript:;" className="subscribe_btn_wrap">
		                               	<button className="subscribe_cbtn subscribe">Subscribe</button>
		                            </a>
		                        </div>
		                    </div>
		                </div>
		            
				));
			}
		});
	}

	render(){
		return(
			<div className="container-fluid">
		        <div className="row backgroundCourseImg">
		            <div className="col-sm-12 exam_main_list_wrapper">
		                <div className="row">
							{this.renderUserCourseMaps()}
							{this.props.addCourse ?
								<div className="col-sm-3">
		                        	{this.renderAvailableCourses()}
		                        </div>
		                            
		                        
		                    : ""
		                	}
		                    <div className="col-sm-3" id="add_course">
		                        <div className="add_course_lists">
		                            <a className = "addCourse">
		                                <img src="/assets/global/img/add_course.png" alt="" />
		                                <h5>Click to add a course</h5>
		                            </a>
		                        </div>
		                    </div>
		                </div>
		                <div id="btn_proceed">
		                    <button className="btn_proceed btn btn_confirm_course">Confirm</button>
		                </div>
		            </div>
		        </div>
    		</div>
		);
	}	
}
let addCourse = false;
let allCourseNames = new ReactiveVar();
Meteor.call('allCourseNames', function(err, res){
	if(res){
		allCourseNames.set(res);
	}
});
export default withTracker(() =>{

    return {
        userCourseMaps : userCourseMap.find({user_id : Meteor.userId()}).fetch(),
    	addCourse : addCourse,
    	allCourseNames : allCourseNames.get()
    };
})(StudentChooseCourseFirstTime); 