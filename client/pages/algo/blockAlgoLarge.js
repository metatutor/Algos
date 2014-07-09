Meteor.startup(function(){
	Session.set('algoChangeWarning',0);
});

Template.blockAlgoLarge.getUserInfo = function(){
	return Meteor.users.findOne({_id:this.Contributor});
}

Template.blockAlgoLarge.isWarning = function(){
	return (!(Session.equals('algoChangeWarning',0)));
}

Template.blockAlgoLarge.events = {
	'click button[name=shortupdate]': function(event,template){
		event.preventDefault();
		var text = template.find('textarea[name=shortupdater]').value;
		if(_.isBlank(template.find('input[name=keyupdater]').value)){
			Session.set('algoChangeWarning',1);
			return;
		}
		var keys = getKWarray(template.find('input[name=keyupdater]').value);
		if(keys.length<3){
			Session.set('algoChangeWarning',2);
			return;
		}
		if(keys.length>15){
			Session.set('algoChangeWarning',3);
			return;
		}
		if(_.isBlank(text)){
			Session.set('algoChangeWarning',4);
			return;
		}
		if(text.length>200){
			Session.set('algoChangeWarning',5);
			return;
		}
		var aid = this.AiD;
		Meteor.call('updateShort',aid,text);
		Meteor.call('updateLog',aid,Meteor.user().username,'Short');
		$('#editShortModal').modal('hide');
	},
	'click button[name=dismissSmallAlgo]':function(event,template){
		Session.set('algoChangeWarning',0);
	}
}

Template.blockAlgoLarge.getKW = function(algo){
	return algo.KeyWords.join(', ');
}

var getKWarray = function(list){
	list = list.toLowerCase();
	return list.replace(/\s+/g, '').split(',');
}

Template.blockAlgoLarge.getWarning = function(){
	var warn = Session.get('algoChangeWarning');
	switch(warn){
		case 1:
			return "Please enter keywords or refresh old ones.";
		case 2:
			return "Please enter at least three keywords.";
		case 3:
			return "Please enter fewer keywords. 15 works.";
		case 4:
			return "Enter a short description, please.";
		case 5:
			return "No more than 200 characters for the description, please.";
		default:
			return "Something went horribly wrong. Notifying appropriate robot.";
	}
}
