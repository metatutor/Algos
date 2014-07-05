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
	},
	'click button[name=plus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(approvalGiven(lang,Meteor.user().username)){
			Meteor.call('unapprove',Meteor.user().username,LiD);
		}
		else{
			if(disapprovalGiven(lang,Meteor.user().username)){
				Meteor.call('undisapprove',Meteor.user().username,LiD);
			}
			Meteor.call('approve',Meteor.user().username,LiD);
		}
	},
	'click button[name=minus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(disapprovalGiven(lang, Meteor.user().username)){
			Meteor.call('undisapprove',Meteor.user().username,LiD);
		}
		else{
			if(approvalGiven(lang, Meteor.user().username)){
				Meteor.call('unapprove',Meteor.user().username,LiD);
			}
			Meteor.call('disapprove',Meteor.user().username,LiD);
		}
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

var approvalGiven = function(lid,uname){
	var aList = lid.Approve;
	return _.contains(aList,uname)
}

var disapprovalGiven = function(lid,uname){
	var dList = lid.Disapprove;
	return _.contains(dList,uname)
}
