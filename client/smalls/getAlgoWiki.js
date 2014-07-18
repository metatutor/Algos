Template.algoWiki.getWiki = function(){
	if(_.isBlank(this.Description)){
		return "No information provided yet for this algorithm.";
	}
	return this.Description;
}
