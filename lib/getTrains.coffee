Meteor.methods {
  getTrains: ->
    if @isSimulation
      return []
    # Get data from backend (check http://docs.meteor.com/#http for usage)
    res = HTTP.get 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=fbb6c5f7-89f2-4c60-9f97-23aa379914b8'
    if res.statusCode isnt 200
      throw new Meteor.Error(500, 'Failed to fetch train realtime data')
    if not _.isArray res.data
      throw new Meteor.Error(500, 'Bad data received for train realtime data')
    return res.data
}
