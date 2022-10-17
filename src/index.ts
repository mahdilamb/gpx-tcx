import { parseString } from "xml2js"
import type { TCXDocumentV1 } from "./schema/tcxv1";
import type { TCXDocumentV2 } from "./schema/tcxv2";
import type { GPXv1_1Document } from "./schema/gpxv1_1";
import { createValidator } from "./validation";
export type schema = "GPXv1.1" | "TCXv1" | "TCXv2"

const parse = <T extends object, ExtT = any>(text: string, schema: schema, validate: boolean = true): T => {
    var xml: TCXDocumentV2<"$", ExtT>;
    const options = { validator: createValidator(schema, validate) }
    parseString(text, options, (e, r) => {
        xml = r
        if (e) {
            throw e
        }
    });
    return xml as T
}

export const parseTCXv2 = <ExtT = any>(text: string, validate: boolean = true): TCXDocumentV2<"$", ExtT> => {
    return parse<TCXDocumentV2<"$", ExtT>, ExtT>(text, "TCXv2", validate)
}

export const parseTCXv1 = <ExtT = any>(text: string, validate: boolean = true): TCXDocumentV1<"$", ExtT> => {
    return parse<TCXDocumentV1<"$", ExtT>, ExtT>(text, "TCXv1", validate)
}
export const parseGPXv1_1 = <ExtT = any>(text: string, validate: boolean = true): GPXv1_1Document<"$", ExtT> => {
    return parse<GPXv1_1Document<"$", ExtT>, ExtT>(text, "GPXv1.1", validate)
}
