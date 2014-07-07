Template.langList.getLanguages = function(){
	return Languages.find().fetch();
}

Template.langList.events = {
	'click a': function(event,template){
		Router.go('langSearch',{_id:this.Slug});
	}
}

Template.langList.isActive = function(obj){
	if(Session.equals('langPageLang',obj.Slug)){
		return "active";
	}
	return "";
}
