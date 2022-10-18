"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const tcxv2 = __importStar(require("./tcxv2"));
const tcxv1 = __importStar(require("./tcxv1"));
const gpxv1_1 = __importStar(require("./gpxv1_1"));
const validateAndCast = {
    'GPXv1.1': [gpxv1_1.validation, gpxv1_1.casting],
    TCXv1: [tcxv1.validation, tcxv2.casting],
    TCXv2: [tcxv2.validation, tcxv2.casting],
};
const createValidator = (documentSchema, validate = true) => {
    const [validateFunctions, castFunctions] = validateAndCast[documentSchema];
    const castFn = (xpath, currentValue, newValue) => {
        const cast = castFunctions[xpath];
        if (cast) {
            if (typeof cast === 'function') {
                // @ts-ignore
                newValue = cast(newValue);
            }
            else {
                Object.entries(cast).forEach(([tag, castFunction]) => {
                    // @ts-ignore
                    newValue.$[tag] = castFunction(newValue.$[tag]);
                });
            }
        }
        return newValue;
    };
    if (validate) {
        return (xpath, currentValue, newValue) => {
            const validation = validateFunctions[xpath];
            if (validation) {
                if (typeof validation === 'function') {
                    // @ts-ignore
                    validation(newValue);
                }
                else {
                    Object.entries(validation).forEach(([tag, validateFunction]) => {
                        // @ts-ignore
                        validateFunction(newValue.$[tag]);
                    });
                }
            }
            return castFn(xpath, currentValue, newValue);
        };
    }
    else {
        return castFn;
    }
};
exports.createValidator = createValidator;
exports.default = exports.createValidator;
