import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import '../../lib/Util/StudentCourseClass.js';
import {userCourseMap} from '../../imports/api/userCourseMap.js';
import '../styles/studentCourseMap.css';
import Modal from 'react-responsive-modal';
import StudentCourseMapCards from './StudentCourseMapCards.js';
import { skillDataObject } from '../../lib/common.js';

class StudentCourseMap extends Component{
	state = {
        open: false,
    };

    onOpenModal = () => {

        this.setState({open:true});
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

	constructor(props){
		super(props);
	}

	getMeteorData(){
		// let handle = Meteor.subscribe('courses')

	    // return {
	    //   todoListLoading: ! handle.ready(), // Use handle to show loading state
	    //   todoList: TodoLists.findOne(this.props.id),
	    //   todoListTasks: Tasks.find({listId: this.props.id}).fetch()
	    // };
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
		// $('body').addClass('overflow_hidden');
		$('body').addClass('studentCourseMap');
	}

	performanceReportRowHeads(){
		let t = skillDataObject();
		console.log('t',JSON.stringify(t));
		const testNaman = t.map((s) =>
			<th key={s.name}>{s.name} <i className="fa fa-info-circle" data-toggle="tooltip" title={s.desc} aria-hidden="true"></i></th>
		);
		return (
			<thead>
                <tr className="topicName"><th>Topic\Skill</th>
                  	{testNaman}
                </tr>
            </thead>
        )
	}

	render(){
		const { open } = this.state;
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
                                          <a onClick={this.onOpenModal}>
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
                                          <StudentCourseMapCards /> 
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <Modal open={open} onClose={this.onCloseModal} center>
                <div className="modal-header">
                    <div className="test_name">
                        <div className="title">
                            <span>Performance Report</span>
                        </div>
                        <div className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><img src="/assets/global/img/close.png" /> </span>
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                        <div className="content">
                            <section className="scoreInformation">
                              <div className="row">
                                <div className="col-md-3 col-sm-6 col-xs-12">
                                  <p><span className="box highscore"></span>Good</p>
                                </div>
                                 <div className="col-md-3 col-sm-6 col-xs-12">
                                  <p><span className="box lowscore"></span>Needs attention</p>
                                </div>
                                 <div className="col-md-3 col-sm-6 col-xs-12">
                                  <p><span className="box mediumscore"></span>Satisfactory</p>
                                </div>
                                 <div className="col-md-3 col-sm-6 col-xs-12">
                                  <p><span className="box notAttempted"></span>Not attempted</p>
                                </div>
                              </div>
                            </section>

                            <table className="table">
                                {this.performanceReportRowHeads()}
                                <tbody>
                                
                                <tr className = "parentTopic"><td></td>
                                    
                                        <td><span className="totalscore scoreClass s.name f}}"></span></td>
                                    
                                </tr>
                                
                                </tbody>
                            </table>
                            </div>
                        </div>
            </Modal>
        	</aside>
		)
	}	
}
const courseName = new ReactiveVar();
let coursePerformance= new ReactiveVar();
let studentCourseObj = new ReactiveVar();
const courseMapName = new ReactiveVar();
let tagWiseCompletion = new ReactiveVar();

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
				// coursePerformance.set({
				// 	gold: _.range(0,studentCourseObj.get().starsGained()),
				// 	black : _.range(0, studentCourseObj.get().maxNoOfStars() - studentCourseObj.get().starsGained())
				// });
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