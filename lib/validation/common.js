"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSport = exports.validateIntensity = exports.validateTriggerMethod = exports.validateLatitude = exports.validateLongitude = void 0;
const xml2js_1 = require("xml2js");
const schemas_1 = require("../schemas");
/**
 * Validate Longitude values are in range [-180,180]
 * @param value the value to check
 */
const validateLongitude = (value) => {
    if (Math.abs(value) > 180) {
        throw new xml2js_1.ValidationError(`Got an invalid longitude (${value}). Should be in range [-180,180]`);
    }
};
exports.validateLongitude = validateLongitude;
/**
 * Validate that latitude values are in range [-90,90]
 * @param value the latitude value
 */
const validateLatitude = (value) => {
    if (Math.abs(value) > 90) {
        throw new xml2js_1.ValidationError(`Got an invalid latitude (${value}). Should be in range [-90,90]`);
    }
};
exports.validateLatitude = validateLatitude;
/**
 * Create a validator for an enum
 * @param Enum The enum used to create the validator
 * @param name The name that is printed out next to the error message
 * @returns A validator for the given enum
 */
const enumValidator = (Enum, name) => {
    return (value) => {
        if (value in Enum) {
            return;
        }
        const possibleValues = Object.keys(Enum).splice(Object.keys(Enum).length / 2);
        throw new xml2js_1.ValidationError(`Got an invalid ${name} method (${value}). Should be one of [${possibleValues}]`);
    };
};
/**
 * Validate trigger methods
 * @see TriggerMethod
 */
exports.validateTriggerMethod = enumValidator(schemas_1.enums.TriggerMethod, 'trigger method');
/**
 * Validate intensity.
 * @see Intensity
 */
exports.validateIntensity = enumValidator(schemas_1.enums.Intensity, 'intensity');
/**
 * Valid Sport types
 * @see Sport
 */
exports.validateSport = enumValidator(schemas_1.enums.Sport, 'sport');
