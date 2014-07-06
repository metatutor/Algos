Template.lsiSearchResults.matchingLSI = function(){
	var lang = Session.get('lsiLangSearch');
	var algo = Session.get('lastAlgoSearch');
	if((lang===null)||(lang===undefined)){
		var list = _.sortBy(LSIs.find({pAiD:algo.AiD}).fetch(),function(obj){
			return obj.Approve.length-obj.Disapprove.length;
		});
		return list.reverse();
	}
	var list = _.sortBy(LSIs.find({pAiD:algo.AiD, Language:lang.Name}).fetch(),function(obj){
		return obj.Approve.length-obj.Disapprove.length;
	});
	return list.reverse();
}

Template.lsiSearchResults.everyLSI = function(){
	var algo = Session.get('lastAlgoSearch');
	var list = _.sortBy(LSIs.find({pAiD:algo.AiD}).fetch(),function(obj){
		return obj.Approve.length-obj.Disapprove.length;
	});
	return list.reverse();
}

Template.lsiSearchResults.isntSet = function(){
	return Session.equals('lsiLangSearch',null);
}

Template.lsiSearchResults.noneExist = function(){
	var lang = Session.get('lsiLangSearch');
	var algo = Session.get('lastAlgoSearch');
	var amount = LSIs.find({pAiD:algo.AiD},{sort:{When:-1}}).count();
	return amount<1;
}
