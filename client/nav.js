Accounts.ui.config(
		{ passwordSignupFields: 'USERNAME_AND_EMAIL' }
);

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
	}
}
