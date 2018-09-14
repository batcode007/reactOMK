export function submitFeedback(feedback){
	feedback = 'TEST NAMAN';
	Meteor.call('SendEmail', Meteor.settings.public.techEmailId, Meteor.settings.public.adminEmailId,
        'Feedback from ' + Meteor.user().profile.first_name + ' ' + Meteor.user().profile.last_name + ' EmailId: ' + Meteor.user().emails[0].address, feedback);
           
    var reportDetails = {};
    reportDetails.type = "feedbackFromStudent";
    reportDetails.problem = feedback;
    reportDetails.user_id = Meteor.userId();
    reportDetails.reportTime = new Date();

    // Meteor.call("addReportProblem", reportDetails, function(err, res){
    // 	$('.show_status').text("Thank you for your feedback! Closing popup");
    //     $("#feedbackModal").modal('hide');
    //     $('.show_status').text('');
    //     $('.feedback-body').val('');
    // });
}