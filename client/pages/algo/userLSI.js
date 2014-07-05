Meteor.startup(function(){
	Session.set('reading',[]);
});

Template.userLSI.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.userLSI.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}

Template.userLSI.events = {
	'click button[name=viewMore]':function(){
		var LiD = Session.get('lsiSelected');
		var readingArray = Session.get('reading');
		if(_.contains(readingArray,LiD)){
			Session.set('reading',[]);
		}
		else{
			Session.set('reading',[LiD]);
		}
	},
	'click button[name=commentsubmit]': function(events, template){
		var context = Session.get('lsiSelected');
		var text = template.find('textarea[name=comment]').value;
		Session.set('reading',[context]);
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

Template.userLSI.wantsToSeeComments = function(){
	var readingArray = Session.get('reading');
	return readingArray.length>0;
}

Template.userLSI.getAuthor = function(){
	var user = Meteor.users.findOne({username:this.Contributor});
	return user;
}
