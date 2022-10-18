import type { TCXv1Document } from './schemas/tcxv1';
import type { TCXv2Document } from './schemas/tcxv2';
import type { GPXv1_1Document } from './schemas/gpxv1_1';
export declare type schema = 'GPXv1.1' | 'TCXv1' | 'TCXv2';
export declare const parseTCXv2: <ExtT = any>(text: string, validate?: boolean) => TCXv2Document<"$", ExtT>;
export declare const parseTCXv1: <ExtT = any>(text: string, validate?: boolean) => TCXv1Document<"$", ExtT>;
export declare const parseGPXv1_1: <ExtT = any>(text: string, validate?: boolean) => GPXv1_1Document<"$", ExtT>;
