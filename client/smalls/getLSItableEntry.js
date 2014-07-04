Meteor.startup(function(){
	Session.set('lsiSelected',null);
});

Template.lsiTableEntry.events = {
	'click button[name=pullInfo]': function(){
		if(Session.equals('lsiSelected',this._id)){
			Session.set('lsiSelected',null);
		}
		else{
			Session.set('lsiSelected',this._id);
		}
	}
}

Template.lsiTableEntry.getGlyph = function(){
	if(Session.equals('lsiSelected',this._id)){
		return "glyphicon glyphicon-eye-close";
	}
	return "glyphicon glyphicon-eye-open";
}
