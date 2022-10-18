"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGPXv1_1 = exports.parseTCXv1 = exports.parseTCXv2 = void 0;
const xml2js_1 = require("xml2js");
const validation_1 = require("./validation");
const parse = (text, docSchema, validate = true) => {
    let xml;
    const options = { validator: (0, validation_1.createValidator)(docSchema, validate) };
    (0, xml2js_1.parseString)(text, options, (e, r) => {
        xml = r;
        if (e) {
            throw e;
        }
    });
    // @ts-ignore. parseString is actually synchronous
    return xml;
};
const parseTCXv2 = (text, validate = true) => {
    return parse(text, 'TCXv2', validate);
};
exports.parseTCXv2 = parseTCXv2;
const parseTCXv1 = (text, validate = true) => {
    return parse(text, 'TCXv1', validate);
};
exports.parseTCXv1 = parseTCXv1;
const parseGPXv1_1 = (text, validate = true) => {
    return parse(text, 'GPXv1.1', validate);
};
exports.parseGPXv1_1 = parseGPXv1_1;
