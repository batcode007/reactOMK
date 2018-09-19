import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NavBar from './NavBar.js';
import '../styles/footer.css';
import Modal from 'react-responsive-modal';
import { submitFeedback } from '../../lib/common.js';

// App component - represents the whole app

export default class Footer extends Component {
    state = {
        open: false,
    };
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

    constructor(props) {
        super(props);
        this.state={
            user : Meteor.user()
        }
    }

    render() {
        const { open } = this.state;
        return (
            <div className="page-footer student">
                <div className="page-footer-inner">
                    <span className="copyright">2018 &copy;<strong><span className="whiteColor">ONLINE</span></strong>
                        <span className="mocksColor">MOCKS</span>
                        <span id="feed"> <span id="feedback" onClick={this.onOpenModal}> CONTACT US</span></span>
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
        );
    }
}