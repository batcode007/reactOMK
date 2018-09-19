import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

class StudentChooseCourseFirstTime extends Component{
	render(){
		return(
			<p>12</p>
		);
	}	
}

export default withTracker(() =>{
    return {
        isNoUser : !Meteor.user(),
    };
})(StudentChooseCourseFirstTime); 