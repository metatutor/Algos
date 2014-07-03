Template.entryPageLang.events = {
	'click a[name=first]': function(){
		Session.set('tabSelect','first');
	},
	'click a[name=second]': function(){
		Session.set('tabSelect','second');
	}
}

Template.entryPageLang.first = function(){
	return Session.equals('tabSelect','first');
}

Template.entryPageLang.second = function(){
	return Session.equals('tabSelect','second');
}

Template.entryPageLang.firstClass = function(){
	if(Session.equals('tabSelect','first')){
		return "active";
	}
	return "";
}

Template.entryPageLang.secondClass = function(){
	if(Session.equals('tabSelect','second')){
		return "active";
	}
	return "";
}
