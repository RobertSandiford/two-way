
// // FUTURE

// import { type as arkType } from 'arkType'
// import { z } from 'zod'

// // The input is parsed json (or could be JSON string), so conformance with jsonValue does not need to be checked for

// const callMessage = z.object({
//     type: z.literal('call'),
//     path: z.string(),
//     args: z.unknown(),
//     id: z.number(),
//     time: z.number()
// })

// const returnMessage = z.intersection(
//     z.object({
//         type: z.literal('return'),
//         path: z.string(),
//         args: z.unknown(),
//         id: z.number(),
//         callTime: z.number(),
//         time: z.number(),
//     }),
//     z.union([
//         z.object({
//             void: z.literal(true)
//         }),
//         z.object({
//             void: z.literal(false),
//             result: z.unknown()
//         })
//     ])
// )

// const crosstalkMessage = z.union([
//     callMessage,
//     returnMessage
// ])


// const arkCallMessage = arkType({
//     type: `'call'`,
//     path: 'string',
//     args: 'unknown',
//     id: 'number',
//     time: 'number'
// })

// const arkReturnMessage = arkType({
//     type: `'return'`,
//     path: 'string',
//     args: 'unknown',
//     id: 'number',
//     callTime: 'number',
//     time: 'number'
// }).and(
//     arkType({
//         void: 'true',
//     }).or({
//         void: 'false',
//         result: 'unknown',
//     })
// )

// const arkCrosstalkMessage = arkCallMessage.or(arkReturnMessage)

// export {
//     callMessage, returnMessage, crosstalkMessage,
//     arkCallMessage, arkReturnMessage, arkCrosstalkMessage
// }

// const data = 'abc'

// const json = arkType('parse.json')
// const {errors, out } = json(data)
// if (!errors) {
//     const { errors: _errors, out: _out } = arkCrosstalkMessage(out)
//     if (!_errors) {
//         _out
//     }
// }
