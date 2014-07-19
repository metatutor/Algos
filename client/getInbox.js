Template.getInbox.noMail = function(){
	return Meteor.user().inbox.length===0;
}

Template.getInbox.message = function(){
	return Meteor.user().inbox.reverse();
}

Template.getInbox.canGet = function(){
	if(Meteor.user()!=null){
		return Meteor.user().hasOwnProperty('inbox');
	}
	return;
}
