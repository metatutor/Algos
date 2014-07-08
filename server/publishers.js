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
