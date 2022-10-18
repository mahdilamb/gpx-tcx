"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.casting = exports.validation = void 0;
const common_1 = require("./common");
exports.validation = {
    '/TrainingCenterDatabase/Activities/Activity/Lap/TriggerMethod': common_1.validateTriggerMethod,
    '/TrainingCenterDatabase/Activities/Activity/Lap/Intensity': common_1.validateIntensity,
    '/TrainingCenterDatabase/Activities/Activity': { Sport: common_1.validateSport },
};
exports.casting = {
    '/TrainingCenterDatabase/Activities/Activity/Id': (val) => new Date(val),
    '/TrainingCenterDatabase/Activities/Activity/Lap': { StartTime: (val) => new Date(val) },
    '/TrainingCenterDatabase/Activities/Activity/Lap/TotalTimeSeconds': parseFloat,
    '/TrainingCenterDatabase/Activities/Activity/Lap/DistanceMeters': parseFloat,
    '/TrainingCenterDatabase/Activities/Activity/Lap/Calories': parseInt,
};
