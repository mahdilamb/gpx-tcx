import * as tcxv2 from './tcxv2';
import * as tcxv1 from './tcxv1';
import * as gpxv1_1 from './gpxv1_1';
const validateAndCast = {
    'GPXv1.1': [gpxv1_1.validation, gpxv1_1.casting],
    TCXv1: [tcxv1.validation, tcxv2.casting],
    TCXv2: [tcxv2.validation, tcxv2.casting],
};
export const createValidator = (documentSchema, validate = true) => {
    const [validateFunctions, castFunctions] = validateAndCast[documentSchema];
    const castFn = (xpath, currentValue, newValue) => {
        const cast = castFunctions[xpath];
        if (cast) {
            if (typeof cast === 'function') {
                // @ts-ignore
                newValue = cast(newValue);
            }
            else {
                Object.entries(cast).forEach(([tag, castFunction]) => {
                    // @ts-ignore
                    newValue.$[tag] = castFunction(newValue.$[tag]);
                });
            }
        }
        return newValue;
    };
    if (validate) {
        return (xpath, currentValue, newValue) => {
            const validation = validateFunctions[xpath];
            if (validation) {
                if (typeof validation === 'function') {
                    // @ts-ignore
                    validation(newValue);
                }
                else {
                    Object.entries(validation).forEach(([tag, validateFunction]) => {
                        // @ts-ignore
                        validateFunction(newValue.$[tag]);
                    });
                }
            }
            return castFn(xpath, currentValue, newValue);
        };
    }
    else {
        return castFn;
    }
};
export default createValidator;
