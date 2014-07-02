Template.lsiPage.algoName = function(){
	console.log('uh');
	return Session.get('lastAlgoSearch').Name;
}

Template.lsiPage.languageName = function(){
	return Session.get('lastLangSearch');
}

Template.lsiPage.Algo = function(){
	return Session.get('lastAlgoSearch');
}

Template.lsiPage.languageCode = function(){
	return this[Session.get('lastLangSearch')];
}
