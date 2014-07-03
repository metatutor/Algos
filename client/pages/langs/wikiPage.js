Template.wikiPageLang.getSessionLang = function(){
	var langDoc = Session.get("langSearch");
	return langDoc;
}

Template.wikiPageLang.langExists = function(){
	return !(Session.get("langSearch")===undefined);
}

Template.wikiPageLang.getUserByLang = function(lang){
	var uname = lang.Contributor;
	return Meteor.users.findOne({username:uname});
}
