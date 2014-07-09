Template.getChanges.change = function(){
	var list = _.sortBy(AlgoPedia.findOne({AiD:this.AiD}).Log,function(obj){
		return obj.When;
	});
	return list.reverse();
}

Template.getChanges.getUsername = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.username;
}
