// import type { JsonValue, JsonPrimitive, JsonObject, JsonArray } from "sxy-types"
// import {
//     CallDynamicMessage, CrosstalkDataWithDynamicProceduresIn, CrosstalkDataWithDynamicProceduresOut, DynamicProcedure,
//     DynamicProcedureOut, DynamicProcedureReference, ResolveReject, VoidResult
// } from "./types.js"
// import { getTime } from "./lib.js"
// import { IWebSocket } from "./IWebSocket.js"
// import { dynamicProcedureString } from "./CrosstalkWebSocket.js"

// let dynamicCallIndex = 0
// const dynamicCalls: Record<number, ResolveReject> = {}


// export function hydrateDynamicProcedures(socket: IWebSocket, data: JsonValue): Error | CrosstalkDataWithDynamicProceduresOut {
//     //let out: CrosstalkDataOut
//     try {
//         if (typeof data === 'object' && data !== null) {
//             console.log('return A')
//             hydrateDynamicProceduresObject(data, socket)
//             return data
//         } else {
//             if (JsonPrimitiveIsDynamicProcedureReference(data)) {
//                 console.log('return B')
//                 hydrateDynamicProcedure(data, socket)
//                 return data
//             }
//         }
//     } catch (error) {
//         if ( ! (error instanceof Error) ) {
//             throw new Error(
//                 `hydrateDynamicProcedures() error: an error was thrown, and it was not an instance of Error.`
//                 + ` The error was (${typeof error}) ${error}`
//             )
//         }
//         return error
//     }
//     return data
// }
// //function hydrateDynamicProceduresOnObject

// function JsonPrimitiveIsDynamicProcedureReference(value: JsonPrimitive): value is DynamicProcedureReference {
//     return typeof value === 'string' && value.startsWith(dynamicProcedureString)
// }

// function hydrateDynamicProcedure(reference: DynamicProcedureReference, socket: IWebSocket): DynamicProcedureOut {
//     const dnyProcIdString = reference.substring(dynamicProcedureString.length)
//     // let dynProcId
//     // try {
//     //     dynProcId = BigInt(dnyProcIdString)
//     // } catch (error) {
//     //     if ( ! (error instanceof Error) ) {
//     //         throw new Error(
//     //             `hydrateDynamicProcedures() error: BigInt() threw an error, and it was not an instance of Error.`
//     //             + ` The BigInt were was (${typeof error}) ${error}`
//     //         )
//     //     }
//     //     return error
//     // }
//     // if (dynProcId <= 0n)
//     //     return new Error(
//     //         `hydrateDynamicProcedures() error: parsed dynamic procedure ID smaller or equal to 0.`
//     //         + ` Got "${dnyProcIdString}"`
//     //     )
//     // if (dnyProcIdString.length)
//     //     return new Error(`hydrateDynamicProcedures() error: missing dynamic procedure ID`)
//     const dynProcId = Number(dnyProcIdString)
//     // if (isNaN(dynProcId))
//     //     return new Error(`hydrateDynamicProcedures() error: dynamic procedure ID is not a number, it was ${dnyProcIdString}`) // eslint-disable-line max-len
//     if (!Number.isInteger(dynProcId))
//         throw new Error(`hydrateDynamicProcedures() error: dynamic procedure ID is not an integer, received "${dnyProcIdString}"`) // eslint-disable-line max-len
//     if (dynProcId < 1)
//         throw new Error(`hydrateDynamicProcedures() error: dynamic procedure ID is smaller than 1, received "${dnyProcIdString}"`) // eslint-disable-line max-len

//     const dynProc = socket.dynamicProcedures[String(dynProcId)]
//     return function dynamicProcedure(...args: CrosstalkDataWithDynamicProceduresIn[]): Promise<CrosstalkDataWithDynamicProceduresOut> {
//         return new Promise<JsonValue | VoidResult>( (resolve, reject) => {
//             const callIndex = ++dynamicCallIndex
//             dynamicCalls[callIndex] = {
//                 resolve,
//                 reject
//             }
//             const callMessage: CallDynamicMessage = {
//                 type: 'call-dynamic',
//                 dynProcId,
//                 args,
//                 callId: callIndex,
//                 time: getTime()
//             }
//             const stringifiedMessage = JSON.stringify(callMessage)
//             console.log('send call message', stringifiedMessage)
            
//             socket.safeSend(stringifiedMessage)
//         })
//     }
// }

// function hydrateDynamicProceduresObject(object: JsonObject | JsonArray, socket: IWebSocket): void {
//     for (const [key, value] of Object.entries(object)) {
//         if (typeof value === 'object' && value !== null) {
//             hydrateDynamicProceduresObject(value, socket)
//         } else {
//             if (JsonPrimitiveIsDynamicProcedureReference(value)) {
//                 // eslint-disable-next-line no-type-assertion/no-type-assertion -- Let us assign to the array
//                 (object as unknown as Record<string, DynamicProcedureOut>)[key]
//                     = hydrateDynamicProcedure(value, socket)
//             }
//         }
//     }
// }
