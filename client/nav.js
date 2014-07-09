Accounts.ui.config(
		{ passwordSignupFields: 'USERNAME_AND_EMAIL' }
);

Meteor.startup(function(){
	Session.set("showMore",false);
	Session.set("searchQuery",null);
});

Template.nav.notRegistered = function(){
	var currentUser = Meteor.user();
	if(currentUser.hasOwnProperty('emails')){
		if(currentUser.emails.length<0){
			return false;
		}
		return !(currentUser.emails[0]["verified"]);
	}
	return false;
}

Template.nav.events = {
	'click button[name=verify]': function(){
		Meteor.call("sendEmail",Meteor.userId());
		alert('Verification Email sent');
	},
	'click button[name=dismissInbox]':function(event,template){
		event.preventDefault();
		Meteor.call('deleteInbox',Meteor.user()._id);
	}
}

Template.nav.getStats = function(){
	return (LSIs.find().count() +' implementations for '+AlgoPedia.find().count()+' algorithms in '+Languages.find().count()+' languages.');
}
