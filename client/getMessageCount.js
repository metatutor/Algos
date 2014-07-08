Template.getMessageCount.getMessages = function(){
	return Meteor.user().profile.inbox.length;
}
