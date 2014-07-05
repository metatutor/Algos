Meteor.startup(function(){
	Session.set("duplicationWarningLang",0);
});

Template.contributeLang.events = {
	'submit': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=langName]").value;
		var desc = template.find("textarea[name=description]").value;
		var dupes = getDuplications(name,desc);
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
	},
	'click button[name=dismissal]':function(){
		Session.set('duplicationWarningLang',0);
	}
}

Template.contributeLang.isDuplicationWarning = function(){
	var warning = Session.get('duplicationWarningLang');
	return warning!=0;
}

Template.contributeLang.getWarning = function(){
	switch(Session.get('duplicationWarningLang')){
		case 1:
			return 'Please provide a brief description. This helps identify the language.';
		case 2:
			return 'Please provide a name. Names are important.';
		case 3:
			return "A language with that name already exists.";
		default:
			return "something went horribly wrong. Contacting propery authorities.";
	}
}

var getDuplications = function(name,desc){
	if(_.isBlank(desc)){
		return 1;
	}
	if(_.isBlank(name)){
		return 2;
	}
	var nameCount = Languages.find({Name:name}).count();
	if(nameCount>0){
		return 3;
	}
	return 0;
}
