Meteor.methods {
  getETA: (stop,route,direction)->
    check stop,String # This should be the stop_id
    check route,String # This should be the route_id
    check direction,String # This should be the direction_id, as specified in the trips feed

    # Get data from backend (check http://docs.meteor.com/#http for usage)
    #HTTP.get 'http://localhost/get...'

    # For now, we just produce dummy data
    return {
      eta: do -> Random.choice [0..10] # The nearest arrival ETA
      next: [
        do -> 15 + Random.choice [0..10] # The next arrival ETA
        do -> 30 + Random.choice [0..10] # etc...
      ]
    }
}
