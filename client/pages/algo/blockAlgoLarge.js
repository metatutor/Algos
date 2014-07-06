Template.blockAlgoLarge.getULink = function(){
	return Meteor.users.findOne({username:this.Contributor});
}

Template.blockAlgoLarge.events = {
	'click button[name=shortupdate]': function(event,template){
		var text = template.find('textarea[name=shortupdater]').value;
		if(_.isBlank(text)){
			return;
		}
		var aid = this.AiD;
		Meteor.call('updateShort',aid,text);
	}
}
