Template.eta.haveData = ->
  if @stop and @route and @direction
    return true
  return false
