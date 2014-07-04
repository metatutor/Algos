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

Template.lsiPage.events = {
	'submit': function(event,template){
		event.preventDefault();
		var aid = Session.get('lastAlgoSearch').AiD;
		var query = template.find('input[name=lsiSearch]').value;
		Router.go('pediaSearch',{algo:aid,search:query});
	}
}
