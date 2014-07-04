Template.lsiSearchResults.matchingLSI = function(){
	var query = Session.get('lsiSearch');
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD, Language:query},{sort:{When:-1}});
}
