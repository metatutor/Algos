Meteor.methods({
	uploadLSI:function(lsiObject,userid){
		LSIs.insert(lsiObject);
		Meteor.users.update({
			_id:userid
		},{
			$push:{
				'profile.codeContributions':lsiObject._id
			}
		});
		var user = Meteor.users.findOne({_id:userid});
		if(user.profile.codContributions.length>50){
			Meteor.users.update({
				_id:userid
			},{
				$push:{
					'profile.awards':"Hyper-Active Citizen"
				}
			});
			var message = {
				Sender: "You have a new award!",
				Text: "You earned 'Hyper-Active Citizen' for your code submissions!"
			}
			Meteor.call('sendNotification',user.username,message);
		}
		else{
			if(user.profile.codContributions.length>20){
				Meteor.users.update({
					_id:userid
				},{
					$push:{
						'profile.awards':"Super-Active Citizen"
					}
				});
				var message = {
					Sender: "You have a new award!",
					Text: "You earned 'Super-Active Citizen' for your code submissions!"
				}
				Meteor.call('sendNotification',user.username,message);
			}
			else{
				if(user.profile.codContributions.length>5){
					Meteor.users.update({
						_id:userid
					},{
						$push:{
							'profile.awards':"Active Citizen"
						}
					});
					var message = {
						Sender: "You have a new award!",
						Text: "You earned 'Active Citizen' for your code submissions!"
					}
					Meteor.call('sendNotification',user.username,message);
				}
			}
		}
	}
});