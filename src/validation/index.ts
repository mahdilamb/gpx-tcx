import type { schema } from ".."
import * as tcxv2 from "./tcxv2"
import * as tcxv1 from "./tcxv1"
import * as gpxv1_1 from "./gpxv1_1"


type parseFunction<T, R = T, S extends R | void = R> = (value: T) => S
type castFunction = parseFunction<(string | number) | number | string, any>
type validateFunction = parseFunction<(string | number) | number | string, any, void>
export type castFunctions = { [path: string]: castFunction | { [tag: string]: castFunction } }
export type validateFunctions = { [path: string]: validateFunction | { [tag: string]: validateFunction } }


const validateAndCast: Record<schema, [validateFunctions, castFunctions]> = {
    "GPXv1.1": [gpxv1_1.validation, gpxv1_1.casting],
    "TCXv1": [tcxv1.validation, tcxv2.casting],
    "TCXv2": [tcxv2.validation, tcxv2.casting]
}

export const createValidator = (schema: schema, validate: boolean = true) => {
    const [validateFunctions, castFunctions] = validateAndCast[schema]
    const castFn = (xpath: string, currentValue: any, newValue: any) => {
        let cast: castFunction | { [tag: string]: castFunction };
        if (cast = (castFunctions[xpath])) {
            if (typeof cast === "function") {
                newValue = cast(newValue)
            }
            else {
                Object.entries<castFunction>(cast).forEach(([tag, castFunction]) => {
                    newValue['$'][tag] = castFunction(newValue['$'][tag])
                });
            }
        }
        return newValue
    }
    if (validate) {
        return (xpath: string, currentValue: any, newValue: any) => {
            let validation: validateFunction | { [tag: string]: validateFunction };
            if (validation = validateFunctions[xpath]) {
                if (typeof validation === "function") {
                    validation(newValue)
                }
                else {
                    Object.entries<validateFunction>(validation).forEach(([tag, validateFunction]) => {
                        validateFunction(newValue['$'][tag])
                    });
                }
            }
            return castFn(xpath, currentValue, newValue)
        }
    } else {
        return castFn
    }
}


export default createValidator
