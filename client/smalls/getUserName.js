Template.getUsersName.getName = function(){
	if(Meteor.user()){
		return this.profile.firstname+' '+this.profile.lastname;
	}
	return;
}
