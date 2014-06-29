Meteor.startup(function(){
	Session.set("showMore",false);
	Session.set("userSearch",null);
});

Template.home.events = {
	'submit': function(event, template){
		event.preventDefault();
		Session.set("showMore",true);
		var usrField = template.find("input[name=query]");
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

Template.home.isValidName = function(){
	var name = Session.get('userSearch');
	var userInfo = getInfoByName(Meteor.users.find().fetch(),name);
	return !(userInfo===null);
}

Template.home.getUserInfo = function(){
	var name = Session.get("userSearch");
	var userInfo = getInfoByName(Meteor.users.find().fetch(),name);
	var userList = [];
	userList[0] = userInfo;
	return userList;
}

var getInfoByName = function(docs,uname){
	var i =0;
	while(i<docs.length){
		if(docs[i]["username"]===uname){
			return docs[i];
		}
		i++;
	}
	return null;
}
