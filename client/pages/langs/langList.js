Template.langList.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.langList.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}

Template.langList.events = {
	'click button[name=plus]':function(){
		var lang = LSIs.findOne({_id:this.LiD});
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
		var lang = LSIs.findOne({_id:this.LiD});
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

Template.langList.getPercentApproval = function(){
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

Template.langList.getAuthor = function(){
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

Template.langList.getPoints = function(){
	var val = this.Approve.length-this.Disapprove.length;
	if((val===1)||(val===-1)){
		return val+' point';
	}
	return val+' points';
}

Template.langList.getAlert = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user().username)){
		return "alert-danger";
	}
	if(approvalGiven(lang,Meteor.user().username)){
		return "alert-success";
	}
	return "";
}

Template.langList.getLikeStatus = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user().username)){
		return "Like";
	}
	if(approvalGiven(lang,Meteor.user().username)){
		return "Undo Like";
	}
	return "Like";
}

Template.langList.getDislikeStatus = function(){
	var lang = LSIs.findOne({_id:this._id});
	if(disapprovalGiven(lang,Meteor.user().username)){
		return "Undo Dislike";
	}
	if(approvalGiven(lang,Meteor.user().username)){
		return "Dislike";
	}
	return "Dislike";
}

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

Template.langList.getCodeForLang = function(){
	var langSlug = Session.get('langPageLang');
	var lang = Languages.findOne({Slug:langSlug});
	if(lang===undefined){
		return;
	}
	return LSIs.find({Language:lang.Name}).fetch();
}
