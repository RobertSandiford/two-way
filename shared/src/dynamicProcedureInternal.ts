
// import type { JsonValue, AlphaDigitUnderscore } from 'sxy-types'
// import { intToBase32, base32ToInt, bigIntToBase32, base32ToBigInt } from './base64UrlEncode.js'
// import { DynamicProcedure, DynamicProcedureName, DynamicProcedureReference, JsonableFunctionBasicConstraint } from './types.js'

// export const dynamicProcedureString ='__TWO_WAY_DYNAMIC_PROCEDURE__'

// function makeDynamicProcedureReference(index: number): DynamicProcedureReference {
//     return (dynamicProcedureString + intToBase32(index)) as DynamicProcedureReference // eslint-disable-line no-type-assertion/no-type-assertion
// }



// //export type AcceptableFunction = (...args: never[]) => JsonValue | Promise<JsonValue>

// export const dynamicProcedures: Record<string, DynamicProcedure> = {}


// let dynamicProcedureIndex = 0

// export type dynamicProcedureInternalArgs<F extends JsonableFunctionBasicConstraint>
//     = [name: DynamicProcedureName, function: F] | [function: F]

// export function dynamicProcedureInternal<
//     F extends JsonableFunctionBasicConstraint,
//     A extends dynamicProcedureInternalArgs<F>
// >(...args: A) : DynamicProcedureReference {
//     let name: DynamicProcedureName | null = null
//     let func: F
//     if (args.length === 2) {
//         name = args[0]
//         func = args[1]
//     } else {
//         func = args[0]
//     }
    
//     const id = ++dynamicProcedureIndex

//     const ref = makeDynamicProcedureReference(id)

//     const dn: DynamicProcedure<F> = {
//         id,
//         ref,
//         name,
//         func
//     }
//     //func
//     dynamicProcedures[String(id)] = dn


//     return ref

    
// }

// dynamicProcedureInternal((a: number) => 'foo')