Meteor.startup(function(){
	Session.set('successfulLangSubmit',false);
	Session.set("duplicationWarningLang",0);
});

Template.contributeLang.events = {
	'click button[name=submitLang]': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=langName]").value;
		var desc = template.find("textarea[name=description]").value;
		var slug = _.slugify(name);
		var dupes = getDuplications(name,desc,slug);
		Session.set("duplicationWarningLang",dupes);
		if(dupes>0){
			return;
		}
		var langObject = {
			Name: name,
			Description: desc,
			Slug:slug
		}
		Meteor.call('uploadLang',langObject,Meteor.user().username);
		template.find("input[name=langName]").value="";
		template.find("textarea[name=description]").value="";
		Session.set('successfulLangSubmit',true);
	},
	'click button[name=dismissal]':function(){
		Session.set('duplicationWarningLang',0);
	},
	'click button[name=dismissalSuccess]':function(){
		Session.set('successfulLangSubmit',false);
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
		case 4:
			return "A name very similar to this one already exists, check the database!";
		case 5:
			return "Please use a shorter name.";
		case 6:
			return "Please limit your description to 200 characters.";
		default:
			return "something went horribly wrong. Contacting propery authorities.";
	}
}

var getDuplications = function(name,desc,slug){
	if(_.isBlank(desc)){
		return 1;
	}
	if(_.isBlank(name)){
		return 2;
	}
	if(name.length>30){
		return 5;
	}
	if(desc.length>200){
		return 6;
	}
	var nameCount = Languages.find({Name:name}).count();
	var slugCount = Languages.find({Slug:slug}).count();
	if(nameCount>0){
		return 3;
	}
	if(slugCount>0){
		return 4;
	}
	return 0;
}

Template.contributeLang.langSuccess = function(){
	return Session.equals('successfulLangSubmit',true);
}
