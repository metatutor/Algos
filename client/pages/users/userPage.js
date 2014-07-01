Meteor.startup( function(){
	Session.set("editingProfile",false);
});
Template.userPage.userExists = function(){
	return !(Session.get("lastUserSearch")===undefined);
}
Template.userPage.events = {
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

Template.userPage.isEditing = function(){
	var stat = Session.get("editingProfile");
	return stat;
}

Template.userPage.getName = function(){
	var user = Session.get("lastUserSearch");
	if(user.hasOwnProperty('profile')){
		return user.profile.firstname+' '+user.profile.lastname;
	}
	return "not yet set";
}
Template.userPage.getEmail = function(){
	var user = Session.get("lastUserSearch");
	if(user.hasOwnProperty('emails')){
		return user.emails[0].address;
	}
	return 'email not found';
}
Template.userPage.getUserName = function(){
	var user = Session.get("lastUserSearch");
	return user.username;
}

Template.userPage.noContributions = function(){
	var user = Session.get("lastUserSearch");
	if(user.hasOwnProperty('profile')){
		if(user.profile.hasOwnProperty('algorithmContributions')){
			var count = user.profile.algorithmContributions.length;
			if(count===0){
				return true;
			}
			return false;
		}
	}
	return true;
}

Template.userPage.getContributions = function(){
	var user = Session.get("lastUserSearch");
	return user.profile.algorithmContributions;
}

Template.userPage.isMyProfile = function(){
	var user = Session.get("lastUserSearch");
	return user.username===Meteor.user().username;
}
