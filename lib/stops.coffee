@Stops = new Meteor.Collection 'stops'

if Meteor.isServer
  # Remove all stops on start (this is a poor-man's data refresh)
  Stops.remove {}

  # Hard-code the stops, for now
  stops = [
    {
      id: '907933'
      code: '27'
      name: 'Hamilton E Holmes Station'
      lat: 33.754627
      lon: -84.468041
    }
  ]
  _.each stops,(stop)->
    Stops.insert stop
    return
  return

  # Re-add all stops from service
  res = HTTP.get 'http://api.navdash.com/stops'
  if res.statusCode isnt 200
    throw new Meteor.Error(500, 'Failed to fetch stops list')
  if not _.isArray res.data
    throw new Meteor.Error(500, 'Bad data received for stops list')
  _.each res.data,(stop)->
    Stops.insert stop
    return
  
