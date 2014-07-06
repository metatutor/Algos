Meteor.methods({
	uploadDoc:function(docObject,uname){
		AlgoPedia.insert({
			AiD: docObject.AiD,
			Name: docObject.Name,
			Short: docObject.Short,
			Contributor: uname,
			KeyWords: docObject.KeyWords,
			When: moment().unix(),
			Description:""
		});
		Meteor.users.update({
			username:uname
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
	updateLog:function(aid,username,change){
		AlgoPedia.update({
			AiD:aid
		},{
			$addToSet:{
				Log:{
					When:moment().unix(),
					Contributor: username,
					Changed:change
				}
			}
		});
	},
});
