/*
 * OpenParking Stockholm
 * Thomas Morice - 30/06/2016
 */

var map;
var zoomValue = 13;

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
