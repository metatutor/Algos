Meteor.startup(function(){
	Session.set('editLangWarn',0);
});

Template.langList.events = {
	'click button[name=plusLang]':function(){
		var LiD = this._id;
		if(approvalGiven(this,Meteor.user().username)){
			Meteor.call('unapprove',Meteor.user().username,LiD);
		}
		else{
			if(disapprovalGiven(this,Meteor.user().username)){
				Meteor.call('undisapprove',Meteor.user().username,LiD);
			}
			Meteor.call('approve',Meteor.user().username,LiD);
		}
	},
	'click button[name=minusLang]':function(){
		var LiD = this._id;
		if(disapprovalGiven(this, Meteor.user().username)){
			Meteor.call('undisapprove',Meteor.user().username,LiD);
		}
		else{
			if(approvalGiven(this, Meteor.user().username)){
				Meteor.call('unapprove',Meteor.user().username,LiD);
			}
			Meteor.call('disapprove',Meteor.user().username,LiD);
		}
	},
	'click button[name=visitLang]':function(){
		Router.go('lsiSearchRoute',{algo:this.pAiD,lang:'showAll',search:this._id});
	},
	'click a': function(event,template){
		Router.go('langSearch',{_id:this.Slug});
	},
	'click button[name=langUpdate]':function(event,template){
		event.preventDefault();
		var text = escapeHTML(template.find('textarea[name=description]').value);
		if(_.isBlank(text)){
			Session.set('editLangWarn',1);
			return;
		}
		if(text.length>200){
			Session.set('editLangWarn',2);
			return;
		}
		var lang = Session.get('langPageLang');
		Meteor.call('editLang',lang,text);
		$('#langEditor').modal('hide');
	},
	'click button[name=editLangWarner]':function(){
		Session.set('editLangWarn',0);
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

Template.langList.getPoints = function(){
	var val = this.Approve.length-this.Disapprove.length;
	if((val===1)||(val===-1)){
		return val+' like';
	}
	return val+' likes';
}

Template.langList.getAlert = function(){
	if(disapprovalGiven(this,Meteor.user().username)){
		return "alert-danger";
	}
	if(approvalGiven(this,Meteor.user().username)){
		return "alert-success";
	}
	return "";
}

Template.langList.getLikeStatus = function(){
	if(disapprovalGiven(this,Meteor.user().username)){
		return "Like";
	}
	if(approvalGiven(this,Meteor.user().username)){
		return "Undo Like";
	}
	return "Like";
}

Template.langList.getDislikeStatus = function(){
	if(disapprovalGiven(this,Meteor.user().username)){
		return "Undo Dislike";
	}
	if(approvalGiven(this,Meteor.user().username)){
		return "Dislike";
	}
	return "Dislike";
}

Template.langList.getLanguages = function(){
	return Languages.find().fetch();
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

Template.langList.getUsername = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.username;
}

Template.langList.isWarning = function(){
	return (!(Session.equals('editLangWarn',0)));
}

Template.langList.getWarning = function(){
	var warn = Session.get('editLangWarn');
	switch(warn){
	case 1:
		return "Please enter some text to describe the language.";
	case 2:
		return "Please use fewer than 200 characters.";
	default:
		return "Something went horribly wrong. Robots are working to fix it.";
	}
}

function escapeHTML(s) {
	return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
