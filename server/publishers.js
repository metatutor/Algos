Meteor.publish('algoParticular',function(algoID){
	return AlgoPedia.find({AiD:algoID});
});

Meteor.publish('allLangs',function(){
	return Languages.find();
});

Meteor.publish('codeByAlgo',function(algoID){
	return LSIs.find({pAiD:algoID});
});

Meteor.publish('codeByAlgoAndLang',function(algoID,langSlug){
	var lang = Languages.findOne({Slug:langSlug});
	return LSIs.find({pAiD:algoID,Language:lang.Name});
});

Meteor.publish('codeByLang',function(langSlug){
	var lang = Languages.findOne({Slug:langSlug});
	return LSIs.find({Language:lang.Name});
});

Meteor.publish('getUserAlgos',function(username){
	var user = Meteor.users.findOne({username:username});
	return AlgoPedia.find({Contributor:user._id});
});

Meteor.publish('getAlgosByReg',function(query){
	var queryMod = new RegExp(query);
	return AlgoPedia.find({AiD: { $regex: queryMod}});
});

Meteor.publish('getAlgosByKeyWord',function(query){
	query = query.toLowerCase();
	return AlgoPedia.find({KeyWords: query});
});

Meteor.publish('getMyInfo',function(){
	return Meteor.users.find({_id:this.userId},{fields: {profile:1}});
});
