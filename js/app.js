/*
 * OpenParking Stockholm
 * Thomas Morice - 30/06/2016
 */

var map;
var apiKey = "b283e33d-ccdd-4765-9a41-15cc53cca17a"; // API key from http://openparking.stockholm.se
var unzoomedMapsValue = 11;
var zoomedMapsValue = 18;

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
            zoom: unzoomedMapsValue
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
            addParkingListenerAndInfo(parkingMarker, parkingObj);
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


function addParkingListenerAndInfo(parkingMarker, parkingObj) {
    google.maps.event.addListener(parkingMarker, 'click', function() {
        // add informations for the current parking to be shown on modal window
        $('#city-district').text(parkingObj.getDistrict());
        $('#address').text(parkingObj.getAddress());
        $('#vf-meter').text(parkingObj.getSizeMeter());
        $('#other-information').text(parkingObj.getInformation());

        map.panTo(parkingMarker.getPosition());
        map.setZoom(zoomedMapsValue);
        // Add a listener to this marker so we can show details of the parking
        $('#parking-details').openModal({
            //dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: .2, // Opacity of modal background
            ready: function() {}, // Callback for Modal open
        });
    });
}

/*
 * This function is called when we click on the "Back to full view" button on the modal box
 */
function backToFullView() {
    map.setZoom(unzoomedMapsValue);
}
