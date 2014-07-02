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
	},
	'submit': function(event, template){
		event.preventDefault();
		var queryField = template.find("input[name=query]");
		goToSearch(queryField.value);
	}
}

var goToSearch = function(query){
	Router.go('search', {_id:query});
}
