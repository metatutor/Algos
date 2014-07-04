Template.userLSI.noneSelected = function(){
	return Session.equals('lsiSelected',null);
}

Template.userLSI.getUserLSI = function(){
	var LiD = Session.get('lsiSelected');
	return LSIs.findOne({_id:LiD});
}
