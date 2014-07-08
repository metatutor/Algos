if(Meteor.isClient){
	Meteor.startup(function(){
		Meteor.subscribe('allLangs');
		Meteor.subscribe('getMyInfo');
	});
}
