@Stations = new Meteor.Collection 'stations'

refreshFromMARTA = ->
  res = HTTP.get "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=#{share.api_key_MARTA}"
  if res.statusCode isnt 200
    return console.log "Failed to get realtime train information",res
  if not _.isArray res.data
    return console.log "Failed to get meaningful realtime train information",res	
  stations= []
  stations.push("HIGHTOWER STATION")
  stations.push("WESTLAKE STATION")
  stations = _.uniq(_.pluck(res.data,'STATION')).sort()
  stations.sort()
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

geoSort = ->
	

stationNameMap =
	"AIRPORT STATION": "Airport"
	"ARTS CENTER STATION": "Arts Center"
	"ASHBY STATION": "Ashby"
	"AVONDALE STATION": "Avondale"
	"BANKHEAD STATION": "Bankhead"
	"BROOKHAVEN STATION": "Brookhaven"
	"BUCKHEAD STATION": "Buckhead"
	"CHAMBLEE STATION": "Chamblee"
	"CIVIC CENTER STATION": "Civic Center"
	"COLLEGE PARK STATION": "College Park"
	"DECATUR STATION": "Decatur"
	"DORAVILLE STATION": "Doraville"
	"DUNWOODY STATION": "Dunwoody"
	"EAST LAKE STATION": "East Lake"
	"EAST POINT STATION": "East Point"
	"EDGEWOOD CANDLER PARK STATION": "Edgewood/Candler Park"
	"FIVE POINTS STATION": "Five Points"
	"GARNETT STATION": "Garnett"
	"GEORGIA STATE STATION": "Georgia State University"
	"HIGHTOWER STATION": "Hamilton Holmes"
	"INDIAN CREEK STATION": "Indian Creek"
	"INMAN PARK STATION": "Inman Park"
	"KENSINGTON STATION": "Kensington"
	"KING MEMORIAL STATION": "King Memorial"
	"LAKEWOOD STATION": "Lakewood"
	"LENOX STATION": "Lenox"
	"LINDBERGH STATION": "Lindbergh"
	"MEDICAL CENTER STATION": "Medical Center"
	"MIDTOWN STATION": "Midtown"
	"NORTH AVE STATION": "North Avenue"
	"NORTH SPRINGS STATION": "North Springs"
	"OAKLAND CITY STATION": "Oakland City"
	"OMNI DOME STATION": "Dome/GWCC/Phillips/CNN"
	"PEACHTREE CENTER STATION": "Peachtree Center"
	"SANDY SPRINGS STATION": "Sandy Springs"
	"VINE CITY STATION": "Vine City"
	"WEST END STATION": "West End"
	"WESTLAKE STATION": "West Lake"
