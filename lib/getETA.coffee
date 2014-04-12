Meteor.methods {
  getETA: (stop,route,direction)->
    check stop,String
    check route,String
    check direction,String

    # Get data from backend
    #HTTP.get 'http://localhost:

    # For now, we just produce dummy data
    return {
      eta: do -> Random.choice [0..10]
      next: [
        do -> 15 + Random.choice [0..10]
        do -> 30 + Random.choice [0..10]
      ]
    }
}
