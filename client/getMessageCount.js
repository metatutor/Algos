Template.getMessageCount.getMessages = function(){
	return Meteor.user().inbox.length;
}

Template.getMessageCount.canGet = function(){
	return Meteor.user().hasOwnProperty('inbox');
}
