Template.entryPage.getSessionAlgo = function(){
	var algoDoc = Session.get("lastAlgoSearch");
	return algoDoc;
}

Template.entryPage.algoExists = function(){
	return !(Session.get("lastAlgoSearch")===undefined);
}
