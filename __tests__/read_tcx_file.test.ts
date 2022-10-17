

import { readFile } from "./common"
import { parseTCXv2 } from "../src/index"
describe("Test TCX file parsing", () => {
    const tcxFile = readFile("__tests__/test-data/example.tcx")
    const tcx = parseTCXv2(tcxFile)

    test("Test that TCX files can be parsed in a type-safe manner", () => {
        expect(tcx.TrainingCenterDatabase.Activities?.at(0)?.Activity?.at(0)?.$.Sport).toBe("Biking")
    })
    test("Test that valid files do not throw exceptions", () => {
        expect(() => parseTCXv2(tcxFile)).not.toThrow()
    })
    test("Test that invalid files do throw exceptions", () => {
        expect(() => parseTCXv2(tcxFile.replace("Biking", "Cycling"))).toThrow()
    })
})
