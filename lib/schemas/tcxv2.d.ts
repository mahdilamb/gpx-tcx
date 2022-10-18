/**
 * {@link https://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd}
 */
import { Sport } from './enums';
import * as v1 from './tcxv1';
declare type CadenceValue = v1.unsignedByte;
declare type Course<ExtT = any> = Omit<v1.Course<ExtT>, 'Course'> & {
    Creator?: AbstractSource[];
};
declare type ActivityReference = {
    Id: v1.DateTime;
};
declare type Workout<ExtT = any> = v1.Workout<ExtT> & {
    Creator?: AbstractSource;
};
declare type AbstractSource = {
    Name: Token;
};
declare type ActivityLap<attrK extends string, ExtT> = Omit<v1.ActivityLap<attrK, ExtT>, 'Calories' | 'AverageHeartRateBpm' | 'MaximumHeartRateBpm' | 'Cadence'> & {
    Calories: v1.unsignedShort;
    AverageHeartRateBpm?: v1.HeartRateInBeatsPerMinute;
    MaximumHeartRateBpm?: v1.HeartRateInBeatsPerMinute;
    Cadence: CadenceValue;
};
declare type Token = string;
declare type NextSport<attrK extends string, ExtT> = Omit<v1.NextSport<attrK, ExtT>, 'Run'>;
declare type FirstSport<attrK extends string, ExtT> = {
    Activity: Activity<attrK, ExtT>[];
};
declare type Activity<attrK extends string, ExtT> = {
    Id: v1.DateTime[];
    Lap: ActivityLap<attrK, ExtT>[];
    Notes?: string;
    Training?: v1.Training;
    Creator?: AbstractSource;
    Extensions?: ExtT;
} & {
    [tag in attrK]: {
        Sport: Sport;
    };
};
declare type MultiSessionSport<attrK extends string, ExtT> = {
    Id: v1.DateTime;
    FirstSport?: FirstSport<attrK, ExtT>;
    NextSport?: NextSport<attrK, ExtT>[];
    Notes?: string;
};
declare type MultiSportFolder<attrK, ExtT> = {
    Name: string;
    MultisportActivityRef?: ActivityReference[];
    Folder?: MultiSportFolder<attrK, ExtT>[];
    Week?: v1.Week[];
    Notes?: string;
    Extensions?: ExtT;
};
declare type HistoryFolder<attrK, ExtT> = {
    Name: string;
    Folder?: HistoryFolder<attrK, ExtT>;
    ActivityRef?: ActivityReference[];
    Week?: v1.Week;
    Notes?: string;
    Extensions?: ExtT;
};
declare type History<attrK, ExtT> = {
    Running?: HistoryFolder<attrK, ExtT>[];
    Biking?: HistoryFolder<attrK, ExtT>[];
    Other?: HistoryFolder<attrK, ExtT>[];
    MultiSport?: MultiSportFolder<attrK, ExtT>[];
    Extensions?: ExtT;
};
declare type CourseList<attrK, ExtT> = {
    Course: Course<ExtT>;
}[];
declare type WorkoutList<attrK, ExtT> = {
    Workout?: Workout[];
}[];
declare type ActivityList<attrK extends string, ExtT> = {
    Activity?: Activity<attrK, ExtT>[];
    MultiSportSession?: MultiSessionSport<attrK, ExtT>[];
}[];
declare type Folders<attrK, ExtT> = {
    History?: History<attrK, ExtT>[];
    Workouts?: v1.Workouts[];
    Courses: v1.Courses[];
};
declare type TrainingCenterDatabase<attrK extends string, ExtT> = {
    Folders?: Folders<attrK, ExtT>[];
    Activities?: ActivityList<attrK, ExtT>;
    Workouts?: WorkoutList<ExtT, attrK>;
    Courses?: CourseList<ExtT, attrK>;
    Author?: AbstractSource;
    Extensions?: ExtT;
};
export declare type TCXv2Document<attrK extends string = '$', ExtT = any> = {
    TrainingCenterDatabase: TrainingCenterDatabase<attrK, ExtT>;
};
export {};
