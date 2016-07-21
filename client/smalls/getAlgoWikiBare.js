Template.algoWikiBare.getWiki = function(){
	if(s.isBlank(this.Description)){
		return "No information provided yet for this algorithm.";
	}
	return this.Description;
}
