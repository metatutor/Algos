Template.getComments.comment = function(){
	var getID = Session.get('lsiSelected');
	return Comments.find({Context:getID},{sort:{When:-1}});
}

Template.getComments.getAuthor = function(){
	var user = Meteor.users.findOne({username:this.Contributor});
	return user;
}
