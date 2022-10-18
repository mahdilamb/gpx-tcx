import { parseString } from 'xml2js';
import { createValidator } from './validation';
const parse = (text, docSchema, validate = true) => {
    let xml;
    const options = { validator: createValidator(docSchema, validate) };
    parseString(text, options, (e, r) => {
        xml = r;
        if (e) {
            throw e;
        }
    });
    // @ts-ignore. parseString is actually synchronous
    return xml;
};
export const parseTCXv2 = (text, validate = true) => {
    return parse(text, 'TCXv2', validate);
};
export const parseTCXv1 = (text, validate = true) => {
    return parse(text, 'TCXv1', validate);
};
export const parseGPXv1_1 = (text, validate = true) => {
    return parse(text, 'GPXv1.1', validate);
};
