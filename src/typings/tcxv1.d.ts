import { Intensity, TriggerMethod } from "../enums"

/**
 * https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev1.xsd
 */
type double = number
type unsignedShort = number
type unsignedByte = number
type positiveInteger = number
type DateTime = Date
type DegreesLongitude = double //[-180,180]
type DegreesLatitude = double //[-90,90]
type SensorState = "Present" | "Absent"

type RestrictedToken = string //Token that is between 1 and 15 characters
type StepId = positiveInteger // [0,20]
type Repetitions = positiveInteger//[2,99]
type SpeedZoneNumbers = positiveInteger //[0,10]
type SpeedInMetersPerSecond = double // non-zero
type SpeedType = "Pace" | "Speed"
type HeartRateZoneNumbers = positiveInteger //[5,]
type PercentOfMax = unsignedByte //[0,100]
type CoursePointName = string //Token [1,10]
type CoursePointType = "Generic" | "Summit" | "Valley" | "Water" | "Food" | "Danger" | "Left" | "Right" | "Straight" | "First Aid" | "4th Category" | "3rd Category" | "2nd Category" | "1st Category" | "Sprint"
type PredefinedHeartRateZone = Zone & {
    Number: HeartRateZoneNumbers[]
}
type CoursePoint<ExtT = any> = {
    Name: CoursePointName
    Time: DateTime
    Position: Position
    AltitudeMeters?: double
    PointType: CoursePointType
    Notes?: string
    Extensions?: ExtT

}
type CourseLap<ExtT = any> = {
    TotalTimeSeconds: double
    DistanceMeters: double
    BeginPosition?: Position
    BeginAltitudeMeters?: double
    EndPosition?: Position
    EndAltitudeMeters?: double
    AverageHeartRateBpm?: unsignedByte
    MaximumHeartRateBpm?: unsignedByte
    Intensity: Intensity
    Cadence?: unsignedByte
    Extensions?: ExtT
}

type Course<ExtT = any> = {
    Name: RestrictedToken[]
    Lap?: CourseLap<ExtT>[]
    Track?: Track[]
    Notes?: string
    CoursePoint?: CoursePoint[]
    Extensions?: ExtT
}

type CourseFolder<ExtT = any> = {
    Name: string
    Folder?: CourseFolder<ExtT>[]
    Course?: Course<ExtT>[]
    Notes?: string
    Extensions: ExtT


}
type Courses<ExtT = any> = {
    CourseFolder: CourseFolder<ExtT>[]
    Extensions?: ExtT
}
type CustomHeartRateZone = Zone & {
    Low: HeartRateValue[]
    High: HeartRateValue[]
}
type HeartRateInBeatsPerMinute = HeartRateValue & {
    Value: unsignedByte[]
}
type HeartAteAsPercentOfMax = HeartRateValue & {
    Value: PercentOfMax[]
}

type AbstractStep = {
    StepId: StepId
}[]
type Duration = {

}
type CustomSpeedZone = Zone & {
    ViewAs: SpeedType[]
    LowInMetersPerSecond: SpeedInMetersPerSecond[]
    HighInMetersPerSecond: SpeedInMetersPerSecond[]
}
type Time = Duration & {
    Seconds: unsignedShort[]
}
type HeartRateAbove = Duration & {
    HeartRate: HeartRateValue[]

}
type HeartRateBelow = Duration & {
    HeartRate: HeartRateValue[]

}
type CaloriesBurned = Duration & {
    Calories: unsignedShort[]
}
type UserInitiated = Duration & {}
type Speed = Target & {
    SpeedZone: Zone[]
}
type HeartRate = Target & { HeartRateZone: Zone[] }
type Cadence = Target & {
    Low: double
    High: double
}
type None = Target & {}
type Zone = {}
type PredefinedSpeedZone = Zone & {
    Number: SpeedZoneNumbers[]
}

type HeartRateValue = {}


type Target = {}

type Repeat = AbstractStep & {
    Repetitions: Repetitions
    Child: AbstractStep[]
}
type Step = AbstractStep & {
    Name?: RestrictedToken
    Duration: Duration
    Intensity: Intensity
    Target: Target
}
type Workout<ExtT = any> = {
    Name: RestrictedToken
    Step: AbstractStep[]
    ScheduledOn?: Date[]
    Notes?: string
    Extensions?: ExtT
}
type WorkoutFolder<ExtT = any> = {
    Name: string
    Folder?: WorkoutFolder<ExtT>[]
    Workout?: Workout<ExtT>[]
    Extensions?: ExtT

}[]
type Workouts<ExtT = any> = {
    Running?: WorkoutFolder<ExtT>[]
    Biking?: WorkoutFolder<ExtT>[]
    Other?: WorkoutFolder<ExtT>[]
    Extensions?: ExtT
}[]


type Position = {
    LatitudeDegrees: DegreesLatitude
    LongitudeDegrees: DegreesLongitude
}[]

type Trackpoint<ExtT = any> = {
    Time: DateTime
    Position?: Position
    AltitudeMeters?: double
    DistanceMeters?: double
    HeartRateBpm?: unsignedByte
    Cadence?: unsignedByte
    SensorState?: SensorState
    Extensions?: ExtT
}[]
type Track<ExtT = any> = {
    Trackpoint: Trackpoint<ExtT>
}


type ActivityLap<attrK extends string, ExtT = any> = {
    TotalTimeSeconds: double
    DistanceMeters: double
    MaximumSpeed?: unsignedShort
    Calories: double
    AverageHeartRateBpm?: unsignedByte
    MaximumHeartRateBpm?: unsignedByte
    Intensity: Intensity
    Cadence: unsignedByte
    TriggerMethod?: TriggerMethod
    Track?: Track<ExtT>[]
    Notes?: string
    Extensions?: ExtT

} & { [tag in attrK]: { StartTime: DateTime } }

type TrainingType = "Workout" | "Course"
type Plan<ExtT = any> = {
    Name?: RestrictedToken
    Extensions: ExtT
    Type: TrainingType
    IntervalWorkout: boolean
}

type QuickWorkout = {
    TotalTimeSeconds: double
    DistanceMeters: double
}
type Training<ExtT = any> = {
    QuickWorkoutResults?: QuickWorkout
    Plan: Plan<ExtT>
    VirtualPartner: boolean
}
type Run<attrK extends string, ExtT = any> = {
    Lap?: ActivityLap<attrK, ExtT>[]
    Notes?: string
    Training?: Training<ExtT>[]
    Extensions?: ExtT
}
type Sport = "Running" | "Biking" | "Other"

/**
 * Each sport contains an optional transition and a run.
 */
type NextSport<attrK extends string, ExtT = any> = {
    Transition?: ActivityLap<attrK, ExtT>
    Run?: Run<attrK, ExtT>
    Sport: Sport
}
type FirstSport<attrK extends string, ExtT = any> = {
    Run?: Run<attrK, ExtT>
    Sport?: Sport
}
type MultiSessionSport<attrK extends string, ExtT = any> = {
    FirstSport?: FirstSport<attrK, ExtT>
    NextSport?: NextSport<attrK, ExtT>[]
    Notes?: string
}

/**
 * The week is written out only if the notes are present.
 */
type Week = {
    StartDate: Date[]
    Notes?: string
}


type MultiSportFolder<ExtT = any> = {
    Name: string
    Folder?: MultiSportFolder[]
    Week?: Week[]
    Notes?: string
    Extensions?: ExtT
}
/**
 * Interface for a History folder. Note that name must be unique in the document
 */
type HistoryFolder<attrK extends string, ExtT = any> = {
    Name: string
    Folder?: HistoryFolder<attrK, ExtT>
    Run?: Run<attrK, ExtT>
    Week?: Week
    Notes?: string
    Extensions?: ExtT
}

type History<attrK extends string, ExtT = any> = {
    Running?: HistoryFolder<attrK, ExtT>[]
    Biking?: HistoryFolder<attrK, ExtT>[]
    Other?: HistoryFolder<attrK, ExtT>[]
    MultiSport?: MultiSportFolder[]
    Extensions?: ExtT

}
type TrainingCenterDatabase<attrK extends string, ExtT = any> = {
    History?: History<attrK, ExtT>
    Workouts?: Workouts<ExtT>
    Courses?: Courses
    Extensions?: ExtT


}


export type TCXDocumentV1<attrK extends string = "$", ExtT = any> = {
    TrainingCenterDatabase: TrainingCenterDatabase<attrK, ExtT>
}

