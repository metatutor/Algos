Template.pedia.events = {
	'click a': function(){
		Router.go('pediaSpecific',{_id:this.AiD});
	},
	'click button[name=visitAlgo]':function(){
		Router.go('pedia',{_id:this.AiD});
	}
}

Template.pedia.getAlgos = function(){
	return AlgoPedia.find().fetch();
}

Template.pedia.isActive = function(obj){
	if(Session.equals('pediaAiD',obj.AiD)){
		return "active";
	}
	return "";
}

Template.pedia.algo = function(){
	var aid = Session.get('pediaAiD');
	var algo = AlgoPedia.findOne({AiD:aid});
	if(algo){
		return algo;
	}
	return;
}
