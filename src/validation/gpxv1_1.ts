import type { validateFunctions, castFunctions } from '.';
import { validateLongitude, validateLatitude } from './common';
export const validation: validateFunctions = {
  '/gpx/trk/trkseg/trkpt': { lon: validateLongitude, lat: validateLatitude as any },
};
export const casting: castFunctions = {
  '/gpx/trk/trkseg/trkpt/time': (val: string) => new Date(val),
  '/gpx/trk/trkseg/trkpt/ele': parseFloat,
  '/gpx/trk/trkseg/trkpt': { lon: parseFloat, lat: parseFloat },
};
