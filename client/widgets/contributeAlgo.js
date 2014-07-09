Meteor.startup(function(){
	Session.set("duplicationWarning",0);
});

Template.contributeAlgo.events = {
	'click button[name=submitAlgo]': function(event,template){
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
			Name: escapeHTML(name),
			Short: escapeHTML(Short),
			KeyWords: keywords
		}
		template.find("input[name=algoName]").value="";
		template.find("input[name=keywords]").value="";
		template.find("textarea[name=description]").value="";
		Meteor.call('uploadDoc',algoObject,Meteor.user()._id);
		var message = {
			Sender: "From: Algos",
			Text: "Thanks for the submission! The community just got a little better!"
		}
		Meteor.call('sendNotification',Meteor.user().username,message);
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
			return "AiD already exists. Please check for duplicates in database.";
		case 3:
			return "AiD and Name match another algorithm. Please check for duplicates in database.";
		case 4:
			return "Please enter a valid name.";
		case 5: 
			return "Please enter at least 3 key words. These help find the algorithm later.";
		case 6:
			return "Please write a short description. This helps identify algorithm entries!";
		case 7: 
			return "Please limit the 'Short' to 200 characters.";
		case 8: 
			return "That name is too long!";
		case 9:
			return "Please use fewer keywords.";
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
	if(Short.length>200){
		return 7;
	}
	if(name.length>30){
		return 8;
	}
	if(keywords.length>15){
		return 9;
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
	list = escapeHTML(list);
	list = list.toLowerCase();
	return list.replace(/\s+/g, '').split(',');
}

function escapeHTML(s) { 
return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
