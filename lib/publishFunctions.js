if(Meteor.isServer){
	Meteor.publish('getSearchAlgos',function(query,limit){
		return AlgoPedia.find({
			$text:{
				$search: query
			}
		},{
			score:{
						$meta: "textScore"
					}
		}).sort( { score: { $meta: "textScore" } } ).limit(limit)
	});

	Meteor.publish('getSearchLsis',function(query,limit){
		return LSIs.find({
			$text:{
				$search: query
			}
		},{
			score:{
						$meta: "textScore"
					}
		}).sort( { score: { $meta: "textScore" } } ).limit(limit)
	});

	Meteor.publish('sessionAlgo',function(query){

	});
	Meteor.publish('sessionLang',function(query){

	});
	Meteor.publish('sessionLsi',function(query){

	});
	Meteor.publish('userInfo',function(query){

	});
}

if(Meteor.isClient){
	Meteor.subscribe('getSearchAlgos',Session.get('mainQuery'),10);
}
