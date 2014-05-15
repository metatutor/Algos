Template.queryETA.events {
  'change select[name=stop]': (e,template)->
    Session.set 'etaStop',e.currentTarget.value
}

Template.queryETA.stop = ->
  return Session.get 'etaStop'

Template.queryETA.stops = ->
  return Stations.find({position: {$lt: 24}},{ sort: ['position'] })

Template.queryETA.stops2 = ->
  return Stations.find({position: {$gt: 23}},{ sort: ['position'] })

Template.queryETA.selectedStation = (name)->
  if Session.equals 'etaStop',name
    return "selected"
  return ""
