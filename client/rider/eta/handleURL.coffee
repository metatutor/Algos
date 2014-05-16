Template.handleURL.stationDoc = ->
	stop = Session.get 'etaStop'
	return Stations.find({ name: stop})
