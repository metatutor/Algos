Template.displayETA.arrivals = (direction)->
  stop = Session.get 'etaStop'
  if not stop
    return
  return Arrivals.find({ station: stop, direction: direction },{ sort: ['next_arr'] })

