Template.blockAlgoLarge.getULink = function(){
	return Meteor.users.findOne({username:this.Contributor});
}
