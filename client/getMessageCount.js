Template.getMessageCount.getMessages = function(){
	return Meteor.user().inbox.length;
}

Template.getMessageCount.canGet = function(){
	if(Meteor.user()){
		return Meteor.user().hasOwnProperty('inbox');
	}
	return;
}
