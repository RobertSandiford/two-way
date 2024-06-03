// Maybe add in the future
// import { JsonValue } from "sxy-types"
// import { IWebSocket } from "./IWebSocket.js"
// import { errorLog, getTime, warn } from "./lib.js"
// import { CallMessage, CrosstalkCaller, JsonableFunctionsBasicConstraint, Message, ResolveReject, VoidResult } from "./types.js"

// type CallerData = { callIndex: number }
// export function makeAllCaller<Functions extends JsonableFunctionsBasicConstraint>(sockets: Set<IWebSocket>) {
//     const data: CallerData = { callIndex: 0 }
//     const calls: Record<number, ResolveReject> = {}
//     socket.on('message', function(data: string) {
//         const message: Message = JSON.parse(data.toString())
//         switch (message.type) {
//             case "return": {
//                 const call = calls[message.id]
//                 if (call) {
//                     call.resolve(message.result)
//                 } else {
//                     errorLog(`ID ${message.id} in received 'return' message not found`)
//                     errorLog(message)
//                     // ignore
//                 }
//             }
//         }
//     })
//     return new Proxy(
//         {} as CrosstalkCaller<Functions>, // eslint-disable-line no-type-assertion/no-type-assertion
//         makeProxyHandler<CrosstalkCaller<Functions>>(socket, data)
//     )


//     type Procedure = (...args: never[]) => Promise<JsonValue | VoidResult>
//     function makeProcedure(socket: IWebSocket, data: CallerData, path: string): Procedure {
//         return new Proxy(
//             function procedure(...args: JsonValue[]) {
//                 return new Promise<JsonValue | VoidResult>( (resolve, reject) => {
//                     // what if the socket is connecting
//                     if (socket.readyState !== socket.OPEN) {
//                         warn('socket is not open, state is ' + String(socket.readyState))
//                     }
//                     const callIndex = ++data.callIndex
//                     calls[callIndex] = {
//                         resolve,
//                         reject
//                     }
//                     const callMessage: CallMessage = {
//                         type: 'call',
//                         path,
//                         args,
//                         id: callIndex,
//                         time: getTime()
//                     }
//                     socket.send(JSON.stringify(callMessage))
//                 })
//             },
//             makeProxyHandler<Procedure>(socket, data, path)
//         )
//     }

//     function makeProxyHandler<Target extends Procedure | object>(socket: IWebSocket, data: CallerData, path?: string) { // eslint-disable-line max-len
//         return {
//             get(target: Target, prop: string | symbol, receiver: any) {
//                 if (typeof prop === 'symbol') return null
//                 return makeProcedure(
//                     socket,
//                     data,
//                     (typeof path === 'string')  ? path + '/' + prop  : prop
//                 )
//             }
//         }
//     }

// }