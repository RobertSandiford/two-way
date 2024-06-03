
import type {
    CallResult, TwoWayFunctionLowConstraint, TwoWayFunctionsLowConstraint,
    TwoWayFunctionsLowConstraintEntry, TwoWayMessage, ReturnMessage, Valid2WayFunctions,
    ReturnMessageOutgoing,
    ReturnDynamicMessageOutgoing
} from "./types.fullDynamicProcedures.js"
import { errorLog, getTime } from "./lib.js"
import { ITwoWayWebSocket } from "./ITwoWayWebSocket.fullDynamicProcedures.js"
import { convertOutgoingData } from "./convertOutgoingData.js"
import { WebSocketBase } from "./WebSocketBase.fullDynamicProcedures.js"

export function makeCallListener<Functions extends Valid2WayFunctions<TwoWayFunctionsLowConstraint>>(
    socket: ITwoWayWebSocket,
    procedures: Functions,
) {
    return async function(data: string) {
        const message: TwoWayMessage = JSON.parse(data.toString())

        if (message.type === 'call') {

            console.log('received call message', message)
            const path = message.path.split('/')
            let p: TwoWayFunctionLowConstraint | TwoWayFunctionsLowConstraint = procedures
            for (const part of path) {
                if (typeof p === 'object') {
                    const x: TwoWayFunctionsLowConstraintEntry | undefined = p[part]
                    if (x !== undefined) p = x
                    else errorLog(
                        `Call message handler looking for part ${part} in path ${path}`
                            + `, but x is undefined`
                    )
                } else {
                    errorLog(
                        `Call message handler Looking for part ${part} in path ${path}`
                            + `, but p is not an object, p is ${typeof p}`
                    )
                }
            }
            if (typeof p === 'function') {
                const result = await p.call(socket, ...message.args as Parameters<typeof p>)
                console.log('outgoing result', convertOutgoingData(result))
                console.log(`result of call to ${path}: `, typeof result, result)
                const returnMessage: ReturnMessageOutgoing = {
                    type: 'return',
                    path: message.path, // test/debug only
                    args: message.args, // test/debug only
                    callTime: message.time,
                    callId: message.callId,
                    result: convertOutgoingData(result), // JSON doesn't support undefined, so this entry won't appear
                            // in the JSON if the value is undefined
                    time: getTime()
                }
                socket.safeSend(JSON.stringify(returnMessage))
            } else {
                errorLog(
                    `Call message with ${path} refers to a procedure housing object, not a procedure/function`
                )
            }

        } else if (message.type === 'call-dynamic') {
            const { dynProcId } = message
            console.log('received call-dynamic message', message)

            const dynProc = (socket as ITwoWayWebSocket & WebSocketBase).dynamicProcedures[dynProcId]
            console.log('dynProc', dynProc)

            if (dynProc === undefined) {
                console.log('Error, dynamic procedure not found')
                // send error response
            } else {
                const result = await dynProc.call(socket, ...message.args as Parameters<typeof dynProc>)
                console.log('outgoing result', convertOutgoingData(result))
                console.log(`result of call to dynamic procedure ${dynProcId}: `, typeof result, result)
                const returnDynamicMessage: ReturnDynamicMessageOutgoing = {
                    type: 'return-dynamic',
                    dynProcId, // test/debug only
                    args: message.args, // test/debug only
                    callTime: message.time,
                    callId: message.callId,
                    result: convertOutgoingData(result), // JSON doesn't support undefined, so this entry won't appear
                            // in the JSON if the value is undefined
                    time: getTime()
                }
                socket.safeSend(JSON.stringify(returnDynamicMessage))
            }
        }

    }
}
