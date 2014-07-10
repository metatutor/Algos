Meteor.startup(function(){
	Session.set('commentWarning',0);
});

Template.userLSI.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.userLSI.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}

Template.userLSI.commentError = function(){
	return (!(Session.equals('commentWarning',0)));
}

Template.userLSI.events = {
	'click button[name=commentsubmit]': function(events, template){
		var context = Session.get('lsiSelected');
		var text = template.find('textarea[name=comment]').value;
		Session.set('reading',[context]);
		if(!(Match.test(text,String))){
			return;
		}
		text=escapeHTML(text);
		if(_.isBlank(text)){
			Session.set('commentWarning',2);
			event.preventDefault();
			return;
		}
		if(text.length>200){
			Session.set('commentWarning',1);
			event.preventDefault();
			return;
		}
		var author = Meteor.user()._id;
		var obj = {
			Context: context,
			When: moment().unix(),
			Text: text,
			Contributor: author
		};
		template.find('textarea[name=comment]').value="";
		Meteor.call('logComment',obj);
		var message = {
			Text: 'Somebody has commented on your submission: '+context,
			Sender: 'Comment on your code!'
		}
		Meteor.call('sendNotification',this.Contributor,message);
	},
	'click button[name=plus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(approvalGiven(lang,Meteor.user()._id)){
			Meteor.call('unapprove',Meteor.user()._id,LiD,lang.Contributor);
		}
		else{
			if(disapprovalGiven(lang,Meteor.user()._id)){
				Meteor.call('undisapprove',Meteor.user()._id,LiD,lang.Contributor);
			}
			Meteor.call('approve',Meteor.user()._id,LiD,lang.Contributor);
		}
	},
	'click button[name=minus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(disapprovalGiven(lang, Meteor.user()._id)){
			Meteor.call('undisapprove',Meteor.user()._id,LiD,lang.Contributor);
		}
		else{
			if(approvalGiven(lang, Meteor.user()._id)){
				Meteor.call('unapprove',Meteor.user()._id,LiD,lang.Contributor);
			}
			Meteor.call('disapprove',Meteor.user()._id,LiD,lang.Contributor);
		}
	},
	'click button[name=dismissalComment]':function(){
		Session.set("commentWarning",0);
	}
}

Template.userLSI.getPercentApproval = function(){
	if(this===undefined){
		return 0;
	}
	var approvalLength = this.Approve.length;
	var disapprovalLength = this.Disapprove.length;
	if(approvalLength+disapprovalLength===0){
		return 50;
	}
	return approvalLength/(approvalLength+disapprovalLength)*100;
}

Template.userLSI.getAuthor = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
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

Template.userLSI.getPoints = function(){
	var val = this.Approve.length-this.Disapprove.length;
	if((val===1)||(val===-1)){
		return val+' like';
	}
	return val+' likes';
}

Template.userLSI.getAlert = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user()._id)){
		return "alert-danger";
	}
	if(approvalGiven(lang,Meteor.user()._id)){
		return "alert-success";
	}
	return "";
}

Template.userLSI.getLikeStatus = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user()._id)){
		return "Like";
	}
	if(approvalGiven(lang,Meteor.user()._id)){
		return "Undo Like";
	}
	return "Like";
}

Template.userLSI.getDislikeStatus = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user()._id)){
		return "Undo Dislike";
	}
	if(approvalGiven(lang,Meteor.user()._id)){
		return "Dislike";
	}
	return "Dislike";
}

Template.userLSI.getWarningText = function(){
	var issue = Session.get('commentWarning');
	switch(issue){
		case 1:
			return "Please use fewer than 200 characters";
		case 2:
			return "Please enter some text";
		default:
			return "Something went horribly wrong. Logging this for reference. Sorry!";
	}
}

Template.userLSI.getUserName = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.profile.firstname+' '+user.profile.lastname;
}

function escapeHTML(s) {
	return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function unEscapeHTML(s) {
	return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/$lt;/g, '<').replace(/$gt;/g, '>');
}

Template.userLSI.getCode = function(obj){
	return unEscapeHTML(obj.Code);
}
