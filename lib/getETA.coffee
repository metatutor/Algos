Meteor.methods {
  getETA: (stop,route,direction)->
    check opts.stop,String
    check opts.route,String
    check opts.direction,String

    # Get data from backend
    #HTTP.get 'http://localhost:

    # For now, we just produce dummy data
    return {
      eta: do -> Random [0,1,2,3,4,5,6,7,8,9,10]
      next: [
        do -> 15 + Random [0,1,2,3,4,5,6,7,8,9,10]
        do -> 30 + Random [0,1,2,3,4,5,6,7,8,9,10]
      ]
    }
}
