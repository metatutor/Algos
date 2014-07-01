Meteor.startup( function(){
	Session.set("editingProfile",false);
});
Template.entryPage.algoExists = function(){
	return !(Session.get("lastAlgoSearch")===undefined);
}

Template.entryPage.getName = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc.Name;
}

Template.entryPage.getDescription = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc.Description;
}

Template.entryPage.getAid = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc.AiD;
}

Template.entryPage.getPseudo = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc.Pseudo;
}
