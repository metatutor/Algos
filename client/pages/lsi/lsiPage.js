Template.lsiPage.allDefined = function(){
	if(!(Session.equals('lastAlgoSearch',undefined))){
		return true;
	}
}
Template.lsiPage.algoName = function(){
	return Session.get('lastAlgoSearch').Name;
}

Template.lsiPage.languageName = function(){
	return Session.get('lastLangSearch');
}

Template.lsiPage.Algo = function(){
	return Session.get('lastAlgoSearch');
}

Template.lsiPage.languageCode = function(){
	var algo = Session.get('lastAlgoSearch');
	var lang = Session.get('lastLangSearch');
	return algo[lang];
}
