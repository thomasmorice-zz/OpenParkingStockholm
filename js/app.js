/*
 * OpenParking Stockholm
 * Thomas Morice - 30/06/2016
 */

var map;
var apiKey = "b283e33d-ccdd-4765-9a41-15cc53cca17a"; // API key from http://openparking.stockholm.se
var zoomValue = 11;

/*
 * Initialize the map from google and set it to the center of Stockholm
 */
function initMap() {
    // The city where the map will be centered
    var cityName = "stockholm";
    getLatLngObjectFromName(cityName, function(cityLatLng) {
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, {
            center: cityLatLng,
            zoom: zoomValue
        });
    });
    getParkingsDataAndPlaceThem();
}

/*
 * Get the Json from opendata of stockholm, parse it and construct
 */
function getParkingsDataAndPlaceThem() {
    $.getJSON("http://openparking.stockholm.se/LTF-Tolken/v1/plastbil/all?outputFormat=json&apiKey=" + apiKey + "&callback=?", function(data) {
        var items = [];
        var markers = [];
        $.each(data.features, function(key, feature) {
            var parkingObj = new ParkingObj(feature);
            var parkingMarker = addMarkerToMap(parkingObj);
        });
    });
}

function addMarkerToMap(parkingObj) {
    // Take the first coordinate for the marker
    firstCoordinate = parkingObj.getFirstCoordinate();
    var marker = new google.maps.Marker({
        position: {
            lat: firstCoordinate[1], // lat and lng are oddly reversed
            lng: firstCoordinate[0]
        },
        map: map,
        label: 'P', // P for parking because why not :/
    });

    return marker;
}

/*
 * This callback function returns a google.maps.LatLng object from a cityname
 */
function getLatLngObjectFromName(cityName, callback) {
    var geocoder = new google.maps.Geocoder();
    var cityLat;
    var cityLng;
    geocoder.geocode({
        'address': cityName
    }, function(cityPosition, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            cityLat = cityPosition[0].geometry.location.lat();
            cityLng = cityPosition[0].geometry.location.lng();
            callback(new google.maps.LatLng(cityLat, cityLng));
        } else {
            // The city latitude and longitude couldn't be retrieve
            callback(false);
        }
    });
}
