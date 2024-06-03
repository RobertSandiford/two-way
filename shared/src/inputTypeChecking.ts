
// // FUTURE CODE

// import { type as arkType, Type as ArkType } from 'arktype'
// import type { ArrayMinLength, JsonValue } from 'sxy-types'
// import { z, ZodObject, ZodRawShape } from 'zod'
// import { JsonableFunctionBasicConstraint } from './types.js'

// type ProcedureArgumentTypes = ArrayMinLength<ArkType | ZodObject<ZodRawShape>, 1>

// type CrosstalkProcedure = {
//     input?: ProcedureArgumentTypes,
//     func: JsonableFunctionBasicConstraint
// }
// function procedure<F extends () => JsonValue | Promise<JsonValue>>(func: F): CrosstalkProcedure {
//     return {
//         func
//     }
// }

// procedure(() => 'foo')



// //function input<ArgTypes extends ArrayMinLength<ArkType | ZodObject<ZodRawShape>, 1>>(...argTypes: ArgTypes) {
// function input<ArgTypes extends ArrayMinLength<ArkType, 1>>(...argTypes: ArgTypes) {

//     // if (argTypes[0] instanceof ArkType) {
//     //     for (const t of argTypes as ZodObject<ZodRawShape>[]) {

//     //     }
//     // } else {
//     //     for (const t of argTypes as ArkType[]) {

//     //     }
//     // }

//     return {
//         procedure: function procedure<F extends (args: TypeTypeToOutput<ArgTypes>) => unknown>(func: F): CrosstalkProcedure {
//             return {
//                 input: argTypes,
//                 func
//             }
//         }
//     }
// }

// type TypeTypeToOutput<Tuple extends ProcedureArgumentTypes> = Tuple extends ArkType[]
//     ? ArkTypeTupleToOutput<Tuple>
//     : Tuple extends ZodObject<ZodRawShape>[]
//         ? ZodTypeTupleToOutput<Tuple>
//         : never

// type ArkTypeTupleToOutput<ArkTypeTuple extends readonly ArkType[]> = {
//     [Key in keyof ArkTypeTuple]: ArkTypeTuple[Key]['infer']
// }

// type ZodTypeTupleToOutput<ZodTypeTuple extends readonly ZodObject<ZodRawShape>[]> = {
//     [Key in keyof ZodTypeTuple]: z.output<ZodTypeTuple[Key]>
// }

// const _ = arkType("number>5")






// const foo = arkType("parse.number")
// type OUT = typeof foo.out

// const __ = z.object({ a: z.number(), b: z.number() })
// const clientFunctions = {
//     //add: (a: number, b: number) => a + b
//     add: arkType({ a: "number", b: "number" }),
//     subtract: [arkType("number"), arkType("number")]
// }

