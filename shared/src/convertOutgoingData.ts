import { JsonArray, JsonObject, JsonValue } from "sxy-types"
import {
    $dynamicProcedureRef, type DynamicProcedure, type TwoWayData
} from "./types.fullDynamicProcedures.js"

function TwoWayFunctionToReference(f: DynamicProcedure) {
    const ref = f[$dynamicProcedureRef]
    console.log('TwoWayFunctionToReference ref', ref)
    return ref
}

export function convertOutgoingDataObject(data: { [key: string]: TwoWayData }): JsonObject {
    const newObject: JsonObject = {}
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'function') {
            // casting data to the object shape, because TS complains about us operating on an array like an object,
            // even though it is safe
            //(data as ({ [key: string]: TwoWayData }))[key] = TwoWayFunctionToReference(value)
            newObject[key] = TwoWayFunctionToReference(value)
        } else if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value))  newObject[key] = convertOutgoingDataArray(value)
            else newObject[key] = convertOutgoingDataObject(value)
        } else {
            newObject[key] = value
        }
    }
    return newObject
}
export function convertOutgoingDataArray(data: TwoWayData[]): JsonArray {
    const newArray: JsonArray = []
    data.forEach( (value: TwoWayData, index: number) => {
        if (typeof value === 'function') {
            // casting data to the object shape, because TS complains about us operating on an array like an object,
            // even though it is safe
            //(data as ({ [key: string]: TwoWayData }))[key] = TwoWayFunctionToReference(value)
            newArray[index] = TwoWayFunctionToReference(value)
        } else if (typeof value === 'object' && value !== null) {
            //newObject[key] = convertOutgoingDataObject(value)
            if (Array.isArray(value)) newArray[index] = convertOutgoingDataArray(data)
            else newArray[index] = convertOutgoingDataObject(value)
        } else {
            newArray[index] = value
        }
    })
    return newArray
}

export function convertOutgoingData(data: TwoWayData[]): JsonValue[]
export function convertOutgoingData(data: TwoWayData | undefined): JsonValue | undefined
export function convertOutgoingData(data: TwoWayData | undefined): JsonValue | undefined {
    console.log('to convert', data)
    if (data === undefined) return undefined
    //data = structuredClone(data) // clone it so we don't meddle with any internal data structures
    if (typeof data === 'function') {
        return TwoWayFunctionToReference(data)
    } else if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) return convertOutgoingDataArray(data)
        else return convertOutgoingDataObject(data)
    } else {
        return data
    }
}