import { JsonArray, JsonData, JsonObject } from "sxy-types"
import { ITwoWayWebSocket } from "./ITwoWayWebSocket.fullDynamicProcedures.js"
import { dynamicProcedureString } from "./WebSocketBase.fullDynamicProcedures.js"
import { convertOutgoingData } from "./convertOutgoingData.js"
import { getTime } from "./lib.js"
import {
    DynamicProcedure, DynamicProcedureReference, JsonDataIsDynamicProcedureReference, TwoWayData,
    CallResult, CallDynamicMessage, $dynamicProcedureRef, TwoWayFunctionLowConstraint,
    TwoWayDataObject
} from "./types.fullDynamicProcedures.js"
import type { DynamicCalls } from "./makeCaller.fullDynamicProcedures.js"


export function convertIncomingData(
    socket: ITwoWayWebSocket,
    dynamicCalls: DynamicCalls,
    data: JsonData | undefined
): TwoWayData | undefined {
    if (data === undefined) return undefined
    if (typeof data === 'object' && data !== null) {
        convertIncomingDataObject(socket, dynamicCalls, data)
    } else if (JsonDataIsDynamicProcedureReference(data)) {
        return referenceTo2WayFunction(socket, dynamicCalls, data)
    }
    return data
}

function convertIncomingDataObject(
    socket: ITwoWayWebSocket,
    dynamicCalls: DynamicCalls,
    data: JsonObject | JsonArray
): void {
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'object' && value !== null) {
            convertIncomingDataObject(socket, dynamicCalls, value)
        } else if (JsonDataIsDynamicProcedureReference(value)) {
            // eslint-disable-next-line no-type-assertion/no-type-assertion -- we're claiming this an object to satisfy TS and let us avoid handling arrays seperately
            (data as TwoWayDataObject)[key] = referenceTo2WayFunction(socket, dynamicCalls, value)
        }
    }
}


function referenceTo2WayFunction(
    socket: ITwoWayWebSocket,
    dynamicCalls: DynamicCalls,
    ref: DynamicProcedureReference
): DynamicProcedure {
    const dnyProcIdString = ref.substring(dynamicProcedureString.length)
    const dynProcId = Number(dnyProcIdString)
    if (!Number.isInteger(dynProcId))
        throw new Error(`_ReferenceTo2WayFunction() error: dynamic procedure ID is not an integer, received "${dnyProcIdString}"`) // eslint-disable-line max-len
    if (dynProcId < 1)
        throw new Error(`_ReferenceTo2WayFunction() error: dynamic procedure ID is smaller than 1, received "${dnyProcIdString}"`) // eslint-disable-line max-len

    //const dynProc = socket.dynamicProcedures[String(dynProcId)]

    // eslint-disable-next-line no-type-assertion/no-type-assertion -- typecast so we can add the ref again 
    const f = function dynamicProcedure(...args: TwoWayData[]): Promise<CallResult> {
        return new Promise<CallResult>( (resolve, reject) => {
            const callIndex = ++dynamicCalls.currentIndex
            dynamicCalls[callIndex] = {
                resolve,
                reject
            }
            const callMessage: CallDynamicMessage = {
                type: 'call-dynamic',
                dynProcId,
                args: convertOutgoingData(args),
                callId: callIndex,
                time: getTime()
            }
            const stringifiedMessage = JSON.stringify(callMessage)
            console.log('send call message', stringifiedMessage)
            socket.safeSend(stringifiedMessage)
        })
    } as TwoWayFunctionLowConstraint as DynamicProcedure
    f[$dynamicProcedureRef] = ref
    return f
}