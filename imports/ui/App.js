import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';
import NavBar from './NavBar.js';
import OnlineStatus from './OnlineStatus.js';
import NotificationCenter from './NotificationCenter.js';
import WelcomeToOnlineMocks from './WelcomeToOnlineMocks.js';
import '../styles/App.css';
import Modal from 'react-responsive-modal';
import { submitFeedback } from '../../lib/common.js';
// App component - represents the whole app
class App extends Component {
    
    state = {
        open: false,
    };
    constructor(props) {
        super(props);
        // this.home = 
    }

    onOpenModal = () => {
        this.setState({open:true});
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    submitFeedback(event){
        var feedback = $('.feedback-body').val().trim();
        if (feedback.length) {
            {submitFeedback(feedback)};
            {this.onCloseModal};
        }else {
            $('.show_status').text("Please Enter your feedback");
        }
    }

    render() {
        const { open } = this.state;
        return (
          <div className="container">
            <NavBar />
            

                            <AccountsUIWrapper />
                            <OnlineStatus />
                       

            <div className="clearfix"></div>
            <div className="page-container" id="{this.props.currentUser ? : om-content}">
                <div className="page-content-wrapper">
                    <div className="page-content {this.props.FLT ? : rd-body} {this.props.currentUser ?: rd-logged-out}">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 rd-content">
                                <WelcomeToOnlineMocks />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-footer student footerBackground">
                <div className="page-footer-inner">
                    <span className="copyright">2018 &copy;
                        <strong>
                            <span className="onlineColor">ONLINE</span>
                        </strong>
                        <span className="mocksColor">MOCKS</span>

                        {this.props.currentUser ? 
                            <span id="feed"> <span id="feedback" onClick={this.onOpenModal}> CONTACT US</span></span>
                               
                        : ''
                        } 
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <div className="modal-header">
                                <div className="test_name">
                                    <div className="title">
                                        <span className="modalHeadText">Contact Us</span>
                                    </div>
    
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <p>Faced some issues or want to suggest a feature?</p>
                                    <div className="feedback-body-row">
                                        <textarea className="form-control feedback-body" rows="8"></textarea>
                                    </div>
                                    <p className="show_status"></p>
                                    <div className="button_wrap">
                                        <a href="#" className="btn speed_yellow_global_btn feedback-submit" onClick={this.submitFeedback.bind(this)}>Submit</a>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </span>
                </div>
            </div>
          </div>
        );
    }
}

export default withTracker(() =>{
    return {
        currentUser : Meteor.user(),
        techEmail : "mailto:" + Meteor.settings.public.techEmailId + "?Subject=Technical%20support"  
    };
})(App);










import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';
import FirstPage from './FirstPage.js';
import OnlineStatus from './OnlineStatus.js';
import NotificationCenter from './NotificationCenter.js';
import WelcomeToOnlineMocks from './WelcomeToOnlineMocks.js';
import '../styles/App.css';
import Modal from 'react-responsive-modal';
import { submitFeedback } from '../../lib/common.js';
// App component - represents the whole app
class App extends Component {
    
    state = {
        open: false,
    };
    constructor(props) {
        super(props);
        // this.home = 
    }

    onOpenModal = () => {
        this.setState({open:true});
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };

    submitFeedback(event){
        var feedback = $('.feedback-body').val().trim();
        if (feedback.length) {
            {submitFeedback(feedback)};
            {this.onCloseModal};
        }else {
            $('.show_status').text("Please Enter your feedback");
        }
    }

    render() {
        const { open } = this.state;
        return (
          <div className="container">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="{{home}}">
                            <img src="/assets/global/img/ONLINEMOCKS.png" alt="logo" className="logo-default"/>
                        </a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        { this.props.currentUser ?
                             <FirstPage /> : ''
                        }

                        <ul className="nav navbar-nav navbar-right">
                            { this.props.currentUser ?
                                <NotificationCenter /> :
                                <li>
                                    <a href={this.props.techEmail} className="email_techsupport" ><span>Contact: <u>Tech Support</u> </span></a>
                                    }
                                </li>                   
                            }
                            <AccountsUIWrapper />
                            <OnlineStatus />
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="clearfix"></div>
            <div className="page-container" id="{this.props.currentUser ? : om-content}">
                <div className="page-content-wrapper">
                    <div className="page-content {this.props.FLT ? : rd-body} {this.props.currentUser ?: rd-logged-out}">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 rd-content">
                                <WelcomeToOnlineMocks />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-footer student footerBackground">
                <div className="page-footer-inner">
                    <span className="copyright">2018 &copy;
                        <strong>
                            <span className="onlineColor">ONLINE</span>
                        </strong>
                        <span className="mocksColor">MOCKS</span>

                        {this.props.currentUser ? 
                            <span id="feed"> <span id="feedback" onClick={this.onOpenModal}> CONTACT US</span></span>
                               
                        : ''
                        } 
                        <Modal open={open} onClose={this.onCloseModal} center>
                            <div className="modal-header">
                                <div className="test_name">
                                    <div className="title">
                                        <span className="modalHeadText">Contact Us</span>
                                    </div>
    
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="content">
                                    <p>Faced some issues or want to suggest a feature?</p>
                                    <div className="feedback-body-row">
                                        <textarea className="form-control feedback-body" rows="8"></textarea>
                                    </div>
                                    <p className="show_status"></p>
                                    <div className="button_wrap">
                                        <a href="#" className="btn speed_yellow_global_btn feedback-submit" onClick={this.submitFeedback.bind(this)}>Submit</a>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </span>
                </div>
            </div>
          </div>
        );
    }
}

export default withTracker(() =>{
    return {
        currentUser : Meteor.user(),
        techEmail : "mailto:" + Meteor.settings.public.techEmailId + "?Subject=Technical%20support"  
    };
})(App);