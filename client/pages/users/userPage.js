Template.userPage.whichUser = function(){
	return Session.get("lastUserSearch");
}

Meteor.startup( function(){
	Session.set("editingProfile",false);
});

Template.userPage.userExists = function(){
	return !(Session.get("lastUserSearch")===undefined);
}

Template.userPage.events = {
	'click button[name=changeInfo]': function(){
		if(Session.equals('editingProfile',false)){
			Session.set("editingProfile",true);
		}
		else{
			Session.set("editingProfile",false);
		}
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

Template.userPage.isMyProfile = function(){
	var user = Session.get("lastUserSearch");
	return user.username===Meteor.user().username;
}
