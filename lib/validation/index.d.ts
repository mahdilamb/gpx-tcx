import type { schema } from '..';
declare type parseFunction<T, R = T, S extends R | void = R> = (value: T) => S;
declare type castFunction = parseFunction<string | number, any> | parseFunction<number, any> | parseFunction<string, any>;
declare type validateFunction = parseFunction<string | number, any, void> | parseFunction<string, any, void> | parseFunction<number, any, void>;
export declare type castFunctions = {
    [path: string]: castFunction | {
        [tag: string]: castFunction;
    };
};
export declare type validateFunctions = {
    [path: string]: validateFunction | {
        [tag: string]: validateFunction;
    };
};
export declare const createValidator: (documentSchema: schema, validate?: boolean) => (xpath: string, currentValue: any, newValue: any) => any;
export default createValidator;
