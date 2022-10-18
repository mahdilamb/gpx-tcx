import { validateTriggerMethod, validateIntensity, validateSport } from './common';
export const validation = {
    '/TrainingCenterDatabase/Activities/Activity/Lap/TriggerMethod': validateTriggerMethod,
    '/TrainingCenterDatabase/Activities/Activity/Lap/Intensity': validateIntensity,
    '/TrainingCenterDatabase/Activities/Activity': { Sport: validateSport },
};
export const casting = {
    '/TrainingCenterDatabase/Activities/Activity/Id': (val) => new Date(val),
    '/TrainingCenterDatabase/Activities/Activity/Lap': { StartTime: (val) => new Date(val) },
    '/TrainingCenterDatabase/Activities/Activity/Lap/TotalTimeSeconds': parseFloat,
    '/TrainingCenterDatabase/Activities/Activity/Lap/DistanceMeters': parseFloat,
    '/TrainingCenterDatabase/Activities/Activity/Lap/Calories': parseInt,
};
