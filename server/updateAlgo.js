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
		var user = Meteor.users.findOne({_id:uid});
		if(user.profile.algorithmContributions.length>50){
			Meteor.users.update({
				_id:uid
			},{
				$addToSet:{
					"profile.awards":"Scholar"
				}
			});
			var message = {
				Sender: "You have a new award!",
				Text: "You earned 'Scholar' for your algorithm submissions!"
			}
			Meteor.call('sendNotification',uid,message);
		}
		else{
			if(user.profile.algorithmContributions.length>20){
				Meteor.users.update({
					_id:uid
				},{
					$addToSet:{
						"profile.awards":"Author"
					}
				});
				var message = {
					Sender: "You have a new award!",
					Text: "You earned 'Author' for your algorithm submissions!"
				}
				Meteor.call('sendNotification',uid,message);
			}
			else{
				if(user.profile.algorithmContributions.length>5){
					Meteor.users.update({
						_id:uid
					},{
						$addToSet:{
							"profile.awards":"Bookworm"
						}
					});
					var message = {
						Sender: "You have a new award!",
						Text: "You earned 'Bookworm' for your algorithm submissions!"
					}
					Meteor.call('sendNotification',uid,message);
				}
			}
		}
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
