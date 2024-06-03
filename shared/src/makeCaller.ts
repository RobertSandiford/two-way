
// import type { JsonValue } from 'sxy-types'
// import type {
//     CallMessage,
//     TwoWayCaller, TwoWayMessage, TwoWayFunctionsLowConstraint,
//     ResolveReject, VoidResult
// } from './types.js'
// import { errorLog, getTime } from './lib.js'
// import type { IWebSocket } from './IWebSocket.js'
// //import { hydrateDynamicProcedures } from './hydateDynamicProcedures.js'


// type CallerData = { callIndex: number }
// export function makeCaller<Functions extends TwoWayFunctionsLowConstraint>(socket: IWebSocket) {
//     //console.log('makeCaller socket', socket.constructor.name)
//     const data: CallerData = { callIndex: 0 }
//     const calls: Record<number, ResolveReject> = {}

//     socket.on('message', function(data: string) {
//         const message: TwoWayMessage = JSON.parse(data)
//         if (message.type === 'return') {
//             console.log(socket.constructor.name + ' received return message ', message)
//             const call = calls[message.callId]
//             if (call) {
//                 if (message.void) {
//                     console.log('the call result is void')
//                     call.resolve()
//                 } else {
//                     // hydrate the result
//                     console.log('the call result is ', message.result)
//                     //const hydratedResult = hydrateDynamicProcedures(socket, data)
//                     //console.log('the hydrated result is ', hydratedResult)
//                     call.resolve(message.result)
//                 }
//             } else {
//                 errorLog(`ID ${message.callId} in received 'return' message not found`)
//                 errorLog(message)
//                 // ignore
//             }
//         }
//         //  else if (message.type === 'return-dynamic') {
//         //     console.log(socket.constructor.name + ' received return-dynamic message ', message)
//         //     //const call = socket.dy
//         // }
//     })
//     return new Proxy(
//         {} as TwoWayCaller<Functions>, // eslint-disable-line no-type-assertion/no-type-assertion
//         makeProxyHandler<TwoWayCaller<Functions>>(socket, data)
//     )

//     function makeProxyHandler<Target extends Procedure | object>(socket: IWebSocket, data: CallerData, path?: string) { // eslint-disable-line max-len
//         //console.log('makeProxyHandler socket', socket.constructor.name)
//         return {
//             get(target: Target, prop: string | symbol) {
//                 if (typeof prop === 'symbol') return null
//                 return makeProcedure(
//                     socket,
//                     data,
//                     (typeof path === 'string')  ? path + '/' + prop  : prop
//                 )
//             }
//         }
//     }

//     type Procedure = (...args: never[]) => Promise<JsonValue | VoidResult>
//     function makeProcedure(socket: IWebSocket, data: CallerData, path: string): Procedure {
//         return new Proxy(
//             function procedure(...args: JsonValue[]) {
//                 return new Promise<JsonValue | VoidResult>( (resolve, reject) => {
//                     const callIndex = ++data.callIndex
//                     calls[callIndex] = {
//                         resolve,
//                         reject
//                     }
//                     const callMessage: CallMessage = {
//                         type: 'call',
//                         path,
//                         args,
//                         callId: callIndex,
//                         time: getTime()
//                     }
//                     const stringifiedMessage = JSON.stringify(callMessage)
//                     console.log('send call message', stringifiedMessage)
//                     socket.safeSend(stringifiedMessage)
//                 })
//             },
//             makeProxyHandler<Procedure>(socket, data, path)
//         )
//     }

// }
