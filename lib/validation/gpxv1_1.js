import { validateLongitude, validateLatitude } from './common';
export const validation = {
    '/gpx/trk/trkseg/trkpt': { lon: validateLongitude, lat: validateLatitude },
};
export const casting = {
    '/gpx/trk/trkseg/trkpt/time': (val) => new Date(val),
    '/gpx/trk/trkseg/trkpt/ele': parseFloat,
    '/gpx/trk/trkseg/trkpt': { lon: parseFloat, lat: parseFloat },
};
