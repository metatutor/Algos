Template.getInbox.noMail = function(){
	return Meteor.user().profile.inbox.length===0;
}

Template.getInbox.message = function(){
	return Meteor.user().profile.inbox;
}
