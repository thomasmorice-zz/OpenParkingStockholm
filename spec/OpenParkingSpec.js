/*
 * OpenParking Stockholm v0.1
 * Thomas Morice - 01/07/2016
 * Test case that should be runned by SpecRunner.html
 */


// Specs
// We wait for google api to be loaded before running unit tests
function initTest() {
    var cityName = "stockholm";

    getLatLngObjectFromName(cityName, function(cityLatLng) {

        // Test that the LatLng object has been received correctly for the city passed as parameter
        describe("getLatLngObjectFromName", function() {
            it("LatLng object is returned", function() {
                expect(cityLatLng).not.toBeFalsy();
            });
        });

        // Test that Latitude and Longitude are numbers
        describe("getLatLngObjectFromName", function() {
            it("Latitude and Longitude from " + cityName + " are Numbers", function() {
                expect(cityLatLng.lat()).toEqual(jasmine.any(Number));
                expect(cityLatLng.lng()).toEqual(jasmine.any(Number));
            });
        });

    });


    $.getJSON("http://openparking.stockholm.se/LTF-Tolken/v1/plastbil/all?outputFormat=json&apiKey=" + apiKey + "&callback=?", function(data) {
        var items = [];
        var markers = [];
        $.each(data.features, function(key, feature) {
            var parkingObj = new ParkingObj(feature);

            // For each first coordinate that has been fetched from JSON feature, test that they are numbers
            describe("getFirstCoordinate", function() {
                it("Latitude and Longitude from JSON are Numbers", function() {
                    expect(parkingObj.getFirstCoordinate()[0]).toEqual(jasmine.any(Number));
                    expect(parkingObj.getFirstCoordinate()[1]).toEqual(jasmine.any(Number));
                });
            });

            // For each first coordinate that has been fetched from JSON feature, test that they are numbers
            describe("getAddress", function() {
                it("Adress from parrkingObj is not empty string", function() {
                    expect(parkingObj.getAddress()).not.toEqual("");
                });
            });

        });
    });
}
