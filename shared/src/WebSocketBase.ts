// import type { JsonValue, AlphaDigitUnderscore } from 'sxy-types'
// import { intToBase32 } from './base64UrlEncode.js'
// import { DynamicProcedure, DynamicProcedureName, DynamicProcedureReference, TwoWayFunctionBasicConstraint } from './types.js'
// import { DynamicProcedureMethod, FunctionFromDynamicProcedureArgs } from './IWebSocket.js'

// export const dynamicProcedureString ='__TWO_WAY_DYNAMIC_PROCEDURE__'

// export function makeDynamicProcedureReference<N extends number, F extends TwoWayFunctionBasicConstraint>(
//     index: N
// ): DynamicProcedureReference<string, F> {
//     const s = dynamicProcedureString + intToBase32(index) as `${typeof dynamicProcedureString}${N}` // eslint-disable-line no-type-assertion/no-type-assertion
//     return s as DynamicProcedureReference<typeof s, F> // eslint-disable-line no-type-assertion/no-type-assertion
// }

// export type dynamicProcedureArgs<F extends TwoWayFunctionBasicConstraint>
// = [name: DynamicProcedureName, function: F] | [function: F]

// export class WebSocketBase {

//     dynamicProcedures: Record<string, DynamicProcedure> = {}
//     dynamicProcedureIndex = 0
    
//     // constructor() {
        
//     // }

//     dynamicProcedure: DynamicProcedureMethod = <
//         //F extends CrosstalkFunctionBasicConstraint,
//         A extends dynamicProcedureArgs<TwoWayFunctionBasicConstraint>
//     >(...args: A): DynamicProcedureReference<string, FunctionFromDynamicProcedureArgs<A>> => {
//         type F = FunctionFromDynamicProcedureArgs<A>
//         let name: DynamicProcedureName | null = null
//         let func: F
//         if (args.length === 2) {
//             name = args[0]
//             func = args[1] as F
//         } else {
//             func = args[0] as F
//         }
        
//         const id = ++this.dynamicProcedureIndex
    
//         const ref = makeDynamicProcedureReference<typeof id, F>(id)
    
//         const dn: DynamicProcedure<F> = {
//             id,
//             ref,
//             name,
//             func
//         }

//         //func
//         this.dynamicProcedures[String(id)] = dn
    
//         return ref
//     }
    
//     // need to listen for dynamic calls
    
// }

// const cws = new WebSocketBase
// cws.dynamicProcedure((a: number) => 'foo')