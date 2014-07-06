Template.algoWikiBare.getWiki = function(){
	if(_.isBlank(this.Wiki)){
		return "No information provided yet for this algorithm.";
	}
	return this.Wiki;
}
