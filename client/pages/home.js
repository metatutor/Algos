Template.home.events = {
	'keyup': function(event,template){
		Session.set('mainQuery',template.find('input[name=query]').value);
	}
}

Template.home.fieldNotBlank = function() {
	return !(_.isBlank(Session.get('mainQuery')));
}

Template.home.containsQuery = function(){
	return AlgoPedia.find();
}

Template.home.getAmountResults = function(){
	return AlgoPedia.find().length;
}

Template.home.isAlgo = function(obj){
	return obj.hasOwnProperty('AiD');
}

Template.home.isCode = function(obj){
	return obj.hasOwnProperty('pAiD');
}
