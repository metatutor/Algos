Meteor.startup(function(){
	Session.set("duplicationWarning",0);
});

Template.contributeAlgo.events = {
	'submit': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=algoName]").value;
		var keywords = getKWarray(template.find("input[name=keywords]").value);
		var aid = _.slugify(name);
		var Short = template.find("textarea[name=description]").value;
		var dupes = getDuplications(name,aid,keywords,Short);
		Session.set("duplicationWarning",dupes);
		if(dupes>0){
			return;
		}
		var algoObject = {
			AiD: aid,
			Name: name,
			Short: Short,
			KeyWords: keywords
		}
		Meteor.call('uploadDoc',algoObject,Meteor.user().username);
		Router.go('pedia',{_id:aid});
	},
	'click button[name=dismissal]':function(){
		Session.set("duplicationWarning",0);
	}
}

Template.contributeAlgo.isDuplicationWarning = function(){
	var warning = Session.get('duplicationWarning');
	return warning!=0;
}

Template.contributeAlgo.getWarning = function(){
	var warning = Session.get('duplicationWarning');
	switch(warning){
		case 1:
			return "Name already exists. Please check for duplicates in database.";
		case 2:
			return "AiD already exists. Please check for duplicates in database.";
		case 3:
			return "AiD and Name match another algorithm. Please check for duplicates in database.";
		case 4:
			return "Please enter a valid name.";
		case 5: 
			return "Please enter at least 3 key words. These help find the algorithm later.";
		case 6:
			return "Please write a short description. This helps identify algorithm entries!";
		default:
			return "Something went horribly wrong. Notifying proper authority.";
	}
}

var getDuplications = function(name,aid,keywords,Short){
	if(keywords.length<3){
		return 5;
	}
	if(_.isBlank(name)){
		return 4;
	}
	if(_.isBlank(Short)){
		return 6;
	}
	var nameCount = AlgoPedia.find({Name:name}).count();
	var aidCount = AlgoPedia.find({AiD:aid}).count();
	if(nameCount>0){
		if(aidCount>0){
			return 3;
		}
		return 1;
	}
	if(aidCount>0){
		return 2;
	}
	return 0;
}

var getKWarray = function(list){
	return list.replace(/\s+/g, '').split(',');
}
