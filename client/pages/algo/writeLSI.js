Meteor.startup(function(){
	Session.set('lsiSuccess',0);
});

Template.contributeLSI.events = {
	'keydown':function(event){
		if(event.which===9){
			event.preventDefault();
		}
	},
	'change select[name=language]': function(event,template){
		Session.set('submitLanguage',event.currentTarget.value);
	},
	'click button[name=dismissal]':function(){
		Session.set('lsiSuccess',0);
	},
	'click button[name=submitCode]': function(event,template){
		event.preventDefault();
		var algo = Session.get('lastAlgoSearch');
		var aid = algo.AiD;
		var code = template.find('textarea[name=lsi]').value;
		var language = Session.get('submitLanguage');
		if(!(Match.test(code,String))){
			return;
		}
		if(_.isBlank(language)){
			Session.set('lsiSuccess',1);
			return;
		}
		if(_.isBlank(code)){
			Session.set('lsiSuccess',3);
			return;
		}
		var makeid = aid+Meteor.user()._id+language+moment().unix();
		var lsiObj = {
			_id: makeid,
			Code: code,
			Contributor: Meteor.user()._id,
			pAiD: aid,
			Approve: [],
			Disapprove: [],
			Language: language,
			When: moment().unix()
		}
		Meteor.call('uploadLSI',lsiObj,Meteor.user()._id);
		Meteor.call('approve',Meteor.user()._id,makeid);
		Session.set('lsiSuccess',2);
		Router.go('lsiSearchRoute',{algo:aid,lang:"showAll",search:makeid},Meteor.user()._id);
		var message = {
			Sender: "Thanks for the code!",
			Text: "The community just got a little better!"
		}
		Meteor.call('sendNotification',Meteor.user().username,message);
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
	if(Session.equals('lsiSuccess',1)){
		return true;
	}
	if(Session.equals('lsiSuccess',3)){
		return true;
	}
	return false;
}

Template.contributeLSI.getTheError = function(){
	if(Session.equals('lsiSuccess',1)){
		return "Please select a valid language.";
	}
	else{
		return "Please enter code.";
	}
}
