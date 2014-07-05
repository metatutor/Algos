Template.lsiSearchResults.matchingLSI = function(){
	var lang = Session.get('lsiLangSearch');
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD, Language:lang.Name},{sort:{When:-1}});
}

Template.lsiSearchResults.everyLSI = function(){
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD},{sort:{When:-1}});
}

Template.lsiSearchResults.isntSet = function(){
	return Session.equals('lsiLangSearch',null);
}
