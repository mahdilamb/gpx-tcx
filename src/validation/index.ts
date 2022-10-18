import type { schema } from '..';
import * as tcxv2 from './tcxv2';
import * as tcxv1 from './tcxv1';
import * as gpxv1_1 from './gpxv1_1';

type parseFunction<T, R = T, S extends R | void = R> = (value: T) => S;
type castFunction = parseFunction<string | number, any> | parseFunction<number, any> | parseFunction<string, any>;
type validateFunction =
  | parseFunction<string | number, any, void>
  | parseFunction<string, any, void>
  | parseFunction<number, any, void>;
export type castFunctions = { [path: string]: castFunction | { [tag: string]: castFunction } };
export type validateFunctions = { [path: string]: validateFunction | { [tag: string]: validateFunction } };

const validateAndCast: Record<schema, [validateFunctions, castFunctions]> = {
  'GPXv1.1': [gpxv1_1.validation, gpxv1_1.casting],
  TCXv1: [tcxv1.validation, tcxv2.casting],
  TCXv2: [tcxv2.validation, tcxv2.casting],
};

export const createValidator = (documentSchema: schema, validate: boolean = true) => {
  const [validateFunctions, castFunctions] = validateAndCast[documentSchema];
  const castFn = (xpath: string, currentValue: any, newValue: any) => {
    const cast: castFunction | { [tag: string]: castFunction } = castFunctions[xpath];
    if (cast) {
      if (typeof cast === 'function') {
        // @ts-ignore
        newValue = cast(newValue);
      } else {
        Object.entries<castFunction>(cast).forEach(([tag, castFunction]) => {
          // @ts-ignore
          newValue.$[tag] = castFunction(newValue.$[tag]);
        });
      }
    }
    return newValue;
  };
  if (validate) {
    return (xpath: string, currentValue: any, newValue: any) => {
      const validation: validateFunction | { [tag: string]: validateFunction } = validateFunctions[xpath];
      if (validation) {
        if (typeof validation === 'function') {
          // @ts-ignore
          validation(newValue);
        } else {
          Object.entries<validateFunction>(validation).forEach(([tag, validateFunction]) => {
            // @ts-ignore
            validateFunction(newValue.$[tag]);
          });
        }
      }
      return castFn(xpath, currentValue, newValue);
    };
  } else {
    return castFn;
  }
};

export default createValidator;
