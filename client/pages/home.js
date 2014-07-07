Template.home.events = {
	'keyup': function(event,template){
		Session.set('mainQuery',template.find('input[name=query]').value);
	}
}

Template.home.fieldNotBlank = function() {
	return !(_.isBlank(Session.get('mainQuery')));
}

Template.home.containsQuery = function(){
	return matchingAlgos();
}

Template.home.getAmountResults = function(){
	return matchingAlgos().length;
}

var matchingAll = function(){
	return matchingAlgos().concat(matchingCode());
}

var matchingAlgos = function(){
	var snip = Session.get('mainQuery');
	var list = AlgoPedia.find().fetch();
	var answer = [];
	for(var i =0;i<list.length;i++){
		var entry = list[i];
		if(_.str.include(entry.Name.toLowerCase(),snip.toLowerCase())){
			answer.push(entry);
		}
		else{
			for(var j=0;j<entry.KeyWords.length;j++){
				if(_.str.include(entry.KeyWords[j].toLowerCase(),snip.toLowerCase())){
					answer.push(entry);
				}
			}
		}
	}
	return answer;
}

var matchingCode = function(){
	var snip = Session.get('mainQuery');
	var list = LSIs.find().fetch();
	var answer = [];
	for(var i =0;i<list.length;i++){
		var entry = list[i];
		if(_.str.include(entry.Language.toLowerCase(),snip.toLowerCase())){
			answer.push(entry);
		}
	}
	return answer;
}
