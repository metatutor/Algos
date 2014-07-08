Meteor.methods({
	'sendNotification': function(sendTo,message){
		Meteor.users.update({
			username:sendTo
		},{
			$push:{
				inbox:message
			}
		});
	},
	'deleteInbox': function(user){
		Meteor.users.update({
			_id:user
		},{
			$set:{
				inbox:[]
			}
		});
	}
});
