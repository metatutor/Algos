Meteor.startup(function(){
	Session.set("showMore",false);
});

Template.nav.events = {
	'click button[name=dismissInbox]':function(event,template){
		event.preventDefault();
		Meteor.call('deleteInbox',Meteor.user()._id);
	},
	'click a[name=github]':function(event,template){
		event.preventDefault();
		Meteor.loginWithGithub(function(err){
			console.log(err);
		});
	},
	'click a[name=google]':function(event,template){
		event.preventDefault();
		Meteor.loginWithGoogle(function(err){
			console.log(err);
		});
	},
	'click a[name=logout]':function(event,template){
		event.preventDefault();
		Meteor.logout();
	}
}

Template.nav.userID = function(){
	if(Meteor.user()===undefined){
		return;
	}
	return {_id:Meteor.user()._id};
}

Template.nav.getName = function(){
	var user = Meteor.user();
	if(user===undefined){
		return;
	}
	return user.profile.firstname+' '+user.profile.lastname;
}
