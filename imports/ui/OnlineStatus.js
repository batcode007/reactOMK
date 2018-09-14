import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import '../styles/onlineStatus.css';

class OnlineStatus extends Component {

	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
			{this.props.currentUser ?
				<li className="dropdown">
			        <a className="dropdown-toggle online_status" href="javascript:;">
			        	{this.props.online ?
			        		<img src="/assets/global/img/online.png" alt={this.props.onlineMessage}/>
			        	:
			        		<i className="flaticon-computer-1 position"></i>
			        	}
			        </a>
			    </li>
			: ''}
			</div>

		)
	}

}

export default withTracker(() => {
	return {
		currentUser : Meteor.user(),
		online : Meteor.status().connected,
		onlineMessage : Meteor.status().connected ? "You're Online" : "You're Offline"
	}
})(OnlineStatus);