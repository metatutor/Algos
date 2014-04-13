Template.queryETA.events {
  'change input[name=stop]': (e,template)->
    template.data.stop = e.currentTarget.value
  'change input[name=route]': (e,template)->
    template.data.route = e.currentTarget.value
  'change input[name=direction]': (e,template)->
    template.data.direction = e.currentTarget.value
}

Template.queryETA.stops = ->
  return Stations.find()
