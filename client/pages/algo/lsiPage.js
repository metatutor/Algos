Template.lsiPage.allDefined = function(){
	if(!(Session.equals('lastAlgoSearch',undefined))){
		return true;
	}
}
Template.lsiPage.algoName = function(){
	var algo= Session.get('lastAlgoSearch');
	if(algo===undefined){
		return;
	}
	return algo.Name;
}

Template.lsiPage.Algo = function(){
	return Session.get('lastAlgoSearch');
}

Template.lsiPage.langUndefined = function(){
	return Session.equals('lsiLangSearch',undefined);
}

Template.lsiPage.events = {
	'submit': function(event,template){
		event.preventDefault();
		var aid = Session.get('lastAlgoSearch').AiD;
		var query = template.find('input[name=lsiSearch]').value;
		if(_.isBlank(query)){
			Router.go('pediaSearch',{algo:aid,search:"showAll"});
		}else{
			Router.go('pediaSearch',{algo:aid,search:_.slugify(query)});
		}
	},
	'click button[name=dismissal]': function(){
		Session.set('lsiSuccess',0);
	}
}

Template.lsiPage.isEntry = function(){
	return Session.equals('lsiSuccess',2);
}
