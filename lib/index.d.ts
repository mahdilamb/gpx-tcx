import type { TCXv1Document, TCXv2Document, GPXv1_1Document } from './schemas';
export declare type schema = 'GPXv1.1' | 'TCXv1' | 'TCXv2';
export declare const parseTCXv2: <ExtT = any>(text: string, validate?: boolean) => TCXv2Document<"$", ExtT>;
export declare const parseTCXv1: <ExtT = any>(text: string, validate?: boolean) => TCXv1Document<"$", ExtT>;
export declare const parseGPXv1_1: <ExtT = any>(text: string, validate?: boolean) => GPXv1_1Document<"$", ExtT>;
