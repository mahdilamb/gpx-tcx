import { validateTriggerMethod, validateIntensity } from "./common"
import { validateFunctions, castFunctions } from "./index"

export const validation: validateFunctions = {
    "/TrainingCenterDatabase/Activities/Activity/Lap/TriggerMethod": validateTriggerMethod,
    "/TrainingCenterDatabase/Activities/Activity/Lap/Intensity": validateIntensity
}

export const casting: castFunctions = {
    "/TrainingCenterDatabase/Activities/Activity/Id": val => new Date(val),
    "/TrainingCenterDatabase/Activities/Activity/Lap": { "StartTime": val => new Date(val) },
    "/TrainingCenterDatabase/Activities/Activity/Lap/TotalTimeSeconds": parseFloat,
    "/TrainingCenterDatabase/Activities/Activity/Lap/DistanceMeters": parseFloat,
    "/TrainingCenterDatabase/Activities/Activity/Lap/Calories": parseInt
}
