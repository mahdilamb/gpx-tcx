/**
 * {@link https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd}
 */

import * as v1 from "./tcxv1";

type positiveByte = number

type Gender = "Male" | "Female"
type CoursePointType = v1.CoursePointType | "Hors Category"
type unsignedInt = number
type CadenceValue = v1.unsignedByte //[,254]
type CourseLap<ExtT = any> = Omit<v1.CourseLap<ExtT>, "AverageHeartRateBpm" | "MaximumHeartRateBpm" | "Cadence"> & {
    AverageHeartRateBpm?: v1.HeartRateInBeatsPerMinute
    MaximumHeartRateBpm?: v1.HeartRateInBeatsPerMinute
    Cadence: CadenceValue
}

type Course<ExtT = any> = Omit<v1.Course<ExtT>, "Course"> & {
    Creator?: AbstractSource[]
}

type CourseFolder<ExtT = any> = v1.CourseFolder<ExtT> & {
    CourseNameRef?: NameKeyReference[]
}
type Distance = v1.Duration & {
    Meters: v1.unsignedShort[]
}
type NameKeyReference = {
    Id: v1.RestrictedToken[]
}
type ActivityReference = {
    Id: v1.DateTime
}
type Workout<ExtT = any> = v1.Workout<ExtT> & {
    Creator?: AbstractSource
}
type WorkoutFolder<ExtT = any> = Omit<v1.WorkoutFolder<ExtT>, "WorkoutFolder" | "Workout"> & {
    Folder?: WorkoutFolder[]
    WorkoutNameRef?: NameKeyReference[]

}
type Trackpoint<ExtT = any> = Omit<v1.Trackpoint<ExtT>, "Cadence"> & {
    Cadence: CadenceValue

}
type AbstractSource = {
    Name: Token
}

type ActivityLap<attrK extends string, ExtT> = Omit<v1.ActivityLap<attrK, ExtT>, "Calories" | "AverageHeartRateBpm" | "MaximumHeartRateBpm" | "Cadence"> & {
    Calories: v1.unsignedShort
    AverageHeartRateBpm?: v1.HeartRateInBeatsPerMinute
    MaximumHeartRateBpm?: v1.HeartRateInBeatsPerMinute
    Cadence: CadenceValue
}
type Device = AbstractSource & {
    UnitId: unsignedInt[]
    ProductID: v1.unsignedShort[]
    Version: Version[]
}
type Application = AbstractSource & {
    Build: Build[]
    LangID: LangID[]
    PartNumber: PartNumber[]
}
type PartNumber = Token//[\p{Lu}\d]{3}-[\p{Lu}\d]{5}-[\p{Lu}\d]{2}

type LangID = Token //[2]
type Token = string // no spaces
type Build = {
    Version: Version
    Type: BuildType
    Time: Token
    Builder: Token
}
type BuildType = "Internal" | "Alpha" | "Beta" | "Release"
type Version = {
    VersionMajor: v1.unsignedShort
    VersionMinor: v1.unsignedShort
    BuildMajor?: v1.unsignedShort
    BuildMinor?: v1.unsignedShort
}
type NextSport<attrK extends string, ExtT> = Omit<v1.NextSport<attrK, ExtT>, "Run">
type FirstSport<attrK extends string, ExtT> = {
    Activity: Activity<attrK, ExtT>[]
}
type Activity<attrK extends string, ExtT> = {
    Id: v1.DateTime[]
    Lap: ActivityLap<attrK, ExtT>[]
    Notes?: string
    Training?: v1.Training
    Creator?: AbstractSource

    Extensions?: ExtT
} & { [tag in attrK]: { Sport: v1.Sport } }
type MultiSessionSport<attrK extends string, ExtT> = {
    Id: v1.DateTime
    FirstSport?: FirstSport<attrK, ExtT>
    NextSport?: NextSport<attrK, ExtT>[]
    Notes?: string

}
type MultiSportFolder<attrK, ExtT> = {
    Name: string
    MultisportActivityRef?: ActivityReference[]
    Folder?: MultiSportFolder<attrK, ExtT>[]
    Week?: v1.Week[]
    Notes?: string
    Extensions?: ExtT
}
type HistoryFolder<attrK, ExtT> = {
    Name: string
    Folder?: HistoryFolder<attrK, ExtT>
    ActivityRef?: ActivityReference[]
    Week?: v1.Week
    Notes?: string
    Extensions?: ExtT
}
type History<attrK, ExtT> = {
    Running?: HistoryFolder<attrK, ExtT>[]
    Biking?: HistoryFolder<attrK, ExtT>[]
    Other?: HistoryFolder<attrK, ExtT>[]
    MultiSport?: MultiSportFolder<attrK, ExtT>[]
    Extensions?: ExtT

}
type CourseList<attrK, ExtT> = {
    Course: Course<ExtT>
}[]
type WorkoutList<attrK, ExtT> = {
    Workout?: Workout[]

}[]
type ActivityList<attrK extends string, ExtT> = {
    Activity?: Activity<attrK, ExtT>[]
    MultiSportSession?: MultiSessionSport<attrK, ExtT>[]
}[]
type Folders<attrK, ExtT> = {
    History?: History<attrK, ExtT>[]
    Workouts?: v1.Workouts[]
    Courses: v1.Courses[]
}
type TrainingCenterDatabase<attrK extends string, ExtT> = {

    Folders?: Folders<attrK, ExtT>[]
    Activities?: ActivityList<attrK, ExtT>
    Workouts?: WorkoutList<ExtT, attrK>
    Courses?: CourseList<ExtT, attrK>
    Author?: AbstractSource
    Extensions?: ExtT
}

export type TCXDocumentV2<attrK extends string = "$", ExtT = any> = {
    TrainingCenterDatabase: TrainingCenterDatabase<attrK, ExtT>
}
