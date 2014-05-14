@Stations = new Meteor.Collection 'stations'

refreshFromMARTA = ->
  res = HTTP.get "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=#{share.api_key_MARTA}"
  if res.statusCode isnt 200
    return console.log "Failed to get realtime train information",res
  if not _.isArray res.data
    return console.log "Failed to get meaningful realtime train information",res
  stations = _.uniq(_.pluck(res.data,'STATION')).sort()
  _.each stations,(i)->
    Stations.update {
      name: i
    },{ $set: { name: i, displayName: stationNameMap[i] }},{ upsert: true }

if Meteor.isServer
  # Periodically update the station list
  stationInterval = null
  Meteor.startup ->
    refreshFromMARTA()
    stationInterval = Meteor.setInterval refreshFromMARTA,60000

stationNameMap =
	"AIRPORT STATION": "Airport Station"
	"ARTS CENTER STATION": "Arts Center Station"
	"ASHBY STATION": "Ashby Station"
	"AVONDALE STATION": "Avondale Station"
	"BANKHEAD STATION": "Bankhead Station"
	"BROOKHAVEN STATION": "Brookhaven Station"
	"BUCKHEAD STATION": "Buckhead Station"
	"CHAMBLEE STATION": "Chamblee Station"
	"CIVIC CENTER STATION": "Civic Center Station"
	"COLLEGE PARK STATION": "College Park Station"
	"DECATUR STATION": "Decatur Station"
	"DORAVILLE STATION": "Doraville Station"
	"DUNWOODY STATION": "Dunwoody Station"
	"EAST LAKE STATION": "East Lake Station"
	"EAST POINT STATION": "East Point Station"
	"EDGEWOOD CANDLER PARK STATION": "Edgewood/Candler Park Station"
	"FIVE POINTS STATION": "Five Point Station"
	"GARNETT STATION": "Garnett Station"
	"GEORGIA STATE STATION": "Georgia State Station"
	"INDIAN CREEK STATION": "Indian Creek Station"
	"INMAN PARK STATION": "Inman Park Station"
	"KENSINGTON STATION": "Kensington Station"
	"KING MEMORIAL STATION": "King Memorial Station"
	"LAKEWOOD STATION": "Lakewood Station"
	"LENOX STATION": "Lenox Station"
	"LINDBERGH STATION": "Lindbergh Station"
	"MEDICAL CENTER STATION": "Medical Center Station"
	"MIDTOWN STATION": "Midtown Station"
	"NORTH AVE STATION": "North Avenue Station"
	"NORTH SPRINGS STATION": "North Springs Station"
	"OAKLAND CITY STATION": "Oakland City Station"
	"OMNI DOME STATION": "Omni Dome Station"
	"PEACHTREE CENTER STATION": "Peachtree Center Station"
	"SANDY SPRINGS STATION": "Sandy Springs Station"
	"VINE CITY STATION": "Vine City Station"
	"WEST END STATION": "West End Station"
