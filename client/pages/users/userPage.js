Template.userPage.whichUser = function(){
	return Session.get("lastUserSearch");
}

Template.userPage.userExists = function(){
	return !(Session.get("lastUserSearch")===undefined);
}
