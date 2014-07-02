Template.lsiButtons.setAlgo = function(){
	Session.set("lastAlgoSearch",this);
}

Template.lsiButtons.language = function(){
	return Languages.find();
}

Template.lsiButtons.hasLanguage = function(){
	var algoDoc = Session.get('lastAlgoSearch');
	var algo = AlgoPedia.findOne({ AiD: algoDoc.AiD});
	if(algo.hasOwnProperty(this.name)){
		return true;
	}
	return false;
}

Template.lsiButtons.events = {
	'click button': function(){
		Router.go('langs', {_id: Session.get('lastAlgoSearch').AiD, lang: this.name});
	}
}
