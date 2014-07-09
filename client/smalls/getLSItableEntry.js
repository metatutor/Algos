Meteor.startup(function(){
	Session.set('lsiSelected',null);
});

Template.lsiTableEntry.events = {
	'click button[name=pullInfo]': function(){
		if(Session.equals('lsiSelected',this._id)){
			if(Session.equals('lsiLangSearch',null)){
				Router.go('pediaSearch',{algo:this.pAiD,search:"showAll"});
			}
			else{
				Router.go('pediaSearch',{algo:this.pAiD,search:_.slugify(this.Language)});
			}
		}
		else{
			if(Session.equals('lsiLangSearch',null)){
				Router.go('lsiSearchRoute',{algo:this.pAiD,lang:"showAll",search:this._id});
			}
			else{
				Router.go('lsiSearchRoute',{algo:this.pAiD,lang:_.slugify(this.Language),search:this._id});
			}
		}
	}
}

Template.lsiTableEntry.getGlyph = function(){
	if(Session.equals('lsiSelected',this._id)){
		return "glyphicon glyphicon-eye-close";
	}
	return "glyphicon glyphicon-eye-open";
}

Template.lsiTableEntry.getTitle = function(){
	if(Session.equals('lsiSelected',this._id)){
		return "Hide Code";
	}
	return "View Code";
}

Template.lsiTableEntry.getPoints = function(){
	return +(this.Approve.length - this.Disapprove.length);
}

Template.lsiTableEntry.getUsername = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.username;
}
