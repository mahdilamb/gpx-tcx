import { parseString } from 'xml2js';
import type { TCXv1Document } from './schemas/tcxv1';
import type { TCXv2Document } from './schemas/tcxv2';
import type { GPXv1_1Document } from './schemas/gpxv1_1';
import { createValidator } from './validation';
export type schema = 'GPXv1.1' | 'TCXv1' | 'TCXv2';

const parse = <T extends object, ExtT = any>(text: string, docSchema: schema, validate: boolean = true): T => {
  let xml: T;
  const options = { validator: createValidator(docSchema, validate) };
  parseString(text, options, (e, r) => {
    xml = r as T;
    if (e) {
      throw e;
    }
  });
  // @ts-ignore. parseString is actually synchronous
  return xml;
};

export const parseTCXv2 = <ExtT = any>(text: string, validate: boolean = true): TCXv2Document<'$', ExtT> => {
  return parse<TCXv2Document<'$', ExtT>, ExtT>(text, 'TCXv2', validate);
};

export const parseTCXv1 = <ExtT = any>(text: string, validate: boolean = true): TCXv1Document<'$', ExtT> => {
  return parse<TCXv1Document<'$', ExtT>, ExtT>(text, 'TCXv1', validate);
};
export const parseGPXv1_1 = <ExtT = any>(text: string, validate: boolean = true): GPXv1_1Document<'$', ExtT> => {
  return parse<GPXv1_1Document<'$', ExtT>, ExtT>(text, 'GPXv1.1', validate);
};
