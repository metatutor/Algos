Template.getInbox.noMail = function(){
	return Meteor.user().profile.inbox.length===0;
}
