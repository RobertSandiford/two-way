
// export type CrosstalkDataWithDynamicProceduresIn = string | number | boolean | null | DynamicProcedureReference | {
//     [key: string]: CrosstalkDataWithDynamicProceduresIn;
// } | CrosstalkDataWithDynamicProceduresIn[];

// import { JsonValue } from "sxy-types"
// import { VoidResult } from "./types.js"

// export type CrosstalkDataWithDynamicProceduresOut = void | string | number | boolean | null | DynamicProcedureOut | {
//     [key: string]: CrosstalkDataWithDynamicProceduresOut;
// } | CrosstalkDataWithDynamicProceduresOut[];


// export type CrosstalkDataWithDynamicProceduresOutFromIn
// <In extends CrosstalkDataWithDynamicProceduresIn = CrosstalkDataWithDynamicProceduresIn> = {
//     [K in keyof In]: In[K] extends DynamicProcedureReference
//         ? CrosstalkFunctionOut<In[K]['function']>
//         : In[K]
// }


// type CrosstalkFunctionWithDynamicProceduresOut<F extends (...args: never[]) => unknown> =
//     F extends (...args: infer Args) => infer R
//         //? (...args: Args) => Promise<Expand<CrosstalkDataOutFromIn<Awaited<R>>>>
//         ? [R] extends [Promise<infer R>]
//             ? (...args: Args) => Promise<{
//                 [K in keyof R]: R[K] extends DynamicProcedureReference
//                 ? CrosstalkFunctionWithDynamicProceduresOut<R[K]['function']>
//                 : R[K]
//             }>
//             : [R] extends [CrosstalkDataWithDynamicProceduresIn]
//                 ? (...args: Args) => Promise<{
//                     [K in keyof R]: R[K] extends DynamicProcedureReference
//                         ? CrosstalkFunctionWithDynamicProceduresOut<R[K]['function']>
//                         : R[K]
//                 }>
//                 : never
//         : never
            
// export type CrosstalkCallerWithDynamicProcedures<F extends CrosstalkFunctionsBasicConstraint> = {
//     // For each key in the input type `T`, `K`, determine the type of the corresponding value
//     // is removing optional flag from Akash Joshi's code appropriate?
//     [K in keyof F]: F[K] extends (...args: never[]) => CrosstalkDataWithDynamicProceduresIn
//         ? // The value is a function,
//             CrosstalkFunctionWithDynamicProceduresOut<F[K]>
//         : // The value is an object
//           // recursively convert it to a PromisifiedRecord
//             F[K] extends CrosstalkFunctionsBasicConstraint
//                 ? CrosstalkCaller<F[K]>
//                 : never
// }




// CFs is an object of functions or sub objects
// sub objects are the same as CFs
//     functions have args and return
//         args can be JSON or /*dynFunc*/
//         return values can be void, Json or DynFunc. They must be converted to promise
//             dynFunc args can be JSON
//             dynFunc Ret can be void, Json or DynFunc. They must be converted to promise

// export type CallDynamicResult = CrosstalkDataWithDynamicProceduresIn | VoidResult

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
//     result: CallDynamicResult
// })
// export type CrosstalkMessage = CallMessage | ReturnMessage | CallDynamicMessage | ReturnDynamicMessage