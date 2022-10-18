export var TriggerMethod;
(function (TriggerMethod) {
    TriggerMethod[TriggerMethod["Manual"] = 0] = "Manual";
    TriggerMethod[TriggerMethod["Distance"] = 1] = "Distance";
    TriggerMethod[TriggerMethod["Location"] = 2] = "Location";
    TriggerMethod[TriggerMethod["Time"] = 3] = "Time";
    TriggerMethod[TriggerMethod["HeartRate"] = 4] = "HeartRate";
})(TriggerMethod || (TriggerMethod = {}));
export var Intensity;
(function (Intensity) {
    Intensity[Intensity["Active"] = 0] = "Active";
    Intensity[Intensity["Resting"] = 1] = "Resting";
})(Intensity || (Intensity = {}));
export var Sport;
(function (Sport) {
    Sport[Sport["Running"] = 0] = "Running";
    Sport[Sport["Biking"] = 1] = "Biking";
    Sport[Sport["Other"] = 2] = "Other";
})(Sport || (Sport = {}));
