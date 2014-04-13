Template.eta.haveData = ->
  stop = Session.get 'etaStop'
  route = Session.get 'etaRoute'
  direction = Session.get 'etaDirection'
  if stop and route and direction
    return true
  return false
