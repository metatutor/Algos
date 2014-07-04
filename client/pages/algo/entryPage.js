Template.entryPage.events = {
	'click a[name=first]': function(){
		Session.set('tabSelect','first');
	},
	'click a[name=second]': function(){
		Session.set('tabSelect','second');
	},
	'click a[name=third]': function(){
		Session.set('tabSelect','third');
	}
}

Template.entryPage.first = function(){
	return Session.equals('tabSelect','first');
}

Template.entryPage.second = function(){
	return Session.equals('tabSelect','second');
}

Template.entryPage.third = function(){
	return Session.equals('tabSelect','third');
}

Template.entryPage.firstClass = function(){
	if(Session.equals('tabSelect','first')){
		return "active";
	}
	return "";
}

Template.entryPage.secondClass = function(){
	if(Session.equals('tabSelect','second')){
		return "active";
	}
	return "";
}

Template.entryPage.thirdClass = function(){
	if(Session.equals('tabSelect','third')){
		return "active";
	}
	return "";
}
