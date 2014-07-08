Meteor.methods({
	'sendNotification': function(sendTo,message){
		Meteor.users.update({
		username:sendTo
	},{
		$addToSet:{
			'profile.inbox':message
		}
	});
	}
});
