Template.randomAlgo.randomEntry = function(){
	var choices = AlgoPedia.find().fetch();
	return choices[Math.floor((Math.random() * choices.length))];
}
