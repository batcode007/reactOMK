import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";
import { Courses } from '../imports/api/courses.js';
import {userCourseMap} from '../imports/api/userCourseMap.js';
import {CommonSettings} from '../imports/api/commonSettings.js';
import {ReportProblem} from '../imports/api/reportProblem.js';
import {QuestionBank} from '../imports/api/questionBank.js';
import {CourseMap} from '../imports/api/courseMap.js';

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});

userObject = (function() {

    var addUser = function(user) {
        var user_id = Accounts.createUser({
            username: user.email,
            email: user.email,
            profile: user.profile
        });
        return user_id
    }

    var sendEnrollmentLink = function(userId) {
        
        Meteor.setTimeout( function(){
            Accounts.sendEnrollmentEmail(userId);
        }, 50);
    }

    return {
        addUser: addUser,
        sendEnrollmentLink:sendEnrollmentLink
    }
})();

var sendEnrollmentLinkAgain = function( user ){

    var userId = user._id;
    var enrollmentLink = getEnrollmentLink( user )
    var from = Accounts.emailTemplates.from;
    var subject = Accounts.emailTemplates.enrollAccount.subject( user );
    var text = Accounts.emailTemplates.enrollAccount.text( user, enrollmentLink );
    var to = user.emails[0].address;

    Meteor.setTimeout( function(){
        Meteor.call("SendEmail", to, from, subject, text);
    }, 50);
}

var isPasswordTokenExpired = function( user ){

    if( user.services.password === undefined || user.services.password.reset === undefined)
        return true;
    else
        return false
}

var modularReport = function( reportProblemId ){

    var reportProblemOb = ReportProblem.findOne( reportProblemId ); 
    var questionObject = QuestionBank.findOne( reportProblemOb.questionBankId );
    var questionName = questionObject.name;
    var userOb = Meteor.users.findOne( reportProblemOb.user_id );
    var uname = userOb.username;                        
    var prob = reportProblemOb.problem;
    var questSubId = reportProblemOb.questionSubId ;
    var dateTime = reportProblemOb.reportTime;

    var oneBasedQuestionId = questSubId + 1
    var email = {
            to: 'omk.content@gmail.com',            
            from: 'admin@onlinemocks.com',
            subject: "Student reported problem on Question",
            text: "Question Name: "+ questionName + "\n\nQuestion SubID : "+ oneBasedQuestionId +
             "\n\nQuestion Statement : "+ questionObject.questions[questSubId].statement +
             "\n\nUser Reported Problem : "+ uname + "\n\nProblem : "+ prob + "\n\nDate : "+ dateTime
        }; 

    Meteor.call("SendEmail", email.to, email.from, email.subject, email.text);

}



Meteor.publish('myUserCourseMap', function() { //Change this later to user specific
    if (this.userId) {
        return userCourseMap.find({
            user_id: this.userId
        });
    }
});

Meteor.methods({

    allCourseNames(){
        return Courses.find({}, {fields : {name : 1}}).fetch();
    },

    courseName(courseId){
        return Courses.findOne(courseId).name;
    },

    courseMapName(courseMapId){
        return CourseMap.findOne(courseMapId).name;
    },

    courseMapStructure(courseMapId){
        console.log('courseMapStructure server check');
        return CourseMap.findOne(courseMapId).course_map_structure;
    },

    commonSettings(type){
        return CommonSettings.findOne({type : type});

    },

    course(courseId){
        return Courses.findOne(courseId);
    },

    SendEmail: function(to, from, subject, text) {
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    },

    addReportProblem:function(reportDetails){
        reportDetails.serverTime = new Date();
        var reportProblemId = ReportProblem.insert(reportDetails);
        if( reportDetails.type === "question" ){
            modularReport(reportProblemId); 
        }
    },

    sendEnrollmentEmailAgain: function( args ){

        try{

            var userEmailId = args.emailId;
            var userAccount = Accounts.findUserByEmail( userEmailId );
            if ( userAccount === undefined || userAccount === null ) {
                throw "email-not-exist";
            }
            var userId = userAccount._id;
            var isEmailVerified = userAccount.emails[0].verified;
            if( isEmailVerified === true ){
                throw "email-already-verified";
            }
            if( isPasswordTokenExpired( userAccount ) === true ){
                userObject.sendEnrollmentLink( userId );
            }else{
                sendEnrollmentLinkAgain( userAccount );
            }
            return "Email resent on " + userEmailId;
        }catch(e){
            var reasonForError = "Apologise. Some error came while sending email. Please contact to " + Meteor.settings.public.techEmailId + " Thanks!";
            if ( e === "email-not-exist"){
                reasonForError = "Email Id doesn't exist. Please SignUp. Thanks!";
            }else if( e === "email-already-verified"){
                reasonForError = "Email Id already verified. Thanks!";
            }
            throw new Meteor.Error( e, reasonForError );
        }
    },

    SignUp: function( thisuser) {

        var result = {
            msg:"",
            status: false
        }

        try {

            if ( Accounts.findUserByEmail( thisuser.email ) === undefined ) {
                var userId = userObject.addUser(thisuser);
                if (!userId) {
                    result.msg = "Some error came while signing you up.";
                }
            }
            var user = Accounts.findUserByEmail( thisuser.email );
            var userId = user._id;
            if( user.emails[0].verified === false ){
                if( isPasswordTokenExpired( user ) === true ){
                    userObject.sendEnrollmentLink( userId );
                    result.status = true;
                }else{
                    sendEnrollmentLinkAgain( user )
                    result.status = true;
                }
            }else{
                result.msg = 'User Already Exists.';
            }
            if( result.status === true ){
                result.msg = 'Thank you! You should be receiving an email on the ' + user.username + ' shortly for an enrollment link.'
            }else{
                result.msg += " Please Contact to " + Meteor.settings.public.techEmailId + " if you find any difficulty in signing up. Thanks!"
            }
            return result;
        } catch (e) {
            console.log("Error while user Signup with mail Id "+ thisuser.email+ " Error " + e );
            return {
                msg: "Apologise. Some error came while signing you up. Please contact to " + Meteor.settings.public.techEmailId + " Thanks!",
                status: false
            };
        }
    },

    studentAvailableCourses(subscribedCourseIds){
        return Courses.find({_id : {$nin : subscribedCourseIds}}).fetch();
    }
});



/*
Setting up the SMTP service through google SMTP server
*/
Meteor.startup(function () {
  smtp = {
    username: 'admin@onlinemocks.com',   // eg: server@gentlenode.com
    password: 'pramit123',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Meteor.startup(function() {
    // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
    Accounts.emailTemplates.from = 'Admin <no-reply@onlinemocks.com>';

    // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
    Accounts.emailTemplates.siteName = 'OnlineMocks';

    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.enrollAccount.subject = function(user) {
        return 'Welcome to OnlineMocks ' + user.profile.first_name;
    };

    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.enrollAccount.text = function(user, url) {
        
    url =url.replace("localhost","onlinemocks.com");
    

    var settingsCommon = CommonSettings.findOne();
    console.log('settingsCommon : ' + settingsCommon._id);
    var emailText = settingsCommon.public.enrolmentEmailText;
    console.log('emailText : ' + emailText);
    emailText =emailText.replace("$userProfileName$",user.profile.first_name);
    emailText =emailText.replace("$registerLink$",url);

    return emailText.toString();

    };

  Accounts.emailTemplates.resetPassword.text = function (user, url) {
     // Overrides value set in Accounts.emailTemplates.from when resetting passwords
     url =url.replace("localhost","onlinemocks.com");
     return "\nHello "+user.profile.first_name+",\n\nTo reset your password, simply click the link below.\n\n "+ url;
  };
});



Meteor.startup(function() {
    if (CommonSettings.find().count() == 0) {
        var publicJson = {
            "techEmailId" : "tech.omk@gmail.com",
            "adminEmailId" : "admin@onlinemocks.com",
            "notificationPagination" : 5.0,
            "milestonePageReadyStatus" : "You may Start now",
            "minimumTimeforQuestionSpeedTest" : 15.0,
            "minimumTimeforCommonDataSpeedTest" : 15.0,
            "milestonePagePreapareStatus" : "Building your activity",
            "exerciseReshufflePositionThreshold" : 4.0,
        "get_display_message_list" : {
            "0" : [ 
                "Uh-oh! Earn at least 1 Star to pass this Test."
            ],
            "1" : [ 
                "Kudos! You just passed this Test. Try harder in the next one."
            ],
            "2" : [ 
                "Great! You are a Star."
            ],
            "3" : [ 
                "You’ve got 3 Stars in this Test. You’re awesome!"
            ],
            "-1" : [ 
                "You just passed with too many errors. Retake to earn stars."
            ]
        },
        "get_display_message_list_exerciseSpecific" : {
            "0" : [ 
                "You just passed with too many errors. Retake to earn stars."
            ]
        },
        "get_display_message_list_last" : {
            "0" : [ 
                "Sorry! You've failed in the activity. You can re-attempt it to improve your performance."
            ],
            "1" : [ 
                "In case you want to improve your performance or practise more, reattempt the activity"
            ],
            "2" : [ 
                "In case you want to improve your performance or practise more, reattempt the activity"
            ],
            "3" : [ 
                "In case you want to improve your performance or practise more, reattempt the activity"
            ],
            "-1" : [ 
                "You just passed with too many errors. Retake to earn stars."
            ]
        },
        "unlockedMilestoneText" : "A new Milestone- ",
        "unlockActivityText" : "A new Activity- ",
        "noOfMileCanInRow" : [ 
            4.0, 
            3.0
        ],
        "speedTestLife" : 1.0,
        "speedTestNoOfCorrectAttempt" : 5.0,
        "activity_instruction" : {
            "Exercise" : "The objective of an Exercise is to expose students to sufficient number of questions for practice. Here, the student gets feedback (right/wrong) after attempting every Question.",
            "Speed Test" : "The Speed Test gives a measure of how fast a student is able to correctly attempt the question in a given topic. The student will be setup against three more students and all competitors will be required to answer 5 questions correctly in the least time possible.",
            "Decision Test" : "It is important for a student to identify the difficulty level of questions. A Decision Test enables students to take the right call regarding the time in which they can attempt a question.",
            "Concept Test" : "Conceptual clarity is a must when preparing for exams like CAT. A Concept Test aims to ensure whether or not a student has attained certain level of competency in a given topic. There is no time limit to attempt the questions.",
            "Modal Test" : "The purpose of this activity is to prepare you for a full-length test situation, quite similar to the one that you could have in CAT examination. Your full score will be presented at the end of the submission of all the answers.",
            "EXERCISE" : "The objective of an Exercise is to expose students to sufficient number of questions for practice. Here, the student gets feedback (right/wrong) after attempting every Question.",
            "SPEED-TEST" : "The Speed Test gives a measure of how fast a student is able to correctly attempt the question in a given topic. The student will be setup against three more students and all competitors will be required to answer 5 questions correctly in the least time possible.",
            "DECISION-TEST" : "It is important for a student to identify the difficulty level of questions. A Decision Test enables students to take the right call regarding the time in which they can attempt a question.",
            "CONCEPT-TEST" : "Conceptual clarity is a must when preparing for exams like CAT. A Concept Test aims to ensure whether or not a student has attained certain level of competency in a given topic. There is no time limit to attempt the questions.",
            "MODAL-TEST" : "The purpose of this activity is to prepare you for a full-length test situation, quite similar to the one that you could have in CAT examination. Your full score will be presented at the end of the submission of all the answers."
        },
        "speedTestPickFromAdmin" : true,
        "activity_description" : {
            "Exercise" : "This is a Excercise",
            "Speed Test" : "This is a speed test",
            "Decision Test" : "This is a decision test",
            "Concept Test" : "This is a concept test",
            "Modal Test" : "This is a modal test"
        },
        "welcome_message" : [ 
            "Welcome to OnlineMocks!"
        ],
        "rightAnswerFeedback" : [ 
            "<p>Great. Correct Answer</p>", 
            "<p>Wonderful. You are awesome!</p>", 
            "<p>Very Nice. Great going!!</p>", 
            "<p>Good Choice!</p>", 
            "<p>That’s correct! Way to go!!!</p>", 
            "<p>You’re making progress!</p>", 
            "<p>You’re on a roll!</p>", 
            "<p>Simply Brilliant!</p>", 
            "<p>Yes! Now you’re using your brain power.</p>"
        ],
        "AllcorrectAnswerFeedback" : [ 
            "<p>Congrats! Activity completed successfully</p> ", 
            "<p>Activity done</p>"
        ],
        "wrongAnswerFeedback" : [ 
            "<p>Oops. Going wrong</p>", 
            "<p>Wrong. You need to work hard :(</p>", 
            "<p>Incorrect!</p>", 
            "<p>Incorrecto! Take a moment to think about this once again!</p>", 
            "<p>C’mon! You can do better!</p>", 
            "<p>You made a trivial mistake!!</p>", 
            "<p>Incorrect! Better luck next time!!</p>", 
            "<p>This answer is not correct!</p>"
        ],
        "AllwrongAnswerFeedback" : [ 
            "<p>Sorry. You failed the test!</p>", 
            "<p>Activity Failed!</p>", 
            "<p>Failed! Better luck next time!</p>"
        ],
        "timeOutValueDecisionTest" : 30000.0,
        "timeOutMessageDecisionTest" : [ 
            "<p>TimeOut. Too much time to decide. Life reduced. Moving on to the next question.</p>"
        ],
        "QuestiontimeOutMessageDecisionTest" : [ 
            "<p>Time Out. Too much time to solve the question. Life reduced!</p>"
        ],
        "welcomeMessage" : [ 
            "Hello! Welcome to OnlineMocks."
        ],
        "percentilerToCompeteWithSpeedTest" : [ 
            "99", 
            "95", 
            "80"
        ],
        "percentilerNameToCompeteWith" : [ 
            "CAT 99 Percentiler", 
            "CAT 95 Percentiler", 
            "CAT 80 Percentiler"
        ],
        "competitorObject" : {
            "CAT 99" : {
                "name" : "CAT 99",
                "percentile" : "99",
                "percentage" : "95"
            },
            "CAT 95" : {
                "name" : "CAT 95",
                "percentile" : "95",
                "percentage" : "85"
            },
            "CAT 80" : {
                "name" : "CAT 80",
                "percentile" : "80",
                "percentage" : "75"
            }
        },
        "speedTestQuestionBasedTime" : true,
        "minimumThresholdTimeForQuestion" : 1.0,
        "dummyPercentileSpecificData" : {
            "0" : {
                "lr" : 420.0,
                "di" : 420.0,
                "qa" : 420.0,
                "verbal" : 420.0
            },
            "80" : {
                "lr" : 180.0,
                "di" : 180.0,
                "qa" : 180.0,
                "verbal" : 180.0
            },
            "95" : {
                "lr" : 120.0,
                "di" : 120.0,
                "qa" : 60.0,
                "verbal" : 90.0
            },
            "99" : {
                "lr" : 90.0,
                "di" : 90.0,
                "qa" : 40.0,
                "verbal" : 65.0
            },
            "100" : {
                "lr" : 60.0,
                "di" : 60.0,
                "qa" : 30.0,
                "verbal" : 45.0
            }
        },
        "mapTablePercentileVsPercentage" : {
            "80" : 75.0,
            "85" : 80.0,
            "90" : 85.0,
            "95" : 90.0,
            "99" : 95.0,
            "100" : 100.0
        },
        "dummyPercentileData" : {
            "lr" : {
                "0" : 420.0,
                "80" : 180.0,
                "90" : 150.0,
                "95" : 120.0,
                "99" : 90.0,
                "100" : 60.0
            },
            "di" : {
                "0" : 420.0,
                "80" : 180.0,
                "90" : 150.0,
                "95" : 120.0,
                "99" : 90.0,
                "100" : 60.0
            },
            "qa" : {
                "0" : 420.0,
                "80" : 180.0,
                "90" : 120.0,
                "95" : 60.0,
                "99" : 40.0,
                "100" : 30.0
            },
            "verbal" : {
                "0" : 420.0,
                "80" : 180.0,
                "90" : 135.0,
                "95" : 90.0,
                "99" : 65.0,
                "100" : 45.0
            }
        },
        "layoutPopup" : true,
        "firstPopupBody" : "Dear User,<br>First time users of OnlineMocks can reset their passwords only through laptop and desktop. Please launch the application password reset URL received in your email from a desktop/laptop. The same email also has instructions to download the mobile app.<br> Thank you!",
        "firstPopupHeading" : "OnlineMocks User Alert",
        "mobileURL" : "https://drive.google.com/drive/folders/0B41vB7qwxdPScHJZTlJxd0Rlc0U",
        "enrolmentEmailText" : "\nHey $userProfileName$,\n\nWe’re excited to have you at ONLINEMOCKS - the first of its kind Online Preparatory Course for CAT.\n\nGet thorough in your Concepts, Enhance your Speed and Improve your Decision-making abilities by testing on our specially crafted Activity Tests.Trust us when we say this,it is going to be something truly magical.\n\nStart your journey by setting your password: $registerLink$ \n\nThe first step to your journey will be a SWOT Test that will analyze your Strengths, Weaknesses, Opportunities & Threats adaptively and will guide your prep's next steps.\n\nFor any technical trouble, do reach out to the team @OnlineMocks by using the link at the top right hand on home page.\n\nCheers !!!\nOnlineMocks Team",
        "fltInfo" : {
            "ifStudentCanSeeTheTest" : true,
            "messageForStudents" : "OMCATs starting from May 01 2018"
        },
        "yearBatch" : "2017",
        "noMobileText" : "Website not available on mobile and tablets",
        "signUpInfo" : {
            "sendEnrollmentEmailDelay" : 15000.0
        }
    }
        CommonSettings.insert({
            type: "General",
            public: publicJson
        });
    }
});