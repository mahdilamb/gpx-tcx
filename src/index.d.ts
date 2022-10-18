import type { GPXv1_1Document } from "gpx-tcx/src/schemas/gpxv1_1";
import type { TCXv1Document } from "gpx-tcx/src/schemas/tcxv1";
import type { TCXv2Document } from "gpx-tcx/src/schemas/tcxv2";

export function parseTCXv2<ExtT = any>(text: string, validate: boolean): TCXv2Document<'$', ExtT>;
export function parseTCXv1<ExtT = any>(text: string, validate: boolean): TCXv1Document<'$', ExtT>;
export function parseGPXv1_1<ExtT = any>(text: string, validate: boolean): GPXv1_1Document<'$', ExtT>;
