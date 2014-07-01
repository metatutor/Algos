Meteor.startup(function(){
	Session.set("showMore",false);
	Session.set("searchQuery",null);
	Session.set("showAmount",5);
});

Template.home.events = {
	'submit': function(event, template){
		event.preventDefault();
		Session.set("showMore",true);
		var usrField = template.find("input[name=query]");
		Session.set("searchQuery",usrField.value);
	},
	'click button[name=showLessUser]': function(){
		Session.set("searchQuery",null);
	},
	'click button[name=show5]': function(){
		Session.set("showAmount",5);
	},
	'click button[name=show10]': function(){
		Session.set("showAmount",10);
	}
}

Template.home.somethingLookedFor = function(){
	var value = Session.get("searchQuery");
	return !(value===null);
}

Template.home.isValidQuery = function(){
	return getAmountResults();
}

Template.home.getRelevantInfo = function(){
	var info = Session.get('searchQuery');
	var userArray = Meteor.users.find({username:info}).fetch();
	var aidArray = AlgoPedia.find({AiD:info}).fetch();
	var algoArray = AlgoPedia.find({Name:info}).fetch();
	return algoArray.concat(aidArray).concat(userArray);
}

Template.home.newAlgos = function(){
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
