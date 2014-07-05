Template.userLSI.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.userLSI.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}

Template.userLSI.events = {
	'click button[name=comment]':function(){
		Session.set('commenting',true);
	},
	'click button[name=viewMore]':function(){
		if(Session.equals('reading',true)){
			Session.set('reading',false);
		}
		else{
			Session.set('reading',true);
		}
	},
	'click button[name=addComment]': function(events, template){
		Session.set('commenting',false);
		var context = Session.get('lsiSelected');
		var text = template.find('textarea[name=comment]').value;
		if(_.isBlank(text)){
			event.preventDefault();
			return;
		}
		var author = Meteor.user().username;
		var obj = {
			Context: context,
			When: moment.unix(),
			Text: text,
			Contributor: author
		};
		Meteor.call('logComment',obj);
	}
}

Template.userLSI.wantsToComment = function(){
	return Session.equals('commenting',true);
}

Template.userLSI.wantsToSeeComments = function(){
	return Session.equals('reading',true);
}
