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

Template.wikiPage.events = {
	'click button[name=editDesc]': function(event,template){
		var text = template.find('textarea[name=updater]').value;
		var algoDoc = Session.get("lastAlgoSearch");
		if(_.isBlank(text)){
			return;
		}
		Meteor.call('updateWiki',algoDoc.AiD,text);
		Meteor.call('updateLog',algoDoc.AiD,Meteor.user().username,'Wiki');
	}
}
