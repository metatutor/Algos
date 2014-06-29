Template.algopedia.events = {
	'submit': function(event,template){
		event.preventDefault();
		var name = template.find("input[name=algoName]");
		var aid = template.find("input[name=algoID]");
		var desc = template.find("textarea[name=description]");
		var pseudo = template.find("textarea[name=pseudocode]");
		var algoObject = {
			AiD: aid.value,
			Name: name.value,
			Description: desc.value,
			Pseudo: pseudo.value
		}
		Meteor.call('uploadDoc',algoObject,Meteor.user().username);
	}
}
