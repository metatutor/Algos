Template.searchList.isValidQuery = function(){
	return getAmountResults();
}

Template.searchList.getRelevantInfo = function(){
	var info = Session.get('lastSearch');
	var userArray = Meteor.users.find({username:info}).fetch();
	var aidArray = AlgoPedia.find({AiD:info}).fetch();
	var kwArray = AlgoPedia.find({ KeyWords: info}).fetch();
	var algoArray = AlgoPedia.find({Name:info}).fetch();
	return algoArray.concat(aidArray).concat(kwArray).concat(userArray);
}

//TODO perform uniq on the results when we get underscore.
var getAmountResults = function(){
	var info = Session.get('lastSearch'); 
	var userSearch = Meteor.users.find({username:info}).count();
	var aidSearch = AlgoPedia.find({AiD:info}).count();
	var algoSearch = AlgoPedia.find({Name:info}).count();
	var kwSearch = AlgoPedia.find({ KeyWords: info}).count();
	var entries = userSearch+aidSearch+algoSearch+kwSearch;
	return entries;
}

Template.searchList.isUser = function(obj){
	return obj.hasOwnProperty('username');
}

Template.searchList.isAlgo = function(obj){
	return obj.hasOwnProperty('AiD');
}

Template.searchList.isDirect = function(){
	if(getAmountResults()===1){
		return true;
	}
	return false;
}

Template.searchList.getRelevantInfoDirect = function(){
	var info = Session.get('lastSearch');
	var userArray = Meteor.users.find({username:info}).fetch();
	var aidArray = AlgoPedia.find({AiD:info}).fetch();
	var kwArray = AlgoPedia.find({ KeyWords: info}).fetch();
	var algoArray = AlgoPedia.find({Name:info}).fetch();
	return algoArray.concat(aidArray).concat(kwArray).concat(userArray)[0];
}

Template.searchList.goToAlgo = function(algo){
	Router.go('pedia',{_id:algo.AiD});
}

Template.searchList.goToUser = function(user){
	Router.go('users',{_id:user.username});
}
