
import type { AlphaDigitUnderscore, JsonPrimitive, JsonValue, JsonData, Expand } from "sxy-types"
import type { ITwoWayWebSocket } from "./ITwoWayWebSocket.fullDynamicProcedures.js"
import { dynamicProcedureString } from './WebSocketBase.fullDynamicProcedures.js'

export const $dynamicProcedureRef = Symbol()
type $DynamicProcedureRef = typeof $dynamicProcedureRef

export type DynamicProcedureName = `${AlphaDigitUnderscore}${string}`
export type DynamicProcedureReference<S extends DynamicProcedureName = DynamicProcedureName>
    = `${typeof dynamicProcedureString}${S}`
export type DynamicProcedure<F extends TwoWayFunctionLowConstraint = TwoWayFunctionLowConstraint>
    = F & { [$dynamicProcedureRef]: DynamicProcedureReference }

export function StringIsDynamicProcedureReference(value: string): value is DynamicProcedureReference {
    return  value.startsWith(dynamicProcedureString)
}
export function JsonPrimitiveIsDynamicProcedureReference(value: JsonPrimitive): value is DynamicProcedureReference {
    return typeof value === 'string' && StringIsDynamicProcedureReference(value)
}
export function JsonDataIsDynamicProcedureReference(value: JsonData): value is DynamicProcedureReference {
    return typeof value === 'string' && StringIsDynamicProcedureReference(value)
}



//export type TwoWayFunction = (this: IWebSocket, ...args: TwoWayData[]) => TwoWayData
export type TwoWayFunction<F extends TwoWayFunctionLowConstraint = TwoWayFunctionLowConstraint>
    = Parameters<F> extends TwoWayData[] ? F : never
type TwoWayFunctionFromArgs<Args extends TwoWayData[]> = (...args: Args) => CallResult | Promise<CallResult>
export type TwoWayFunctionGeneric<Args extends TwoWayData[], Ret extends TwoWayData>
    = (this: ITwoWayWebSocket, ...args: Args) => Ret
//export type TwoWayFunctionLowConstraint = (this: IWebSocket, ...args: never[]) => CallResult | Promise<CallResult>
//export type TwoWayFunctionLowConstraint = (this: IWebSocket) => CallResult | Promise<CallResult>
export type TwoWayFunctionLowConstraint = (this: ITwoWayWebSocket, ...args: any[]) => CallResult | Promise<CallResult>
//export type TwoWayFunctionLowConstraint2 = (this: IWebSocket, ...args: never[]) => unknown


export type TwoWayData = string | number | boolean | null | DynamicProcedure
    | { [key: string]: TwoWayData } | TwoWayData[]
export type TwoWayDataObject = { [key: string]: TwoWayData; }
export type TwoWayDataArray = TwoWayData[]

export type TwoWayDataOut<T extends TwoWayData> = T extends DynamicProcedure
    ? DynamicProcedureOut<T>
    : {
        [K in keyof T]: T[K] extends DynamicProcedure ? DynamicProcedureOut<T[K]> : T[K]
    }

// type R0 = TwoWayFunctionLowConstraint
// type R1 = DynamicProcedure
// type R3 = ReturnType<TwoWayFunctionLowConstraint>
// type R4 = ReturnType<DynamicProcedure>
// type R5 = Awaited<ReturnType<DynamicProcedure>>
// type R6 = ReturnType<(this: ITwoWayWebSocket, ...args: never[]) => CallResult | Promise<CallResult>>
// type R7 = ReturnType<(...args: never[]) => CallResult | Promise<CallResult>>
// type R8 = ReturnType<(...args: never[]) => CallResult>
// type R9 = ReturnType<(...args: never[]) => TwoWayData>
// type R10 = ReturnType<(...args: [string, number]) => TwoWayData>

// type E1 = ((...args: never[]) => TwoWayData) extends ((...args: any) => any) ? 'ex' : 'nex'
// type E2 = ((arg: string) => TwoWayData) extends ((...args: any) => any) ? 'ex' : 'nex'
// type E3 = ((...args: never[]) => TwoWayData) extends ((...args: any) => infer R) ? 'ex' : 'nex'
// type E4 = ((arg: string) => TwoWayData) extends ((...args: any) => infer R) ? 'ex' : 'nex'

export type DynamicProcedureOut<P extends DynamicProcedure> = {
    (...args: Parameters<P>): P extends (...args: never[]) => (infer R extends TwoWayData | Promise<TwoWayData>)
        ? Promise<ProcedureError | TwoWayDataOut<Awaited<R>>>
        : Promise<ProcedureError | undefined>
    [$dynamicProcedureRef]: P[typeof $dynamicProcedureRef]
}

//export type VoidResult = void
export type ProcedureError = Error
export type CallResult = TwoWayData | undefined

// Function Controls
//export type TwoWayFunctionBasicConstraint = (this: IWebSocket, ...args: never[]) => unknown
// export type ValidTwoWayFunction<T extends TwoWayFunctionLowConstraint> = Parameters<T> extends TwoWayData[]
//     ? T
//     : never


export type TwoWayFunctionsLowConstraintEntry = TwoWayFunctionLowConstraint | TwoWayFunctionsLowConstraint
export type TwoWayFunctionsLowConstraint = {
    [key: string]: TwoWayFunctionsLowConstraintEntry
}

export type ValidTwoWayFunctions<Fs extends TwoWayFunctionsLowConstraint> = {
    [K in keyof Fs]: Fs[K] extends TwoWayFunctionLowConstraint
        // Fs[K] is a procedure/function
        ? Parameters<Fs[K]> extends JsonValue[]
            // has valid params
            ? ValidReturn<ReturnType<Fs[K]>, Fs[K]>
            // ? ReturnType<Fs[K]> extends Promise<infer R>
            //     ? JsonableReturn<R, Fs[K]>
            //     : JsonableReturn<ReturnType<Fs[K]>, PromisifyFunction<Fs[K]>>
            : 'Function may only accept JSONable arguments'
        : Fs[K] extends TwoWayFunctionsLowConstraint // Fs[K] is an object probably containing procedures/functions or more objects
                                                 // This extends check is a given, it is just here to help TS narrow the type
                                                 // as it seems not to narrow the type in the else case
            ? ValidTwoWayFunctions<Fs[K]> // Fs[K] is an object probably containing procedures/functions or more objects
            : never
}
type InvalidReturnMessage = 'Function may only return JSONable values, Dynamic Procedures, or void'
type ValidReturn<R, F> = R extends CallResult
    ? R extends never
        ? InvalidReturnMessage
        : F
    : InvalidReturnMessage

export type TwoWayCaller<F extends TwoWayFunctionsLowConstraint> = {
    // For each key in the input type `T`, `K`, determine the type of the corresponding value
    // is removing optional flag from Akash Joshi's code appropriate?
    [K in keyof F]: F[K] extends (...args: infer Args) => infer R
        ? // The value is a function,
        R extends TwoWayData
            // the function returns some TwoWayData instead of undefined
            ? (...args: Args) => Promise<ProcedureError | Awaited<TwoWayDataOut<R>>>
            : (...args: Args) => Promise<ProcedureError | undefined>
            /*
            R extends Promise<CrosstalkData>
                ? // If the return type of the function is already a Promise, leave it as-is

                    //F[K]

                    // Convert the output to handle dynamic procs
                    (...args: Args) => R

                : // Otherwise, convert the function to return a Promise
                  //(...args: Parameters<F[K]>) => Promise<ReturnType<F[K]>>
                    //PromisifyFunction<F[K]>
                    //(...args: Args) => Promise<R>

                    // Convert the output to handle dynamic procs
                    R extends CrosstalkData | void
                        ? (...args: Args) => Promise<R>
                        : 'Function R type should extend CrosstalkData | void'
            */

        : // The value is an object
          // recursively convert it to a PromisifiedRecord
            F[K] extends TwoWayFunctionsLowConstraint
                ? TwoWayCaller<F[K]>
                : never
}




// export type CrosstalkLooseCaller<F extends CrosstalkFunctionsBasicConstraint>
//     = CrosstalkLooseCallerInner<CrosstalkFunctionsOut<F>>


// not using this because it hides the true type when hovering
//type PromisifyFunction<F extends JsonableFunctionBasicConstraint> = (...args: Parameters<F>) => Promise<ReturnType<F>>

// CrosstalkLooseCallerInner and CrosstalkFunctionsOut could be combined into one

export type TwoWayLooseCaller<F extends TwoWayFunctionsLowConstraint> = {
    // For each key in the input type `T`, `K`, determine the type of the corresponding value
    [K in keyof F]/*-?*/: F[K] extends (...args: infer Args) => unknown
        ? // The value is a function,
          // set the return type to void
            (...args: Args) => void
        : // The value is an object
          // recursively convert it to a PromisifiedRecord
            F[K] extends TwoWayFunctionsLowConstraint
                ? TwoWayLooseCaller<F[K]>
                : never
}



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





export type ResolveReject = {
    resolve: (value: CallResult | PromiseLike<CallResult>) => void,
    reject: (reason?: unknown) => void
}


export type CallMessage = {
    type: 'call'
    path: string
    args: JsonData[]
    callId: number
    time: number
}
export type _ReturnMessage = {
    type: 'return'
    path: string // testing/debugging only
    args: JsonData[] // testing/debugging only
    callTime: number // testing/debugging only
    callId: number
    time: number
    result: JsonData
}
export type ReturnMessageOutgoing = {
    type: 'return'
    path: string // testing/debugging only
    args: JsonData[] // testing/debugging only
    callTime: number // testing/debugging only
    callId: number
    time: number
    result: CallResult
}
export type ReturnMessage = ReturnMessageOutgoing & { result: JsonData | undefined }
export type CallDynamicMessage = {
    type: 'call-dynamic'
    dynProcId: number,
    args: JsonData[]
    callId: number
    time: number
}
export type ReturnDynamicMessageOutgoing = {
    type: 'return-dynamic'
    dynProcId: number // testing/debugging only
    args: JsonData[] // testing/debugging only
    callTime: number // testing/debugging only
    callId: number
    time: number
    result: CallResult
}
export type ReturnDynamicMessage = ReturnDynamicMessageOutgoing & { result: JsonData | undefined }
// export type ReturnDynamicMessage = {
//     type: 'return-dynamic'
//     path: string // testing/debugging only
//     args: JsonData[] // testing/debugging only
//     callTime: number // testing/debugging only
//     callId: number
//     time: number
// } & ({
//     void: true
// } | {
//     void: false
//     result: CallResult
// })
export type TwoWayMessage = CallMessage | ReturnMessage | CallDynamicMessage | ReturnDynamicMessage