Meteor.startup( function(){
	Session.set("editingProfile",false);
});
Template.profile.events = {
	'click button[name=changeInfo]': function(){
		Session.set("editingProfile",true);
	},
	'submit': function(event,template){
		event.preventDefault();
		var stats = {};
		var firstname= template.find("input[name=firstname]");
		var lastname = template.find("input[name=lastname]");   
		stats.firstname = firstname.value;
		stats.lastname = lastname.value;
		Meteor.call('updateProfile',stats,Meteor.userId());
		Session.set("editingProfile",false);
	}
}

Template.profile.isEditing = function(){
	var stat = Session.get("editingProfile");
	return stat;
}
