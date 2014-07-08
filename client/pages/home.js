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
	var count = AlgoPedia.find().count();
	if(count===1){
		return count+' algorithm found';
	}
	else{
		return count+' algorithms found';
	}
}
