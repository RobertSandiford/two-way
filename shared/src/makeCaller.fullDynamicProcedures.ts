
import type { JsonValue } from 'sxy-types'
import type {
    CallMessage, TwoWayCaller, TwoWayMessage, TwoWayFunctionsLowConstraint,
    ResolveReject, CallResult, TwoWayData
} from './types.fullDynamicProcedures.js'
import { errorLog, getTime } from './lib.js'
import type { ITwoWayWebSocket } from './ITwoWayWebSocket.fullDynamicProcedures.js'
import { convertOutgoingData } from './convertOutgoingData.js'
import { convertIncomingData } from './convertIncomingData.js'
//import { hydrateDynamicProcedures } from './hydateDynamicProcedures.js'


type CallerData = { callIndex: number }
export type DynamicCalls = {
    currentIndex: number
    [index: number]: ResolveReject
}

export function makeCaller<Functions extends TwoWayFunctionsLowConstraint>(socket: ITwoWayWebSocket) {
    //console.log('makeCaller socket', socket.constructor.name)
    const data: CallerData = { callIndex: 0 }
    const dynamicCalls: DynamicCalls = { currentIndex: 0 }
    const calls: Record<number, ResolveReject> = {}

    socket.on('message', function(data: string) {
        const message: TwoWayMessage = JSON.parse(data)
        if (message.type === 'return') {
            console.log(socket.constructor.name + ' received return message ', message)
            const call = calls[message.callId]
            if (call) {
                // hydrate the result
                console.log('the call result is ', message.result)
                //const hydratedResult = hydrateDynamicProcedures(socket, data)
                //console.log('the hydrated result is ', hydratedResult)
                const result = convertIncomingData(socket, dynamicCalls, message.result)
                call.resolve(result)
            } else {
                errorLog(`ID ${message.callId} in received 'return' message not found in calls object`)
                errorLog(message)
                // ignore
            }
        } else if (message.type === 'return-dynamic') {
            console.log(socket.constructor.name + ' received return-dynamic message ', message)
        //     //const call = socket.dy
            const call = dynamicCalls[message.callId]
            if (call) {
                // hydrate the result
                console.log('the call-dyanamic result is ', message.result)
                //const hydratedResult = hydrateDynamicProcedures(socket, data)
                //console.log('the hydrated result is ', hydratedResult)
                const result = convertIncomingData(socket, dynamicCalls, message.result)
                call.resolve(result)
            } else {
                errorLog(`ID ${message.callId} in received 'return-dynamic' message not found in dynamicCalls objects`)
                errorLog(message)
                // ignore
            }
        }
    })

    return new Proxy(
        {} as TwoWayCaller<Functions>, // eslint-disable-line no-type-assertion/no-type-assertion
        makeProxyHandler<TwoWayCaller<Functions>>(socket, data)
    )

    function makeProxyHandler<Target extends Procedure | object>(socket: ITwoWayWebSocket, data: CallerData, path?: string) { // eslint-disable-line max-len
        //console.log('makeProxyHandler socket', socket.constructor.name)
        return {
            get(target: Target, prop: string | symbol) {
                if (typeof prop === 'symbol') return null
                return makeProcedure(
                    socket,
                    data,
                    (typeof path === 'string')  ? path + '/' + prop  : prop
                )
            }
        }
    }

    type Procedure = (...args: never[]) => Promise<CallResult>
    function makeProcedure(socket: ITwoWayWebSocket, data: CallerData, path: string): Procedure {
        return new Proxy(
            function procedure(...args: TwoWayData[]) {
                return new Promise<CallResult>( (resolve, reject) => {
                    const callIndex = ++data.callIndex
                    calls[callIndex] = {
                        resolve,
                        reject
                    }
                    console.log('outgoing args', convertOutgoingData(args))
                    const callMessage: CallMessage = {
                        type: 'call',
                        path,
                        args: convertOutgoingData(args),
                        callId: callIndex,
                        time: getTime()
                    }
                    const stringifiedMessage = JSON.stringify(callMessage)
                    console.log('send call message', stringifiedMessage)
                    socket.safeSend(stringifiedMessage)
                })
            },
            makeProxyHandler<Procedure>(socket, data, path)
        )
    }

}
