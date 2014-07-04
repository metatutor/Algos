Meteor.startup(function(){
	Session.set('lsiSuccess',0);
});

Template.contributeLSI.events = {
	'change select[name=language]': function(event,template){
		Session.set('submitLanguage',event.currentTarget.value);
	},
	'submit': function(event,template){
		event.preventDefault();
		var code = template.find('textarea[name=lsi]').value;
		var aid = this.AiD;
		var language = Session.get('submitLanguage');
		console.log(language);
		if(language===undefined){
			Session.set('lsiSuccess',1);
			return;
		}
		var lsiObj = {
			Code: code,
			Contributor: Meteor.user().username,
			AiD: aid,
			Language: language
		}
		Meteor.call('uploadLSI',lsiObj);
		Session.set('lsiSuccess',2);
		Session.set('tabSelect','second');
	}
}

Template.contributeLSI.language = function(){
	return Languages.find();
}

Template.contributeLSI.selectedLanguage = function(name){
	if(Session.equals('submitLanguage',name)){
		return "selected";
	}
	return "";
}

Template.contributeLSI.Algo = function(){
	return Session.get('lastAlgoSearch');
}

Template.contributeLSI.isError = function(){
	console.log('Session');
	return Session.equals('lsiSuccess',1);
}
