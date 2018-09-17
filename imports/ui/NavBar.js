import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Courses } from '../api/courses.js';
import { userCourseMap } from '../api/userCourseMap.js';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Loading from '../ui/Loading.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import OnlineStatus from './OnlineStatus.js';

class NavBar extends Component {

	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
    	this.state = {
      		isOpen: false
    	};
	}

	toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

	renderCourse(courseId){
		if(!Courses.findOne())
			return 'CAT';
		return Courses.findOne(courseId).name;
	}

	renderUserCourseMaps(){
		let userCourseMaps =  this.props.userCourseMaps;
		return userCourseMaps.map((ucm) =>(
			<DropdownItem href="">{this.renderCourse(ucm.course_id)}</DropdownItem>
		));
	}

 	render() {
 		const {loading } = this.props;
	    return (
	    	loading ? <Loading /> :
	    	<div>
	    		<Navbar color="#363636" light expand="md">
	    			<NavbarBrand>
	    				<a href=""><img src="/assets/global/img/ONLINEMOCKS.png" alt="logo" className="logo-default"/></a>
	    			</NavbarBrand>
	    		
		    	{this.props.notSubscribedToCourse ?
			      	
				        <Collapse isOpen={this.state.isOpen} navbar>
				            <Nav className="ml-auto" navbar>
				              	<UncontrolledDropdown nav inNavbar>
				                	<DropdownToggle nav caret>{this.props.courseName}</DropdownToggle>
				                	<DropdownMenu>
				                		{this.renderUserCourseMaps()}
				                		<DropdownItem href="">My Courses</DropdownItem>
				                	</DropdownMenu>
				              	</UncontrolledDropdown>
				              	<NavItem>
				                	<NavLink href="">Learn & Prepare</NavLink>
				              	</NavItem>
				              	<UncontrolledDropdown nav inNavbar>
				                	<DropdownToggle nav caret>
				                  		Practice & Test
				                	</DropdownToggle>
				                	<DropdownMenu right>
					                	<DropdownItem>
					                    	OMCATs (Test Series)
					                  	</DropdownItem>
				                	</DropdownMenu>
				              	</UncontrolledDropdown>
				              	<NavItem>
				              		<NavLink href="/">Revise & Discuss</NavLink>
				              	</NavItem>
				            </Nav>
				        </Collapse>
        			
		  		: ''}
		  		<Nav className="pullRight">
		  			<NavItem><AccountsUIWrapper /></NavItem>
            		<NavItem><OnlineStatus /></NavItem>
            		</Nav>
		  		</Navbar>
	  		</div>
	    );
  	}
}
const courseName = new ReactiveVar();
export default withTracker(() =>{
	let self = this;
 	Meteor.subscribe('courses');
 	if(Meteor.user()){
 	Meteor.call('courseName', Meteor.user().profile.default_course, function(err, res){
 		if(res){
 			courseName.set(res);
 		}
 	})
 }
	
	return {
		userCourseMaps : userCourseMap.find({user_id : Meteor.userId()}).fetch(),
		notSubscribedToCourse : Meteor.user(),
		loading : !Meteor.user(),
		courseName : courseName.get()
	};
})(NavBar);





















//* import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
// import ReactDOM from 'react-dom';
// import { Meteor } from 'meteor/meteor';
// import { Courses } from '../api/courses.js';
// import { userCourseMap } from '../api/userCourseMap.js';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem } from 'reactstrap';

// class NavBar extends Component {

// 	constructor(props){
// 		super(props);
// 		this.toggle = this.toggle.bind(this);
//     	this.state = {
//       		isOpen: false
//     	};
// 	}

// 	toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }

// 	renderCourse(courseId){
// 		if(!Courses.findOne())
// 			return 'CAT';
// 		return Courses.findOne(courseId).name;
// 	}

// 	renderUserCourseMaps(){
// 		let userCourseMaps =  this.props.userCourseMaps;
// 		return userCourseMaps.map((ucm) =>(
// 			<DropdownItem href="">{this.renderCourse(ucm.course_id)}</DropdownItem>
// 		));
// 	}

//  	render() {
// 	    return (
// 	    	<div>
// 	    		<Navbar color="light" light expand="md">
	    		
// 		    	{this.props.notSubscribedToCourse ?
			      	
// 				        <NavbarToggler onClick={this.toggle} />
// 				        <Collapse isOpen={this.state.isOpen} navbar>
// 				            <Nav className="ml-auto" navbar>
// 				              	<UncontrolledDropdown nav inNavbar>
// 				                	<DropdownToggle nav caret>{this.props.courseName}</DropdownToggle>
// 				                	<DropdownMenu>{this.renderUserCourseMaps()}</DropdownMenu>
// 				              	</UncontrolledDropdown>
// 				              	<NavItem>
// 				                	<NavLink href="">Learn & Prepare</NavLink>
// 				              	</NavItem>
// 				              	<UncontrolledDropdown nav inNavbar>
// 				                	<DropdownToggle nav caret>
// 				                  		Practice & Test
// 				                	</DropdownToggle>
// 				                	<DropdownMenu right>
// 					                	<DropdownItem>
// 					                    	OMCATs (Test Series)
// 					                  	</DropdownItem>
// 				                	</DropdownMenu>
// 				              	</UncontrolledDropdown>
// 				              	<NavItem>
// 				              		<NavLink href="/">Revise & Discuss</NavLink>
// 				              	</NavItem>
// 				            </Nav>
// 				        </Collapse>
        			
// 		  		: ''}
// 		  		</Navbar>
// 	  		</div>
// 	    );
//   	}
// }
// const courseName = new ReactiveVar();
// export default withTracker(() =>{
// 	let self = this;
// 	Meteor.subscribe('courses');
// 	Meteor.call(courseName, Meteor.user().profile.default_course, function(err, res){
// 		if(res)
// 			courseName.set(res);
// 	})
// 	return {
// 		userCourseMaps : userCourseMap.find({user_id : Meteor.userId()}).fetch(),
//         currentUser : Meteor.user(),
//         notSubscribedToCourse : Meteor.user().profile.default_course,
//     	courseName : courseName.get()
//     };
// })(NavBar);