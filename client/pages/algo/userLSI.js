Template.userLSI.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.userLSI.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}

Template.userLSI.events = {
	'click button[name=commentsubmit]': function(events, template){
		var context = Session.get('lsiSelected');
		var text = template.find('textarea[name=comment]').value;
		Session.set('reading',[context]);
		if(_.isBlank(text)){
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
		Meteor.call('logComment',obj);
	},
	'click button[name=plus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(approvalGiven(lang,Meteor.user()._id)){
			Meteor.call('unapprove',Meteor.user()._id,LiD);
		}
		else{
			if(disapprovalGiven(lang,Meteor.user()._id)){
				Meteor.call('undisapprove',Meteor.user()._id,LiD);
			}
			Meteor.call('approve',Meteor.user()._id,LiD);
		}
	},
	'click button[name=minus]':function(){
		var LiD = Session.get('lsiSelected');
		var lang = LSIs.findOne({_id:LiD});
		if(disapprovalGiven(lang, Meteor.user()._id)){
			Meteor.call('undisapprove',Meteor.user()._id,LiD);
		}
		else{
			if(approvalGiven(lang, Meteor.user()._id)){
				Meteor.call('unapprove',Meteor.user()._id,LiD);
			}
			Meteor.call('disapprove',Meteor.user()._id,LiD);
		}
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
