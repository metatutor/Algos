Meteor.startup(function(){
	Session.set("duplicationWarning",0);
});

Template.contributeAlgo.events = {
	'click button[name=submitAlgo]': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=algoName]");
		var Short = template.find("textarea[name=shortenter]").value;
		var wLink = name.value;
		var keywords = getKWarray(template.find("input[name=keywords]").value);
		var aid = _.slugify(name.value);
		var dupes = getDuplications(name.value,aid,keywords,Short);
		Session.set("duplicationWarning",dupes);
		if(dupes>0){
			return;
		}
		var algoObject = {
			Short: Short,
			WikiName: encodeURIComponent(wLink),
			AiD: aid,
			Name: _.escapeHTML(name.value),
			KeyWords: keywords
		}
		template.find("input[name=algoName]").value="";
		template.find("input[name=keywords]").value="";
		template.find("textarea[name=shortenter]").value="";
		Meteor.call('uploadDoc',algoObject,Meteor.user()._id);
		var message = {
			Sender: "Thanks for the submission!",
			Text: "The community just got a little better!"
		}
		Meteor.call('sendNotification',Meteor.user()._id,message);
		Router.go('pedia',{_id:aid});
		$('#algoModal').modal('hide');
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
			return "Please enter a short description. You may copy this from Wikipedia.";
		case 3:
			return "Please use fewer than 200 characters in the description.";
		case 4:
			return "Please enter a valid name.";
		case 5: 
			return "Please enter at least 3 key words. These help find the algorithm later.";
		case 8: 
			return "That name is too long!";
		case 9:
			return "Please use fewer keywords.";
		default:
			return "Something went horribly wrong. Notifying robot handyman.";
	}
}

var getDuplications = function(name,aid,keywords,Short){
	if(_.isBlank(Short)){
		return 2;
	}
	if(Short.length>200){
		return 3;
	}
	if(keywords.length<3){
		return 5;
	}
	if(_.isBlank(name)){
		return 4;
	}
	if(name.length>80){
		return 8;
	}
	if(keywords.length>15){
		return 9;
	}
	var nameCount = AlgoPedia.find({Name:name}).count();
	var aidCount = AlgoPedia.find({AiD:aid}).count();
	if(nameCount>0){
		return 1;
	}
	if(aidCount>0){
		return 1;
	}
	return 0;
}

var getKWarray = function(list){
	list = _.escapeHTML(list);
	list = list.toLowerCase();
	return list.replace(/\s+/g, '').split(',');
}
