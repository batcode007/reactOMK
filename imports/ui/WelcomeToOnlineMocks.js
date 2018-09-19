import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'
import '../styles/welcomeToOnlineMocks.css';
class WelcomeToOnlineMocks extends Component {

	updateDimensions(){
		$(window).on("resize", function() {
	        var windowSize = $(window).height();
	        var picSize = windowSize - ($('.page-header').outerHeight() + 20);
	        $('.header').css({
	            height: picSize
	        });
	        var inviteTop = $('.page-header').outerHeight() + picSize - $('.invite-form').outerHeight() - 20;
	        $('.invite-form').offset({
	            top: inviteTop
	        });
	        var introTop = $('.page-header').outerHeight() + picSize / 3;
	        $('.introduction').offset({
	            top: introTop
	        });
	        var introLine1 = $('.page-header').outerHeight() + picSize / 2;
	        $('.intro-line-1').offset({
	            top: introLine1
	        });
	        var introLine2 = $('.page-header').outerHeight() + picSize * 0.6;
	        $('.intro-line-2').offset({
	            top: introLine2
	        });
	        var tableSignUp = $('.page-header').outerHeight() + picSize / 3;
	        $('#table-sign-up').offset({
	            top: tableSignUp
	        });
	        var windowWidth = $(window).width();
    	}).resize();
	}

	registerUser(event){
		event.preventDefault();
		var user = {
            profile: {
                first_name: '',
                last_name: '',
                type: 'student',
                mobileNo: "",
                gender: "",
            },
            email: '',
            password: ''
        };
        var first_name = $('#sign-up-first-name');
        var last_name = $('#sign-up-last-name');
        var email = $('#sign-up-email');
        var mobileNo = $('#sign-up-mobileNo');
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var flag = true;
        
        if (first_name.val().trim() === '') {
            first_name.addClass('error');
            first_name.removeClass('success');
            flag = false;
        } else {
            user.profile.first_name = first_name.val().trim().charAt(0).toUpperCase() + first_name.val().trim().slice(1);
            first_name.removeClass('error');
            first_name.addClass('success');
        }
        if (last_name.val().trim() === '') {
            last_name.addClass('error');
            last_name.removeClass('success');
            flag = false;
        } else {
            user.profile.last_name = last_name.val().trim().charAt(0).toUpperCase() + last_name.val().trim().slice(1);
            last_name.removeClass('error');
            last_name.addClass('success');
        }
        
        if (mobileNo.val() != '') {
            if (mobileNo.val().match(phoneno)) {
                user.profile.mobileNo = mobileNo.val().trim();
                mobileNo.removeClass('error');
                mobileNo.addClass('success');
            } else {
                mobileNo.addClass('error');
                mobileNo.removeClass('success');
                isRegisterUserClicked.set(true);
                errorMessage.set("Mobile number format is not correct");
                flag = false;
            }
        } else {
            mobileNo.removeClass('error');
        }

        if (validEmail.test(email.val())) {
            user.email = email.val().trim();
            email.removeClass('error');
            email.addClass('success');
        } else {
            email.addClass('error');
            email.removeClass('success');
            if (email.val().trim() !== '' && first_name.val().trim() !== '' && last_name.val().trim() !== '') {
            	isRegisterUserClicked.set(true);
                errorMessage.set("Email format is not correct");
            }
            flag = false;
        }

        if (flag) {

            var setServerResponse = function( data ){
            	isRegisterUserClicked.set(true);
                signingUp.set( false );
                errorMessage.set(data.msg);
                if (data.status) {
                    $('#sign-up-first-name').val('');
                    $('#sign-up-last-name').val('');
                    $('#sign-up-email').val('');
                    $('#sign-up-mobileNo').val('');
                }
            }
            var selectValue = $('input[name=gender]:checked').val()                
            user.profile['gender'] = selectValue;            
            signingUp.set( true );
            Meteor.call('SignUp', user, function(err, data) {
                setServerResponse( data )                               
            });
        }
	}
	componentDidMount(){
		this.updateDimensions();
	}
	
	mailNotReceived(event){
		var sendEmailAgain = this.props.isSendEmailAgainActive;
        if( sendEmailAgain === true ){
        	currentEmailAddress.set($('#resend-email').val().trim());
        }else{
            currentEmailAddress.set($('#sign-up-email').val().trim());            
        }
        isSendEmailAgainActive.set( !this.props.isSendEmailAgainActive);
	}
	
	sendEmailAgain(event){

		var emailId = $('#resend-email').val().trim();
        
        var args = {
            emailId: emailId,
        }

        var sendEmailAgainModuleInfo1 = this.props.sendEmailAgainModuleInfo;
        sendEmailAgainModuleInfo1.isRequestInProcess = true;
        sendEmailAgainModuleInfo.set( sendEmailAgainModuleInfo1 );                 
        Meteor.call('sendEnrollmentEmailAgain', args, function(err, data) {
        	var ob = {
                isRendered: true,
                isRequestInProcess: false
            }
            if(err){
                ob.message = err.reason;
            }else{  
                ob.message = data;
            }
			// console.log(ob.message);
			sendEmailAgainModuleInfo.set(ob);                 
        });
	}

	testFunction(){
		return(
			<form className="padding">
			    <input myattr="email" type="text" className="form-control" id="resend-email"  placeholder="Email" required autoFocus/>
			    <br/>
			    {this.props.sendEmailAgainModuleInfo.isRequestInProcess ?
			        <button type="button" id="identicalbtn"  value="Sign Up" className="btn btn-primaryhome page-scroll" disabled >Resending Email ...</button>
			    :
			    	<button type="button"  value="Sign Up" className="btn btn-primaryhome page-scroll" id="send-email-again" onClick={this.sendEmailAgain.bind(this)}>
			    		Resend Email</button>
			    }
			    <a className="havent-received-email" onClick={this.mailNotReceived.bind(this)}>Sign Up</a>
			    {this.props.sendEmailAgainModuleInfo.isRendered ? 
			        <p className="errorMessage">
			            {this.props.sendEmailAgainModuleInfo.message} 
			        </p>
			    : ''
				}
			</form>
		)
	}

	render(){
		return (
			<div className="header home_page_bg">
		        <div className="bg_overlay">
		            <div className="header-content section marginClass">
		                <div className="container-fluid widthClass">
		                    <div className="row">
		                        <div className="col-sm-6 text-center">
		                            <h1 id="homeHeading">Welcome to ONLINE<span className="mocksColorClass">MOCKS</span></h1>
		                            <p className="welcomeText">Your preparation partner</p>
		                
		                            <h2 className="section-heading">WHAT ARE WE ?</h2>

		                            <p className="welcomeText">A pathbreaking technology, meeting your most advanced preparation needs</p>
		                        </div>
		                        <div className="col-sm-6 sign-up-form">
		                            {this.props.isSendEmailAgainActive ?
		                            	<div>       
		                            	<span className="register_head">Send Email Again</span>
		                            	<div className="signupInputfields">
			                                <div className="container_signup">
			                                    {this.testFunction()}
			                                </div>
			                            </div>
			                            </div>
		                            :
		                            <div>
			                            <span className="register_head">Register Now!</span>
			                        	<div className="signupInputfields">
					                        <div className="container_signup">
					                            <form className="padding">
					                                <div className="clearfix">
					                                    <div className="inputStyleFirstName">
					                                        <input myattr="first_name" id="sign-up-first-name" type="text" className="form-control" 
					                                          	placeholder="First Name" required pattern="[A-Za-z]{3}" autoFocus/>
					                                    </div>
					                                    <div className="inputStyleLastName">
					                                        <input myattr="last_name" id="sign-up-last-name" type="text" className="form-control" 
					                                          	placeholder="Last Name" required pattern="[A-Za-z]{3}"/>
					                                    </div>
					                                </div>
					                                <br/>
					                                <div className="clearfix">
					                                    <div>
					                                        <input myattr="mobileNo" min="10" maxLength="10" size="10" type="number" id="sign-up-mobileNo" className="form-control" 
					                                          	placeholder="Mobile Number" required />
					                                    </div>
					                                </div>
					                            	<br/>
					                                <input type="radio" name="gender" value="male"/> <label className="gendertype">Male</label>
					                                <input type="radio" name="gender" value="female" className="femaleStyle" /> 
					                                <label className="gendertype">Female</label>
					                                <br/>
					                                <br/>
					                                <input myattr="email" type="text" className="form-control" id="sign-up-email"  
					                                  	placeholder="Email" required />
					                                <br/>
					                                {this.props.signingUp ?
					                                    <button type="button" id="identicalbtn"  value="Sign Up" className="btn btn-primaryhome page-scroll" disabled >signing you up ...</button>
					                                :
					                                	<button type="button"  value="Sign Up" className="btn btn-primaryhome page-scroll" 
					                                		id="sign-up-send-enrollment" onClick={this.registerUser.bind(this)}>Sign Up</button>
					                                }
					                                <a className = "havent-received-email" onClick={this.mailNotReceived.bind(this)}>Haven't received email?</a>
					                            	{this.props.isRegisterUserClicked ?
					                            		<p className="errorMessage">
                                                			{this.props.message} 
                                            			</p>
					                            	: ''
					                            	}
					                            </form>
					                        </div>
					                    </div>
					                </div>
				                	}
		                    	</div>
		               		</div>
		            	</div>
		     		</div>
		            <div id="partners" className="section text-center partner_pos">
		                <p className="welcomeText">Exclusively available through our training partner(s)</p>
		                <div className="partners">
		                    <img src="/assets/global/img/alchemist.png" className="img-responsive" />
		                </div>
		            </div>
		        </div>
		    </div>
		)
	}

}

const isSendEmailAgainActive = new ReactiveVar(false);
const sendEmailAgainModuleInfo = new ReactiveVar();
const currentEmailAddress = new ReactiveVar();
const signingUp = new ReactiveVar();
const messageOfSendAgainEmail = new ReactiveVar();
const errorMessage = new ReactiveVar('');
const isRegisterUserClicked = new ReactiveVar(false);
sendEmailAgainModuleInfo.set({
	isRendered : false,
	isRequestInProcess : false,
	message : ""
});
export default withTracker(() =>{
	return {
		isSendEmailAgainActive : isSendEmailAgainActive.get(),
		sendEmailAgainModuleInfo : sendEmailAgainModuleInfo.get(),
		currentEmailAddress : currentEmailAddress.get(),
		signingUp : signingUp.get(),
		messageOfSendAgainEmail : messageOfSendAgainEmail.get(),
		isRegisterUserClicked : isRegisterUserClicked.get(),
		message : errorMessage.get()
	}
})(WelcomeToOnlineMocks);