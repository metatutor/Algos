Template.contributeLSI.events = {
	'change select[name=language]': function(event,template){
		Session.set('submitLanguage',event.currentTarget.value);
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
