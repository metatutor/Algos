@Trains = new Meteor.Collection 'trains'

if Meteor.isServer
  trainsInterval = null
  Meteor.startup ->
    updateTrains()
    trainsInterval = Meteor.setInterval updateTrains,10000

updateTrains = ->
  res = HTTP.get 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=fbb6c5f7-89f2-4c60-9f97-23aa379914b8'
  if res.statusCode isnt 200
    return console.error "Failed to get train data",res
  if not _.isArray res.data
    return console.error "Got invalid train data",res
  _.each res.data,(i)->
    Trains.update {
      id: i.TRAIN_ID
    },{
      $set:
        id: i.TRAIN_ID
        destination: i.DESTINATION
        direction: i.DIRECTION
        event_time: i.EVENT_TIME
        line: i.LINE
        next_arr: i.NEXT_ARR
        station: i.STATION
        waiting_seconds: i.WAITING_SECONDS
        waiting_time: i.WAITING_TIME
    },{ upsert: true }
  console.log "Updated train data"
