Template.getMessageCount.getMessages = function(){
	return Meteor.user().profile.inbox.length;
}

Template.getMessageCount.canGet = function(){
	return Meteor.user().profile.hasOwnProperty('inbox');
}
