Meteor.methods({
	uploadDoc:function(docObject,uid){
		AlgoPedia.insert({
			AiD: docObject.AiD,
			Name: docObject.Name,
			Short: docObject.Short,
			Contributor: uid,
			KeyWords: docObject.KeyWords,
			When: moment().unix(),
			Description:""
		});
		Meteor.users.update({
			_id:uid
		},{
			$push:{
				"profile.algorithmContributions": docObject.AiD
			}
		});
	},
	updateWiki:function(aid,text){
		AlgoPedia.update({
			AiD:aid
		},{
			$set:{
				Wiki:text
			}
		});
	},
	updateShort:function(aid,text){
		AlgoPedia.update({
			AiD:aid
		},{
			$set:{
				Short:text
			}
		});
	},
	updateLog:function(aid,uid,change){
		AlgoPedia.update({
			AiD:aid
		},{
			$addToSet:{
				Log:{
					When:moment().unix(),
					Contributor: uid,
					Changed:change
				}
			}
		});
	},
	updateKeywords:function(aid,text){
		AlgoPedia.update({
			AiD:aid
		},{
			$set:{
				KeyWords:text
			}
		});
	}
});
