"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = exports.Intensity = exports.TriggerMethod = void 0;
var TriggerMethod;
(function (TriggerMethod) {
    TriggerMethod[TriggerMethod["Manual"] = 0] = "Manual";
    TriggerMethod[TriggerMethod["Distance"] = 1] = "Distance";
    TriggerMethod[TriggerMethod["Location"] = 2] = "Location";
    TriggerMethod[TriggerMethod["Time"] = 3] = "Time";
    TriggerMethod[TriggerMethod["HeartRate"] = 4] = "HeartRate";
})(TriggerMethod = exports.TriggerMethod || (exports.TriggerMethod = {}));
var Intensity;
(function (Intensity) {
    Intensity[Intensity["Active"] = 0] = "Active";
    Intensity[Intensity["Resting"] = 1] = "Resting";
})(Intensity = exports.Intensity || (exports.Intensity = {}));
var Sport;
(function (Sport) {
    Sport[Sport["Running"] = 0] = "Running";
    Sport[Sport["Biking"] = 1] = "Biking";
    Sport[Sport["Other"] = 2] = "Other";
})(Sport = exports.Sport || (exports.Sport = {}));
