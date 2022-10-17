/**
 * Type definition for GPXv1.1 files. Schema based on {@link: https://www.topografix.com/GPX/1/1/gpx.xsd}
 * 
 */
type integer = number
type decimal = number
type DateTime = Date
type double = number
type anyUri = string
type nonNegativeInteger = number
type longitude = double //[-180,180]
type latitude = double //[-90,90]
type degrees = double //[0,360]
type fix = "none" | "2d" | "3d" | "dgps" | "pps"
type dgpsStation = integer// [0,1023]
type gYear = string | number //a year
type Bounds = {
    minlat: latitude
    minlon: longitude
    maxlat: latitude
    maxlon: longitude
}

type PointSegment = {
    pt?: Point[]
}

type Point = {
    ele: decimal
    time: DateTime
    lat: latitude
    lon: longitude

}

type Person = {
    name?: string
    email?: string
    link?: Link
}
type Email = {
    id: string
    domain: string

}
type Link = {
    text?: string
    type?: string
    href: anyUri

}
type Copyright = {
    year?: gYear
    license?: anyUri
    author: string

}
type TrackSegment<ExtT = any> = {
    trkpt?: Waypoint[]
    extensions?: ExtT

}
type Track<ExtT = any> = {
    name?: string[]
    cmt?: string
    desc?: string
    src?: string
    link?: Link[]
    number?: nonNegativeInteger
    type?: string
    extensions?: ExtT[]
    trkseg?: TrackSegment<ExtT>[]

}
type Route<ExtT = any> = {
    name?: string
    cmt?: string
    desc?: string
    src?: string
    link?: Link[]
    number?: nonNegativeInteger
    type?: string
    extensions?: ExtT[]
    rtept?: Waypoint[]

}
type Waypoint<ExtT = any> = {
    ele: decimal[]
    time: DateTime[]
    magvar: degrees
    geoidheight: decimal
    name?: string
    cmt?: string
    desc?: string
    src?: string
    link?: Link[]
    sym?: string
    type?: string
    fix?: fix
    sat?: nonNegativeInteger
    hdop?: decimal
    vdop?: decimal
    pdop?: decimal
    ageodgpsdata?: decimal
    dgpsid?: dgpsStation
    extensions?: ExtT
    lat: latitude
    lon: longitude

}

type Metadata<ExtT = any> = {
    name?: string
    desc?: string
    author?: Person
    copyright?: Copyright
    link?: Link
    time?: string
    keywords?: string
    bounds?: Bounds
    extensions?: ExtT[]
}

type GPX<attrK extends string, ExtT = any> = {
    metadata: Metadata
    wpt?: Waypoint[]
    rte?: Route[]
    trk?: Track[]
    extensions?: ExtT[]
    version: string
    creator: string
}
/**
 * Main entry point for the GPX document
 * @template attrK: the type of the tag key used by xml2js
 * @template ExtT: Any additional extensions that are used in the document
 */
export type GPXv1_1Document<attrK extends string = "$", ExtT = any> = {
    gpx: GPX<attrK, ExtT>
}
