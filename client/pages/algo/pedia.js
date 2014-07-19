Template.pedia.events = {
	'click button[name=plusPedia]':function(){
		var LiD = this._id;
		if(approvalGiven(this,Meteor.user()._id)){
			Meteor.call('unapprove',Meteor.user()._id,LiD, this.Contributor);
		}
		else{
			if(disapprovalGiven(this,Meteor.user()._id)){
				Meteor.call('undisapprove',Meteor.user()._id,LiD, this.Contributor);
			}
			Meteor.call('approve',Meteor.user()._id,LiD, this.Contributor);
		}
	},
	'click button[name=minusPedia]':function(){
		var LiD = this._id;
		if(disapprovalGiven(this, Meteor.user()._id)){
			Meteor.call('undisapprove',Meteor.user()._id,LiD, this.Contributor);
		}
		else{
			if(approvalGiven(this, Meteor.user()._id)){
				Meteor.call('unapprove',Meteor.user()._id,LiD, this.Contributor);
			}
			Meteor.call('disapprove',Meteor.user()._id,LiD, this.Contributor);
		}
	},
	'click button[name=visitAlgo]':function(){
		Router.go('lsiSearchRoute',{algo:this.pAiD,lang:'showAll',search:this._id});
	},
	'click a': function(event,template){
		Router.go('pediaSpecific',{_id:this.AiD});
	}
}

Template.pedia.getPercentApproval = function(){
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

Template.pedia.getAuthor = function(){
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

Template.pedia.getPoints = function(){
	var val = this.Approve.length-this.Disapprove.length;
	if((val===1)||(val===-1)){
		return val+' like';
	}
	return val+' likes';
}

Template.pedia.getAlert = function(){
	if(disapprovalGiven(this,Meteor.user()._id)){
		return "alert-danger";
	}
	if(approvalGiven(this,Meteor.user()._id)){
		return "alert-success";
	}
	return "";
}

Template.pedia.getLikeStatus = function(){
	if(disapprovalGiven(this,Meteor.user()._id)){
		return "Like";
	}
	if(approvalGiven(this,Meteor.user()._id)){
		return "Undo Like";
	}
	return "Like";
}

Template.pedia.getDislikeStatus = function(){
	if(disapprovalGiven(this,Meteor.user()._id)){
		return "Undo Dislike";
	}
	if(approvalGiven(this,Meteor.user()._id)){
		return "Dislike";
	}
	return "Dislike";
}

Template.pedia.getAlgos = function(){
	return AlgoPedia.find().fetch();
}

Template.pedia.isActive = function(obj){
	if(Session.equals('pediaAiD',obj.AiD)){
		return "active";
	}
	return "";
}

Template.pedia.getCodeForAlgo = function(){
	var aid = Session.get('pediaAiD');
	var list = _.sortBy(LSIs.find({pAiD:aid}).fetch(),function(obj){
		return obj.When;
	});
	return list.reverse();
}

Template.pedia.getUserName = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.profile.firstname+' '+user.profile.lastname;
}

Template.pedia.getCode = function(obj){
	return _.unescapeHTML(obj.Code);
}
