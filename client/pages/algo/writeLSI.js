Meteor.startup(function(){
	Session.set('lsiSuccess',0);
});

Template.contributeLSI.events = {
	'change select[name=language]': function(event,template){
		Session.set('submitLanguage',event.currentTarget.value);
	},
	'click button[name=dismissal]':function(){
		Session.set('lsiSuccess',0);
	},
	'submit': function(event,template){
		event.preventDefault();
		var algo = Session.get('lastAlgoSearch');
		var aid = algo.AiD;
		var code = template.find('textarea[name=lsi]').value;
		var language = Session.get('submitLanguage');
		if(language===undefined){
			Session.set('lsiSuccess',1);
			return;
		}
		var makeid = aid+Meteor.user().username+language+moment().unix();
		var lsiObj = {
			_id: makeid,
			Code: code,
			Contributor: Meteor.user().username,
			pAiD: aid,
			Language: language,
			When: moment().unix()
		}
		Meteor.call('uploadLSI',lsiObj);
		Session.set('lsiSuccess',2);
		Router.go('lsiSearchRoute',{algo:aid,lang:_.slugify(language),search:makeid});
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
	return Session.equals('lsiSuccess',1);
}
