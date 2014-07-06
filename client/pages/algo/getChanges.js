Template.getChanges.change = function(){
	var list = _.sortBy(AlgoPedia.findOne({AiD:this.AiD}).Log,function(obj){
		return obj.When;
	});
	return list.reverse();
}
