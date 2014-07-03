Template.wikiPage.getSessionAlgo = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc;
}

Template.wikiPage.algoExists = function(){
	return !(Session.get("lastAlgoSearch")===undefined);
}
