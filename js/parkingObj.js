/*
 * OpenParking Stockholm
 * Thomas Morice - 01/07/2016
 * Parse all the information that comes in a "feature" from the sotckholm parking API
 * So it will be easier to get one of them and manage errors
 */

// Constructor
function ParkingObj(feature) {
    // add coordinates as properties
    this.coordinates = feature.geometry.coordinates;
    this.properties = feature.properties;
}
// Get the address and if there is no address, return a simple message to show
ParkingObj.prototype.getAddress = function() {
    var response = "";
    if (this.properties.ADDRESS == "<Adress saknas>") {
        response = "No address has been found :-("
    } else {
        response = this.properties.ADDRESS;
    }
    return response;
};

// Get the district
ParkingObj.prototype.getDistrict = function() {
    return this.properties.CITY_DISTRICT;
};

// Get the siez of the parking in meter
ParkingObj.prototype.getSizeMeter = function() {
    var response = "";
    if (typeof this.properties.VF_METER === "undefined") {
        response = "not indicated";
    } else {
        response = this.properties.VF_METER;
    }
    return response;
};

// Get additionnal information about the car park
ParkingObj.prototype.getInformation = function() {
    return this.properties.OTHER_INFO;
};

/*
 * Get first coordinates of a geometry because data has several coordinates
 * which represents the whole parking
 */
ParkingObj.prototype.getFirstCoordinate = function() {
    return this.coordinates[0];
};
