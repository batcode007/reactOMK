import {CommonSettings} from '../imports/api/commonSettings.js';

Meteor.startup(function() {
    if (CommonSettings.find().count() == 0) {
        var publicJson = {
            "techEmailId" : "tech123.omk@gmail.com",
            "adminEmailId" : "admin@onlinemocks.com",
            "notificationPagination" : 5,
            "milestonePageReadyStatus" : "You may Start now",
            "minimumTimeforQuestionSpeedTest" : 15,
            "minimumTimeforCommonDataSpeedTest" : 15,
            "milestonePagePreapareStatus" : "Building your activity",
            "exerciseReshufflePositionThreshold" : 4,
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
                2, 
                1
            ],
            "speedTestLife" : 1,
            "speedTestNoOfCorrectAttempt" : 5,
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
                "Great. Correct Answer", 
                "Wonderful. You are awesome!", 
                "Very Nice. Great going!!", 
                "Good Choice!", 
                "That’s correct! Way to go!!!", 
                "You’re making progress!", 
                "You’re on a roll!", 
                "Simply Brilliant!", 
                "Yes! Now you’re using your brain power."
            ],
            "AllcorrectAnswerFeedback" : [ 
                "Congrats! Activity completed successfully ", 
                "Activity done"
            ],
            "wrongAnswerFeedback" : [ 
                "Oops. Going wrong", 
                "Wrong. You need to work hard :(", 
                "Incorrect!", 
                "Why didn’t you think about this once again!", 
                "C’mon! You can do better!", 
                "You made a trivial mistake!!", 
                "Incorrect! Better luck next time!!", 
                "This answer is not correct!"
            ],
            "AllwrongAnswerFeedback" : [ 
                "Sorry. You failed the test!", 
                "Activity Failed!", 
                "Failed! Better luck next time!"
            ],
            "timeOutValueDecisionTest" : 30000,
            "timeOutMessageDecisionTest" : [ 
                "TimeOut. Too much time to decide. Life reduced. Moving on to the next question."
            ],
            "QuestiontimeOutMessageDecisionTest" : [ 
                "Time Out. Too much time to solve the question. Life reduced!"
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
            "minimumThresholdTimeForQuestion" : 1,
            "dummyPercentileSpecificData" : {
                "0" : {
                    "lr" : 420,
                    "di" : 420,
                    "qa" : 420,
                    "verbal" : 420
                },
                "80" : {
                    "lr" : 180,
                    "di" : 180,
                    "qa" : 180,
                    "verbal" : 180
                },
                "95" : {
                    "lr" : 120,
                    "di" : 120,
                    "qa" : 60,
                    "verbal" : 90
                },
                "99" : {
                    "lr" : 90,
                    "di" : 90,
                    "qa" : 40,
                    "verbal" : 65
                },
                "100" : {
                    "lr" : 60,
                    "di" : 60,
                    "qa" : 30,
                    "verbal" : 45
                }
            },
            "mapTablePercentileVsPercentage" : {
                "80" : 75,
                "85" : 80,
                "90" : 85,
                "95" : 90,
                "99" : 95,
                "100" : 100
            },
            "dummyPercentileData" : {
                "lr" : {
                    "0" : 420,
                    "80" : 180,
                    "90" : 150,
                    "95" : 120,
                    "99" : 90,
                    "100" : 60
                },
                "di" : {
                    "0" : 420,
                    "80" : 180,
                    "90" : 150,
                    "95" : 120,
                    "99" : 90,
                    "100" : 60
                },
                "qa" : {
                    "0" : 420,
                    "80" : 180,
                    "90" : 120,
                    "95" : 60,
                    "99" : 40,
                    "100" : 30
                },
                "verbal" : {
                    "0" : 420,
                    "80" : 180,
                    "90" : 135,
                    "95" : 90,
                    "99" : 65,
                    "100" : 45
                }
            }
        }
        CommonSettings.insert({
            type: "General",
            public: publicJson
        });
    }
});