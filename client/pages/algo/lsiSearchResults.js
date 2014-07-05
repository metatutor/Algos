Template.lsiSearchResults.matchingLSI = function(){
	var query = Session.get('lsiSearch');
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD, Language:query},{sort:{When:-1}});
}

Template.lsiSearchResults.everyLSI = function(){
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD},{sort:{When:-1}});
}

Template.lsiSearchResults.isntSet = function(){
	return Session.equals('lsiSearch',null);
}
