Meteor.startup(function(){
	Session.set('lsiSelected',null);
});

Template.lsiTableEntry.events = {
	'click button[name=pullInfo]': function(){
		if(Session.equals('lsiSelected',this._id)){
			Router.go('pediaSearch',{algo:this.pAiD,search:this.Language});
		}
		else{
			Router.go('lsiSearchRoute',{algo:this.pAiD,lang:this.Language,search:this._id});
		}
	}
}

Template.lsiTableEntry.getGlyph = function(){
	if(Session.equals('lsiSelected',this._id)){
		return "glyphicon glyphicon-eye-close";
	}
	return "glyphicon glyphicon-eye-open";
}
