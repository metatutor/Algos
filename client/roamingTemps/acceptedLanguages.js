Template.listLanguages.language = function(){
	return Languages.find({}, {sort: {When: -1}, limit:10});
}
