Template.searchList.somethingLookedFor = function(){
	var value = Session.get('lastSearch');
	return !(value===null);
}

Template.searchList.isValidQuery = function(){
	return getAmountResults();
}

Template.searchList.getRelevantInfo = function(){
	var info = Session.get('lastSearch');
	var userArray = Meteor.users.find({username:info}).fetch();
	var aidArray = AlgoPedia.find({AiD:info}).fetch();
	var kwArray = getKWmatches(info);
	var algoArray = AlgoPedia.find({Name:info}).fetch();
	return algoArray.concat(aidArray).concat(kwArray).concat(userArray);
}

var getAmountResults = function(){
	var info = Session.get('lastSearch'); 
	var userSearch = Meteor.users.find({username:info}).count();
	var aidSearch = AlgoPedia.find({AiD:info}).count();
	var algoSearch = AlgoPedia.find({Name:info}).count();
	var kwArray = getKWmatches(info).length;
	var entries = userSearch+aidSearch+algoSearch+kwArray;
	return entries;
}

Template.searchList.isUser = function(obj){
	return obj.hasOwnProperty('username');
}

Template.searchList.isAlgo = function(obj){
	return obj.hasOwnProperty('AiD');
}

var getKWmatches = function(query){
	query = query.replace(/\s+/g, '');
	var kwMatches = AlgoPedia.find({ "KeyWords.$": query }).fetch();
	return kwMatches;
}
