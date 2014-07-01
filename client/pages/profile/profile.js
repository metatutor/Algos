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

Template.profile.getName = function(){
	if(Meteor.user().hasOwnProperty('profile')){
		return Meteor.user().profile.firstname+' '+Meteor.user().profile.lastname;
	}
	return "not yet set";
}
Template.profile.getEmail = function(){
	if(Meteor.user().hasOwnProperty('emails')){
		return Meteor.user().emails[0].address;
	}
	return 'email not found';
}
Template.profile.getUserName = function(){
	return Meteor.user().username;
}

Template.profile.noContributions = function(){
	if(Meteor.user().hasOwnProperty('profile')){
		if(Meteor.user().profile.hasOwnProperty('algorithmContributions')){
			var count = Meteor.user().profile.algorithmContributions.length;
			if(count===0){
				return true;
			}
			return false;
		}
	}
	return true;
}

Template.profile.getContributions = function(){
	return Meteor.user().profile.algorithmContributions;
}
