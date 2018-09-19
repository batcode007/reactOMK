import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import WelcomeToOnlineMocks from './WelcomeToOnlineMocks.js';
import StudentChooseCourseFirstTime from './StudentChooseCourseFirstTime.js';
import StudentCourseMap from './StudentCourseMap.js';
import { Router, Route, Switch, NotFoundRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect } from 'react-router-dom';
// App component - represents the whole app
const browserHistory = createBrowserHistory();

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }

    checkRoute(){
        if( Meteor.loggingIn() === false ){
            if (Meteor.user() != undefined ){
                if ( Meteor.user().profile.default_course === undefined ) {
                   return (
                        <Redirect to ="/student/choose_course" />
                    )
                } else{
                    return (
                        <Redirect to={'/student/course/' + Meteor.user().profile.default_course + "/" + Meteor.user().profile.default_course_map} />
                    );
                }
            }
            else {
                return (
                    <Redirect to="/home" />
                );
            }
        }        
    }

    render() {
        return (
        <Router history={browserHistory}>
            <div>
            <NavBar />
            {this.checkRoute()}                
            <Footer />
            <Switch>
                <Route exact path="/student/course/:id/:course_map_id" component={StudentCourseMap} />
                <Route exact path="/student/choose_course" component={StudentChooseCourseFirstTime} />
                <Route exact path="/home" component={WelcomeToOnlineMocks} />
            </Switch>
            </div>

            
        </Router>
        );
    }
}
