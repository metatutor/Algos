@Stations = new Meteor.Collection 'stations'

if Meteor.isServer
  # Periodically update the station list
  stationInterval = Meteor.setInterval ->
    res = HTTP.get 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=fbb6c5f7-89f2-4c60-9f97-23aa379914b8'
    if res.statusCode isnt 200
      return console.log "Failed to get realtime train information",res
    if not _.isArray res.data
      return console.log "Failed to get meaningful realtime train information",res
    stations = _.uniq(_.pluck(res.data,'STATION')).sort()
    _.each res.data,(i)->
      Stations.upsert {
        id: i
      }
  ,60000

