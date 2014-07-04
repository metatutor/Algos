Template.lsiSearchResults.matchingLSI = function(){
	var query = Session.get('lsiSearch');
	console.log(query);
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({pAiD:algo.AiD, Language:query});
}
