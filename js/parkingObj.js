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
}

/*
 * Get first coordinates of a geometry because data has several coordinates
 * which represents the whole parking
 */
ParkingObj.prototype.getFirstCoordinate = function() {
    return this.coordinates[0];
};
