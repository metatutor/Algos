Template.getCommentTable.comment = function(){
	var getID = Session.get('lsiSelected');
	return Comments.find({Context:getID});
}
