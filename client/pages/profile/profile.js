Meteor.startup( function(){
	Session.set("editingProfile",false);
});
Template.profile.events = {
	'click button[name=changeInfo]': function(){
		Session.set("editingProfile",true);
	}
}

Template.profile.isEditing = function(){
	var stat = Session.get("editingProfile");
	return stat;
}
