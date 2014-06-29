Meteor.startup(function(){
	Session.set("showMore",false);
	Session.set("userSearch",null);
});

Template.home.events = {
	'submit': function(event, template){
		event.preventDefault();
		Session.set("showMore",true);
		var usrField = template.find("input[name=submitQuery]");
		Session.set("userSearch",usrField.value);
	},
	'click button[name=showLess]': function(){
		Session.set("userSearch",null);
	}
}

Template.home.userLookedFor = function(){
	var userValue = Session.get("userSearch");
	return !(userValue===null);
}

Template.home.getUserName = function(){
	var name = Session.get("userSearch");
	return name;
}
