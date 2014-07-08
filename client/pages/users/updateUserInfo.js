Template.updateUserInfo.events = {
	'click button[name=updateProfile]': function(event,template){
		event.preventDefault();
		var stats = {};
		var firstname= template.find("input[name=firstname]").value;
		var lastname = template.find("input[name=lastname]").value;
		var emailNew = template.find("input[name=emailShow]").value;
		stats.firstname = firstname;
		stats.lastname = lastname;
		stats.email = emailNew;
		Meteor.call('updateProfile',stats,Meteor.userId());
		Session.set("editingProfile",false);
	}
}
