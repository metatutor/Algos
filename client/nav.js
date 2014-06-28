Accounts.ui.config(
		{ passwordSignupFields: 'USERNAME_AND_EMAIL' }
);

Template.nav.notRegistered = function(){
	var currentUser = Meteor.user();
	return !currentUser.emails["verified"];
}
