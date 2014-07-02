Template.contributeLSI.events = {
	'change select[name=language]': function(event,template){
		Session.set('submitLanguage',event.currentTarget.value);
	},
	'submit': function(event,template){
		var code = template.find('textarea[name=lsi]').value;
		var aid = this.AiD;
		var language = Session.get('submitLanguage');
		var lobj = {};
		lobj[language]=code;
		Meteor.call('uploadLSI',lobj,aid);
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
