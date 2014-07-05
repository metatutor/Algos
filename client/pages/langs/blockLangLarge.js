Template.blockLangLarge.getULink = function(){
	return Meteor.users.findOne({username:this.Contributor});
}
