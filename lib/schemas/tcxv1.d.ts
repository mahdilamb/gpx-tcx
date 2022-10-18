/**
 * Schema for TCXv1. Adapted from {@link https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev1.xsd}
 */
import { Intensity, Sport, TriggerMethod } from './enums';
declare type double = number;
export declare type unsignedShort = number;
export declare type unsignedByte = number;
declare type positiveInteger = number;
export declare type DateTime = Date;
declare type DegreesLongitude = double;
declare type DegreesLatitude = double;
declare type SensorState = 'Present' | 'Absent';
export declare type RestrictedToken = string;
declare type StepId = positiveInteger;
declare type CoursePointName = string;
export declare type CoursePointType = 'Generic' | 'Summit' | 'Valley' | 'Water' | 'Food' | 'Danger' | 'Left' | 'Right' | 'Straight' | 'First Aid' | '4th Category' | '3rd Category' | '2nd Category' | '1st Category' | 'Sprint';
declare type CoursePoint<ExtT = any> = {
    Name: CoursePointName;
    Time: DateTime;
    Position: Position;
    AltitudeMeters?: double;
    PointType: CoursePointType;
    Notes?: string;
    Extensions?: ExtT;
};
export declare type CourseLap<ExtT = any> = {
    TotalTimeSeconds: double;
    DistanceMeters: double;
    BeginPosition?: Position;
    BeginAltitudeMeters?: double;
    EndPosition?: Position;
    EndAltitudeMeters?: double;
    AverageHeartRateBpm?: unsignedByte;
    MaximumHeartRateBpm?: unsignedByte;
    Intensity: Intensity;
    Cadence?: unsignedByte;
    Extensions?: ExtT;
};
export declare type Course<ExtT = any> = {
    Name: RestrictedToken[];
    Lap?: CourseLap<ExtT>[];
    Track?: Track[];
    Notes?: string;
    CoursePoint?: CoursePoint[];
    Extensions?: ExtT;
};
export declare type CourseFolder<ExtT = any> = {
    Name: string;
    Folder?: CourseFolder<ExtT>[];
    Course?: Course<ExtT>[];
    Notes?: string;
    Extensions: ExtT;
};
export declare type Courses<ExtT = any> = {
    CourseFolder: CourseFolder<ExtT>[];
    Extensions?: ExtT;
};
export declare type HeartRateInBeatsPerMinute = HeartRateValue & {
    Value: unsignedByte[];
};
declare type AbstractStep = {
    StepId: StepId;
}[];
export declare type Duration = {};
declare type HeartRateValue = {};
export declare type Workout<ExtT = any> = {
    Name: RestrictedToken;
    Step: AbstractStep[];
    ScheduledOn?: Date[];
    Notes?: string;
    Extensions?: ExtT;
};
export declare type WorkoutFolder<ExtT = any> = {
    Name: string;
    Folder?: WorkoutFolder<ExtT>[];
    Workout?: Workout<ExtT>[];
    Extensions?: ExtT;
}[];
export declare type Workouts<ExtT = any> = {
    Running?: WorkoutFolder<ExtT>[];
    Biking?: WorkoutFolder<ExtT>[];
    Other?: WorkoutFolder<ExtT>[];
    Extensions?: ExtT;
}[];
declare type Position = {
    LatitudeDegrees: DegreesLatitude;
    LongitudeDegrees: DegreesLongitude;
}[];
export declare type Trackpoint<ExtT = any> = {
    Time: DateTime;
    Position?: Position;
    AltitudeMeters?: double;
    DistanceMeters?: double;
    HeartRateBpm?: unsignedByte;
    Cadence?: unsignedByte;
    SensorState?: SensorState;
    Extensions?: ExtT;
}[];
declare type Track<ExtT = any> = {
    Trackpoint: Trackpoint<ExtT>;
};
export declare type ActivityLap<attrK extends string, ExtT = any> = {
    TotalTimeSeconds: double;
    DistanceMeters: double;
    MaximumSpeed?: unsignedShort;
    Calories: double;
    AverageHeartRateBpm?: unsignedByte;
    MaximumHeartRateBpm?: unsignedByte;
    Intensity: Intensity;
    Cadence: unsignedByte;
    TriggerMethod?: TriggerMethod;
    Track?: Track<ExtT>[];
    Notes?: string;
    Extensions?: ExtT;
} & {
    [tag in attrK]: {
        StartTime: DateTime;
    };
};
declare type TrainingType = 'Workout' | 'Course';
declare type Plan<ExtT = any> = {
    Name?: RestrictedToken;
    Extensions: ExtT;
    Type: TrainingType;
    IntervalWorkout: boolean;
};
declare type QuickWorkout = {
    TotalTimeSeconds: double;
    DistanceMeters: double;
};
export declare type Training<ExtT = any> = {
    QuickWorkoutResults?: QuickWorkout;
    Plan: Plan<ExtT>;
    VirtualPartner: boolean;
};
declare type Run<attrK extends string, ExtT = any> = {
    Lap?: ActivityLap<attrK, ExtT>[];
    Notes?: string;
    Training?: Training<ExtT>[];
    Extensions?: ExtT;
};
/**
 * Each sport contains an optional transition and a run.
 */
export declare type NextSport<attrK extends string, ExtT = any> = {
    Transition?: ActivityLap<attrK, ExtT>;
    Run?: Run<attrK, ExtT>;
    Sport: Sport;
};
/**
 * The week is written out only if the notes are present.
 */
export declare type Week = {
    StartDate: Date[];
    Notes?: string;
};
declare type MultiSportFolder<ExtT = any> = {
    Name: string;
    Folder?: MultiSportFolder[];
    Week?: Week[];
    Notes?: string;
    Extensions?: ExtT;
};
/**
 * Interface for a History folder. Note that name must be unique in the document
 */
declare type HistoryFolder<attrK extends string, ExtT = any> = {
    Name: string;
    Folder?: HistoryFolder<attrK, ExtT>;
    Run?: Run<attrK, ExtT>;
    Week?: Week;
    Notes?: string;
    Extensions?: ExtT;
};
declare type History<attrK extends string, ExtT = any> = {
    Running?: HistoryFolder<attrK, ExtT>[];
    Biking?: HistoryFolder<attrK, ExtT>[];
    Other?: HistoryFolder<attrK, ExtT>[];
    MultiSport?: MultiSportFolder[];
    Extensions?: ExtT;
};
declare type TrainingCenterDatabase<attrK extends string, ExtT = any> = {
    History?: History<attrK, ExtT>;
    Workouts?: Workouts<ExtT>;
    Courses?: Courses;
    Extensions?: ExtT;
};
export declare type TCXv1Document<attrK extends string = '$', ExtT = any> = {
    TrainingCenterDatabase: TrainingCenterDatabase<attrK, ExtT>;
};
export {};
