Template.lsiPage.allDefined = function(){
	if(!(Session.equals('lastAlgoSearch',undefined))){
		return true;
	}
}
Template.lsiPage.algoName = function(){
	return Session.get('lastAlgoSearch').Name;
}

Template.lsiPage.Algo = function(){
	return Session.get('lastAlgoSearch');
}
