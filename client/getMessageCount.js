Template.getMessageCount.getMessages = function(){
	return Meteor.user().inbox.length;
}
