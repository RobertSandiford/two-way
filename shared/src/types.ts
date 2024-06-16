

// import type { AlphaDigitUnderscore, Expand, JsonValue } from 'sxy-types'
// import { dynamicProcedureString } from './WebSocketBase.js'
// //import { IWebSocket } from './IWebSocket.js'
// import { TwoWayError } from './TwoWayError.js'

// // export type DynamicProcedureReference<S extends string = string>
// //     = `${typeof dynamicProcedureString}${S}` & { type: 'DynamicProcedureReference' }


// export type DynamicProcedureReference<
//     S extends string = string,
//     F extends TwoWayFunctionBasicConstraint = TwoWayFunctionBasicConstraint
// >
//     = `${typeof dynamicProcedureString}${S}` & {
//         type: 'DynamicProcedureReference'
//         function: F
//     }

// export type DynamicProcedureName = `${AlphaDigitUnderscore}${string}`

// export type DynamicProcedure<F extends TwoWayFunctionBasicConstraint = TwoWayFunctionBasicConstraint> = {
//     id: number,
//     ref: DynamicProcedureReference,
//     name: DynamicProcedureName | null,
//     func: F
// }

// export type DynamicProcedureOut<F extends TwoWayFunctionBasicConstraint = TwoWayFunctionBasicConstraint>
//     = F

// export type TwoWayData = string | number | boolean | null | {
//     [key: string]: TwoWayData;
// } | TwoWayData[];



// // sometimes a function will not need to return anything, but we still want the return message to be sent to confirm that the
// // function ran. This return type is a type that does not fit in JsonValue for for those functions

// // could rethink how we handle undefined, undefined props can be sent to JSON.stringify, they just get scrubbed
// export type VoidResult = void

// export type CallResult = JsonValue | VoidResult

// // Function Controls
// export type TwoWayFunctionBasicConstraint = (this: IWebSocket, ...args: never[]) => unknown
// export type ValidTwoWayFunction<T extends TwoWayFunctionBasicConstraint> = Parameters<T> extends JsonValue[]
//     ? T
//     : never

// export type TwoWayFunctionWithArgs<Args extends JsonValue[]> = (...args: Args) => JsonValue | VoidResult




// // Based on work by Akash Joshi, rocketrpc
// export type TwoWayCaller<F extends TwoWayFunctionsLowConstraint> = {
//     // For each key in the input type `T`, `K`, determine the type of the corresponding value
//     // is removing optional flag from Akash Joshi's code appropriate?
//     [K in keyof F]: F[K] extends (...args: infer Args) => infer R
//         ? // The value is a function,
//             (...args: Args) => Promise<Error | Awaited<R>>
//             /*
//             R extends Promise<CrosstalkData>
//                 ? // If the return type of the function is already a Promise, leave it as-is

//                     //F[K]

//                     // Convert the output to handle dynamic procs
//                     (...args: Args) => R

//                 : // Otherwise, convert the function to return a Promise
//                   //(...args: Parameters<F[K]>) => Promise<ReturnType<F[K]>>
//                     //PromisifyFunction<F[K]>
//                     //(...args: Args) => Promise<R>

//                     // Convert the output to handle dynamic procs
//                     R extends CrosstalkData | void
//                         ? (...args: Args) => Promise<R>
//                         : 'Function R type should extend CrosstalkData | void'
//             */

//         : // The value is an object
//           // recursively convert it to a PromisifiedRecord
//             F[K] extends TwoWayFunctionsLowConstraint
//                 ? TwoWayCaller<F[K]>
//                 : never
// }




// // export type CrosstalkLooseCaller<F extends CrosstalkFunctionsBasicConstraint>
// //     = CrosstalkLooseCallerInner<CrosstalkFunctionsOut<F>>


// // not using this because it hides the true type when hovering
// //type PromisifyFunction<F extends JsonableFunctionBasicConstraint> = (...args: Parameters<F>) => Promise<ReturnType<F>>

// // CrosstalkLooseCallerInner and CrosstalkFunctionsOut could be combined into one

// export type TwoWayLooseCaller<F extends TwoWayFunctionsLowConstraint> = {
//     // For each key in the input type `T`, `K`, determine the type of the corresponding value
//     [K in keyof F]/*-?*/: F[K] extends (...args: infer Args) => unknown
//         ? // The value is a function,
//           // set the return type to void
//             (...args: Args) => void
//         : // The value is an object
//           // recursively convert it to a PromisifiedRecord
//             F[K] extends TwoWayFunctionsLowConstraint
//                 ? TwoWayLooseCaller<F[K]>
//                 : never
// }

// // be flexible with our constraint so that we can show nice messages
// export type TwoWayFunctionsEntry = TwoWayFunctionBasicConstraint | TwoWayFunctionsLowConstraint
// export type TwoWayFunctionsLowConstraint = {
//     [key: string]: TwoWayFunctionsEntry
// }

// export type ValidTwoWayFunctions<Fs extends TwoWayFunctionsLowConstraint> = {
//     [K in keyof Fs]: Fs[K] extends TwoWayFunctionBasicConstraint
//         // Fs[K] is a procedure/function
//         ? Parameters<Fs[K]> extends JsonValue[]
//             // has valid params
//             ? JsonableReturn<ReturnType<Fs[K]>, Fs[K]>
//             // ? ReturnType<Fs[K]> extends Promise<infer R>
//             //     ? JsonableReturn<R, Fs[K]>
//             //     : JsonableReturn<ReturnType<Fs[K]>, PromisifyFunction<Fs[K]>>
//             : 'Function may only accept JSONable arguments'
//         : Fs[K] extends TwoWayFunctionsLowConstraint // Fs[K] is an object probably containing procedures/functions or more objects
//                                                  // This extends check is a given, it is just here to help TS narrow the type
//                                                  // as it seems not to narrow the type in the else case
//             ? ValidTwoWayFunctions<Fs[K]> // Fs[K] is an object probably containing procedures/functions or more objects
//             : never
// }
// type JsonableReturn<R, F> = R extends (JsonValue | VoidResult)
//     ? R extends never
//         ? 'Function may only return JSONable values'
//         : F
//     : 'Function may only return JSONable values'

// // export type MootJsonableFunctionObject<Fs extends JsonableFunctionsBasicConstraint> = {
// //     [K in keyof Fs]: Fs[K] extends JsonableFunctionBasicConstraint
// //         ? Parameters<Fs[K]> extends JsonValue[]
// //             ? ReturnType<Fs[K]> extends (undefined | void)
// //                 ? Fs[K]
// //                 : 'Function must return undefined or void, or not return'
// //             : 'Function may only accept JSONable arguments'
// //         : Fs[K] extends JsonableFunctionsBasicConstraint // Fs[K] is an object probably containing procedures/functions or more objects
// //                                                          // This extends check is a given, it is just here to help TS narrow the type
// //                                                          // as it seems not to narrow the type in the else case
// //             ? MootJsonableFunctionObject<Fs[K]>
// //             : never
// // }

// export type ResolveReject = {
//     resolve: (value: CallResult | PromiseLike<CallResult>) => void,
//     reject: (reason?: unknown) => void
// }

// export type CallMessage = {
//     type: 'call'
//     path: string
//     args: JsonValue[]
//     callId: number
//     time: number
// }
// export type ReturnMessage = {
//     type: 'return'
//     path: string // testing/debugging only
//     args: JsonValue[] // testing/debugging only
//     callTime: number // testing/debugging only
//     callId: number
//     time: number
// } & ({
//     void: true
// } | {
//     void: false
//     result: CallResult
// })
// export type CallDynamicMessage = {
//     type: 'call-dynamic'
//     dynProcId: number,
//     args: JsonValue[]
//     callId: number
//     time: number
// }
// export type ReturnDynamicMessage = {
//     type: 'return-dynamic'
//     path: string // testing/debugging only
//     args: JsonValue[] // testing/debugging only
//     callTime: number // testing/debugging only
//     callId: number
//     time: number
// } & ({
//     void: true
// } | {
//     void: false
//     result: CallResult
// })
// export type TwoWayMessage = CallMessage | ReturnMessage// | CallDynamicMessage | ReturnDynamicMessage