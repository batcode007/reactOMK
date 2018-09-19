import {userCourseMap} from '../../imports/api/userCourseMap.js';

StudentCourseClass = function ( userId, courseId, courseMapStructure ){

	var uCM = userCourseMap.findOne({user_id:userId, course_id: courseId});
	let maxNoOfStars = 5;
	this.tagWisecompletion = {};
	this.courseId = courseId;
	this.courseMapStructure = courseMapStructure;
	this.starsGained = function () { 

		var totalStars = uCM.total_stars_gathered;
	    var totalMilestones = uCM.num_of_milestones_unlocked;
	    var gold = totalStars ? Math.floor((totalStars / totalMilestones)) : 0;
	    return gold;

	}

	this.maxNoOfStars = function () {
		return maxNoOfStars;
	}

	this.getCourseCompletionInfo = function (){
		const self = this;
	    Meteor.call('course', self.courseId, function(err, res){
	    	if(res){
	    		var course = res;
	    		var courseMapMilestoneIds = self.courseMapStructure;
			    var courseTopicsTree = course.course_topics_classification;
			    var courseCompletion = {};
			    var completion = [];


			    _.each(courseMapMilestoneIds, function (mileId) {
			        
			        // var milestone = milestones.findOne(mileId);
			        // if ( milestone.type != "ROOT-MILESTONE" && milestone.type != "END-MILESTONE" ) {

			        // 	if( uCM.my_milestones[mileId] != undefined ){

				       //      if (!uCM.my_milestones[mileId].skipped) { // to not include the skipped milestone in course completion status

				       //          var tags = milestone.topic_tags.concat(courseTopicsTree[milestone.topic_tags[
				       //              0]].parent);
				       //          _.each(tags, function(tag) {
				       //              if (courseCompletion[tag]) {
				       //                  courseCompletion[tag].total++;
				       //                  courseCompletion[tag].passed += ((uCM.my_milestones[mileId].passed) ?
				       //                      1 : 0);

				       //              } else {
				       //                  courseCompletion[tag] = {
				       //                      total: 1,
				       //                      passed: ((uCM.my_milestones[mileId].passed) ? 1 : 0)
				       //                  };
				       //              }
				       //          });
				       //      }

				       //  }    
			            
			        // }

			    });

			    
			    var noOfcompletedMilestones = 0; //which user has completed
			    var noOfMilestones = 0; //t

			    _.each(courseTopicsTree[course.name].children, function (tag) {
				        
				        completion.push({
				            passed: courseCompletion[tag] ? courseCompletion[tag].passed : 0,
				            total: courseCompletion[tag] ? courseCompletion[tag].total : 0,
				            key: tag,
				            percentage: courseCompletion[tag] ? Math.round((courseCompletion[tag]
				                .passed * 100) / courseCompletion[tag].total) : 0
				        });
				        
				        noOfcompletedMilestones += courseCompletion[tag] ? courseCompletion[tag]
				            .passed : 0;
				        
				        noOfMilestones += courseCompletion[tag] ? courseCompletion[tag].total :
				            0;

			    });
			   

			    //It is hardcoded we can do it better
			    _.each(completion, function (compl) {
			        if (compl.key === "Quantitative Ability")
			            compl.shortName = "QA";
			        else if (compl.key === "Verbal")
			            compl.shortName = "VA";
			        else if (compl.key === "DI and LR")
			            compl.shortName = "DI-LR";
			        else
			            compl.shortName = compl.key;
			    });

			    self.noOfcompletedMilestones = noOfcompletedMilestones;
			    self.noOfMilestones = noOfMilestones;
			    self.tagWisecompletion = completion;	    		
			}
		})
	}
	this.getCourseCompletionInfo();
}