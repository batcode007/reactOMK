import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'
import '../styles/welcomeToOnlineMocks.css';
class WelcomeToOnlineMocks extends Component {

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
			                                    with sendEmailAgainModuleInfo}}
			                                        <form className="padding">
			                
			                                            <input myattr="email" type="text" className="form-control" id="resend-email"  
			                                            	placeholder="Email" required="" autoFocus="" value = {this.props.currentEmailAddress}/>
			                                            <br/>
			                                         
			                                            if isRequestInProcess}}
			                                                <button type="button" id="identicalbtn"  value="Sign Up" className="btn btn-primaryhome page-scroll" disabled >resending email ...</button>
			                                            else}}
			                                                <button type="button"  value="Sign Up" className="btn btn-primaryhome page-scroll" id="send-email-again">Resend Email</button>
			                                            if}}
			                                            <a className = "havent-received-email">Sign Up</a>
			                                                if isRendered 
			                                                <p>
			                                                    {this.props.messageOfSendAgainEmail} 
			                                                </p>
			                                                /if}}
			                                        </form>
			                                    /with}}    
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
					                                    <div className="inputStyle">
					                                        <input myattr="first_name" id="sign-up-first-name" type="text" className="form-control" 
					                                          	placeholder="First Name" required="" pattern="[A-Za-z]{3}" autoFocus=""/>
					                                    </div>
					                                    <div className="inputStyle">
					                                        <input myattr="last_name" id="sign-up-last-name" type="text" className="form-control" 
					                                          	placeholder="Last Name" required="" pattern="[A-Za-z]{3}" autoFocus=""/>
					                                    </div>
					                                </div>
					                                <br/>
					                                <div className="clearfix">
					                                    <div>
					                                        <input myattr="mobileNo" min="10" maxLength="10" size="10" type="number" id="sign-up-mobileNo" className="form-control" 
					                                          	placeholder="Mobile Number" autoFocus="" required />
					                                    </div>
					                                </div>
					                            	<br/>
					                                <input type="radio" name="gender" value="male" checked /> <label className="gendertype">Male</label>
					                                <input type="radio" name="gender" value="female" className="femaleStyle" /> 
					                                <label className="gendertype">Female</label>
					                                <br/>
					                                <br/>
					                                <input myattr="email" type="text" className="form-control" id="sign-up-email"  
					                                  	placeholder="Email" required="" autoFocus="" value = {this.props.currentEmailAddress} />
					                                <br/>
					                                {this.props.signingUp ?
					                                    <button type="button" id="identicalbtn"  value="Sign Up" className="btn btn-primaryhome page-scroll" disabled >signing you up ...</button>
					                                :
					                                	<button type="button"  value="Sign Up" className="btn btn-primaryhome page-scroll" id="sign-up-send-enrollment">Sign Up</button>
					                                }
					                                <a className = "havent-received-email">Haven't received email?</a>
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
export default withTracker(() =>{
	return {
		isSendEmailAgainActive : isSendEmailAgainActive.get(),
		sendEmailAgainModuleInfo : sendEmailAgainModuleInfo.get(),
		currentEmailAddress : currentEmailAddress.get(),
		signingUp : signingUp.get(),
		messageOfSendAgainEmail : messageOfSendAgainEmail.get()
	}
})(WelcomeToOnlineMocks);