Template.updateUserInfo.events = {
	'submit': function(event,template){
		event.preventDefault();
		var stats = {};
		var firstname= template.find("input[name=firstname]").value;
		var lastname = template.find("input[name=lastname]").value;
		stats.firstname = firstname;
		stats.lastname = lastname;
		Meteor.call('updateProfile',stats,Meteor.userId());
		Session.set("editingProfile",false);
	}
}
