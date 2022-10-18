/**
 * Validate Longitude values are in range [-180,180]
 * @param value the value to check
 */
export declare const validateLongitude: (value: number) => void;
/**
 * Validate that latitude values are in range [-90,90]
 * @param value the latitude value
 */
export declare const validateLatitude: (value: number) => void;
/**
 * Validate trigger methods
 * @see TriggerMethod
 */
export declare const validateTriggerMethod: (value: string) => void;
/**
 * Validate intensity.
 * @see Intensity
 */
export declare const validateIntensity: (value: string) => void;
/**
 * Valid Sport types
 * @see Sport
 */
export declare const validateSport: (value: string) => void;
