Accounts.onCreateUser = function(options,user){
	if(options.profile){
		user.profile=user.profile;
	}
	user.algorithmContributions = [];
	user.awards = [];
	user.points = 1;
	return user;
});

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
		Session.set("showMore",true);
		var usrField = template.find("input[name=query]");
		Session.set("searchQuery",usrField.value);
	}
}

Template.nav.somethingLookedFor = function(){
	var value = Session.get("searchQuery");
	return !(value===null);
}

Template.nav.isValidQuery = function(){
	return getAmountResults();
}

Template.nav.getRelevantInfo = function(){
	var info = Session.get('searchQuery');
	var userArray = Meteor.users.find({username:info}).fetch();
	var aidArray = AlgoPedia.find({AiD:info}).fetch();
	var algoArray = AlgoPedia.find({Name:info}).fetch();
	return algoArray.concat(aidArray).concat(userArray);
}

Template.nav.newAlgos = function(){
	var amount = Session.get("showAmount");
	return AlgoPedia.find( {}, {sort: { When: -1},limit:amount});
}

var getAmountResults = function(){
	var info = Session.get('searchQuery');
	var userSearch = Meteor.users.find({username:info}).count();
	var aidSearch = AlgoPedia.find({AiD:info}).count();
	var algoSearch = AlgoPedia.find({Name:info}).count();
	var entries = userSearch+aidSearch+algoSearch;
	return entries;
}

Template.nav.isUser = function(obj){
	return obj.hasOwnProperty('username');
}

Template.nav.isAlgo = function(obj){
	return obj.hasOwnProperty('AiD');
}

Template.nav.getName = function(userDoc){
	if(userDoc.hasOwnProperty('profile')){
		return userDoc.profile.firstname+' '+userDoc.profile.lastname;
	}
	return 'Not yet provided.'
}

Template.nav.goToUser = function(userDoc){
	Router.go('users', {_id:userDoc.username});
}

Template.nav.goToAlgo = function(algoDoc){
	Router.go('pedia', {_id:algoDoc.AiD});
}
