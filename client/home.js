Meteor.startup(function(){
	Session.set("showMoreUser",false);
	Session.set("userSearch",null);
	Session.set("algoSearch",null);
	Session.set("showAmount",5);
	Session.set("showMoreAlgo",false);
});

Template.home.events = {
	'submit': function(event, template){
		event.preventDefault();
		Session.set("showMoreUser",true);
		var usrField = template.find("input[name=userQuery]");
		Session.set("userSearch",usrField.value);
	},
	'click button[name=showLessUser]': function(){
		Session.set("userSearch",null);
	},
	'click button[name=showLessAlgo]': function(){
		Session.set("algoSearch",null);
	},
	'click button[name=show5]': function(){
		Session.set("showAmount",5);
	},
	'click button[name=show10]': function(){
		Session.set("showAmount",10);
	}
}

Template.home.somethingLookedFor = function(){
	var userValue = Session.get("userSearch");
	return !(userValue===null);
}

Template.home.isValidQuery = function(){
	var name = Session.get('userSearch');
	var userInfo = getInfoByName(Meteor.users.find().fetch(),name);
	return !(userInfo===null);
}

Template.home.getRelevantInfo = function(){
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

Template.home.newAlgos = function(){
	var amount = Session.get("showAmount");
	return AlgoPedia.find( {}, {sort: { When: -1},limit:amount});
}
