Meteor.startup(function(){
	Session.set("duplicationWarningLang",0);
});

Template.contributeLang.events = {
	'submit': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=langName]").value;
		var desc = template.find("textarea[name=description]").value;
		var dupes = getDuplications(name);
		Session.set("duplicationWarningLang",dupes);
		if(dupes>0){
			return;
		}
		var langObject = {
			Name: name,
			Description: desc,
		}
		Meteor.call('uploadLang',langObject,Meteor.user().username);
		Router.go('langs',{_id:name});
	}
}

Template.contributeLang.isDuplicationWarning = function(){
	var warning = Session.get('duplicationWarningLang');
	return warning!=0;
}

Template.contributeLang.getWarning = function(){
	return "A language with that name already exists.";
}

var getDuplications = function(name,aid){
	var nameCount = Languages.find({Name:name}).count();
	return nameCount;
}
