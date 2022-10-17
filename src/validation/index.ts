

import { schema } from ".."
import * as tcxv2 from "./tcxv2"
import * as gpxv1_1 from "./gpxv1_1"


type parseFunction<T, S extends T | void = T> = (value: T) => S
type castFunction = parseFunction<(string | number) | number | string>
type validateFunction = parseFunction<(string | number) | number | string, void>
export type castFunctions = { [path: string]: validateFunction | { [tag: string]: validateFunction } }
export type validateFunctions = { [path: string]: validateFunction | { [tag: string]: validateFunction } }


const validateAndCast: Record<schema, [validateFunctions, castFunctions]> = {
    "GPXv1.1": [gpxv1_1.validation, gpxv1_1.casting],
    "TCXv1": [{}, {}], // TODO
    "TCXv2": [tcxv2.validation, tcxv2.casting]
}

export const createValidator = (schema: schema, validate: boolean = true) => {
    const [validateFunctions, castFunctions] = validateAndCast[schema]

    if (validate) {
        return (xpath: string, currentValue: any, newValue: any) => {
            let cast, validation;
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
    } else {
        return (xpath: string, currentValue: any, newValue: any) => {
            let cast;
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
    }
}


export default createValidator
