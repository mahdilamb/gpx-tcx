"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.casting = exports.validation = void 0;
const common_1 = require("./common");
exports.validation = {
    '/gpx/trk/trkseg/trkpt': { lon: common_1.validateLongitude, lat: common_1.validateLatitude },
};
exports.casting = {
    '/gpx/trk/trkseg/trkpt/time': (val) => new Date(val),
    '/gpx/trk/trkseg/trkpt/ele': parseFloat,
    '/gpx/trk/trkseg/trkpt': { lon: parseFloat, lat: parseFloat },
};
