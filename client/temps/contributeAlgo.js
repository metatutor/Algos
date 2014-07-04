Meteor.startup(function(){
	Session.set("duplicationWarning",0);
});

Template.contributeAlgo.events = {
	'submit': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=algoName]").value;
		var aid = template.find("input[name=algoID]").value;
		var dupes = getDuplications(name,aid);
		Session.set("duplicationWarning",dupes);
		if(dupes>0){
			return;
		}
		var desc = template.find("textarea[name=description]").value;
		var pseudo = template.find("textarea[name=pseudocode]").value;
		var keywords = getKWarray(template.find("input[name=keywords]").value);
		var algoObject = {
			AiD: aid,
			Name: name,
			Short: desc,
			Pseudo: pseudo,
			KeyWords: keywords
		}
		Meteor.call('uploadDoc',algoObject,Meteor.user().username);
		Router.go('pedia',{_id:aid});
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
		default:
			return "Something went horribly wrong. Notifying proper authority.";
	}
}

var getDuplications = function(name,aid){
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
