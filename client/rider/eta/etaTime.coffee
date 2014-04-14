etaClock = new Deps.Dependency

Meteor.startup ->
  # Start the global etaClock timer
  setInterval ->
    etaClock.changed()

Template.etaTime.liveETA = ->
  # Rerun each etaClock cycle
  etaClock.depend()
  # Find offset (in seconds) between event time and now
  offset = moment().unix() - @event_time
  # Subtract the offset from the data's ETA
  liveETA = @waiting_seconds - offset
  duration = moment.duration(liveETA,"seconds")
  if liveETA > 599
    return "#{Math.floor(duration.asMinutes())} min"
  # For short times, display seconds
  secs = duration.seconds()
  if secs < 0
    return "0:00"
  if secs < 10
    return "#{duration.minutes()}:0#{secs}"
  return "#{duration.minutes()}:#{secs}"
