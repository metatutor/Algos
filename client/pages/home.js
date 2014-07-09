Template.home.events = {
	'keyup': function(event,template){
		var query = template.find('input[name=query]').value;
		if(Match.test(query,String)){
			Session.set('mainQuery',escapeHTML(query));
		}
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

function escapeHTML(s) {
	return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
