Template.queryETA.created = ->
  Session.set 'etaStop',null
  Session.set 'etaRoute',null
  Session.set 'etaDirection',null

Template.queryETA.events {
  'change select[name=stop]': (e,template)->
    Session.set 'etaStop',e.currentTarget.value
  'change select[name=route]': (e,template)->
    Session.set 'etaRoute',e.currentTarget.value
  'change select[name=direction]': (e,template)->
    Session.set 'etaDirection',e.currentTarget.value
}

Template.queryETA.direction = ->
  return Session.get 'etaDirection'

Template.queryETA.route = ->
  return Session.get 'etaRoute'

Template.queryETA.stop = ->
  return Session.get 'etaStop'

Template.queryETA.stops = ->
  return Stations.find()

Template.queryETA.routes = ->
  stop = Session.get 'etaStop'
  if not stop
    return
  lines = Arrivals.find({
    station: stop
  },{
    line: 1
  }).fetch()
  if not lines
    return
  Session.set 'etaRoute',lines[0].line
  return _.uniq(_.pluck(lines,'line'))

Template.queryETA.directions = ->
  stop = Session.get 'etaStop'
  route = Session.get 'etaRoute'
  if not stop
    return
  directions = Arrivals.find({
    station: stop
    line: route
  },{
    direction: 1
  }).fetch()
  console.log "Got directions:",directions
  if not directions
    return
  Session.set 'etaDirection',directions[0].direction
  return _.uniq(_.pluck(directions,'direction'))

