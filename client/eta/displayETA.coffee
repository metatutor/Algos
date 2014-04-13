Template.displayETA.etas = ->
  stop = Session.get 'etaStop'
  route = Session.get 'etaRoute'
  direction = Session.get 'etaDirection'
  arrivals =  Arrivals.find {
    station: stop
    line: route
    direction: direction
  },{ sort: ['next_arr'] }
  console.log "Arrivals:",arrivals.fetch()
  return arrivals

