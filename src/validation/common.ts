import { ValidationError } from 'xml2js';
import { enums } from '../schemas';
/**
 * Validate Longitude values are in range [-180,180]
 * @param value the value to check
 */
export const validateLongitude = (value: number) => {
  if (Math.abs(value) > 180) {
    throw new ValidationError(`Got an invalid longitude (${value}). Should be in range [-180,180]`);
  }
};
/**
 * Validate that latitude values are in range [-90,90]
 * @param value the latitude value
 */
export const validateLatitude = (value: number) => {
  if (Math.abs(value) > 90) {
    throw new ValidationError(`Got an invalid latitude (${value}). Should be in range [-90,90]`);
  }
};

/**
 * Create a validator for an enum
 * @param Enum The enum used to create the validator
 * @param name The name that is printed out next to the error message
 * @returns A validator for the given enum
 */
const enumValidator = <T extends string>(Enum: { [key in T]: string | number }, name: string) => {
  return (value: string) => {
    if (value in Enum) {
      return;
    }
    const possibleValues = Object.keys(Enum).splice(Object.keys(Enum).length / 2);
    throw new ValidationError(`Got an invalid ${name} method (${value}). Should be one of [${possibleValues}]`);
  };
};
/**
 * Validate trigger methods
 * @see TriggerMethod
 */
export const validateTriggerMethod = enumValidator(enums.TriggerMethod, 'trigger method');
/**
 * Validate intensity.
 * @see Intensity
 */
export const validateIntensity = enumValidator(enums.Intensity, 'intensity');
/**
 * Valid Sport types
 * @see Sport
 */
export const validateSport = enumValidator(enums.Sport, 'sport');
