Template.entryPageLang.events = {
	'click a[name=first]': function(){
		Session.set('tabSelectLang','first');
	},
	'click a[name=second]': function(){
		Session.set('tabSelectLang','second');
	}
}

Template.entryPageLang.first = function(){
	return Session.equals('tabSelectLang','first');
}

Template.entryPageLang.second = function(){
	return Session.equals('tabSelectLang','second');
}

Template.entryPageLang.firstClass = function(){
	if(Session.equals('tabSelectLang','first')){
		return "active";
	}
	return "";
}

Template.entryPageLang.secondClass = function(){
	if(Session.equals('tabSelectLang','second')){
		return "active";
	}
	return "";
}
