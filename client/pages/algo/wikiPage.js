Template.wikiPage.getSessionAlgo = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc;
}

Template.wikiPage.algoExists = function(){
	return !(Session.get("lastAlgoSearch")===undefined);
}

Template.wikiPage.getUserByAlgo = function(algo){
	var uname = algo.Contributor;
	return Meteor.users.findOne({username:uname});
}

Template.wikiPage.isEntry = function(){
	return Session.equals('lsiSuccess',2);
}
