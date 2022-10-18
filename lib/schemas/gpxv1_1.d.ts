/**
 * Type definition for GPXv1.1 files. Schema based on {@link: https://www.topografix.com/GPX/1/1/gpx.xsd}
 *
 */
declare type integer = number;
declare type decimal = number;
declare type DateTime = Date;
declare type double = number;
declare type anyUri = string;
declare type nonNegativeInteger = number;
declare type longitude = double;
declare type latitude = double;
declare type degrees = double;
declare type fix = 'none' | '2d' | '3d' | 'dgps' | 'pps';
declare type dgpsStation = integer;
declare type gYear = string | number;
declare type Bounds = {
    minlat: latitude;
    minlon: longitude;
    maxlat: latitude;
    maxlon: longitude;
};
declare type Person = {
    name?: string;
    email?: string;
    link?: Link;
};
declare type Link = {
    text?: string;
    type?: string;
    href: anyUri;
};
declare type Copyright = {
    year?: gYear;
    license?: anyUri;
    author: string;
};
declare type TrackSegment<ExtT = any> = {
    trkpt?: Waypoint[];
    extensions?: ExtT;
};
declare type Track<ExtT = any> = {
    name?: string[];
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: nonNegativeInteger;
    type?: string;
    extensions?: ExtT[];
    trkseg?: TrackSegment<ExtT>[];
};
declare type Route<ExtT = any> = {
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    number?: nonNegativeInteger;
    type?: string;
    extensions?: ExtT[];
    rtept?: Waypoint[];
};
declare type Waypoint<ExtT = any> = {
    ele: decimal[];
    time: DateTime[];
    magvar: degrees;
    geoidheight: decimal;
    name?: string;
    cmt?: string;
    desc?: string;
    src?: string;
    link?: Link[];
    sym?: string;
    type?: string;
    fix?: fix;
    sat?: nonNegativeInteger;
    hdop?: decimal;
    vdop?: decimal;
    pdop?: decimal;
    ageodgpsdata?: decimal;
    dgpsid?: dgpsStation;
    extensions?: ExtT;
    lat: latitude;
    lon: longitude;
};
declare type Metadata<ExtT = any> = {
    name?: string;
    desc?: string;
    author?: Person;
    copyright?: Copyright;
    link?: Link;
    time?: string;
    keywords?: string;
    bounds?: Bounds;
    extensions?: ExtT[];
};
declare type GPX<attrK extends string, ExtT = any> = {
    metadata: Metadata;
    wpt?: Waypoint[];
    rte?: Route[];
    trk?: Track[];
    extensions?: ExtT[];
    version: string;
    creator: string;
};
/**
 * Main entry point for the GPX document
 * @template attrK: the type of the tag key used by xml2js
 * @template ExtT: Any additional extensions that are used in the document
 */
export declare type GPXv1_1Document<attrK extends string = '$', ExtT = any> = {
    gpx: GPX<attrK, ExtT>;
};
export {};
