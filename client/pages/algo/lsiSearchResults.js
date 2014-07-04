Template.lsiSearchResults.matchingLSI = function(){
	var query = Session.get('lsiSearch');
	var algo = Session.get('lastAlgoSearch');
	return LSIs.find({AiD:algo.AiD,Language:query});
}
