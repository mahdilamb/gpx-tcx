import { ValidationError } from "xml2js"
import { Intensity, TriggerMethod } from "../enums"

export const validateLongitude = (value: number) => {
    if (Math.abs(value) > 180) {
        throw new ValidationError(`Got an invalid longitude (${value}). Should be in range [-180,180]`)
    }
}

export const validateLatitude = (value: number) => {
    if (Math.abs(value) > 90) {
        throw new ValidationError(`Got an invalid latitude (${value}). Should be in range [-90,90]`)
    }
}


export const validateTriggerMethod = (value: string) => {
    if (value in TriggerMethod) {
        return
    }
    const possibleValues = Object.keys(TriggerMethod).splice(Object.keys(TriggerMethod).length / 2)
    throw new ValidationError(`Got an invalid trigger method (${value}). Should be one of [${possibleValues}]`)

}

export const validateIntensity = (value: string) => {
    if (value in Intensity) {
        return
    }
    const possibleValues = Object.keys(Intensity).splice(Object.keys(Intensity).length / 2)
    throw new ValidationError(`Got an invalid intensity (${value}). Should be one of [${possibleValues}]`)

}

