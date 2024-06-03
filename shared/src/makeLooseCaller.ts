
import type { JsonValue } from 'sxy-types'
import type {
    CallMessage, TwoWayLooseCaller, TwoWayFunctionsLowConstraint,
    ResolveReject, CallResult
} from './types.fullDynamicProcedures.js'
import { getTime } from './lib.js'
import type { ITwoWayWebSocket } from './ITwoWayWebSocket.fullDynamicProcedures.js'


type CallerData = { callIndex: number }
export function makeLooseCaller<Functions extends TwoWayFunctionsLowConstraint>(socket: ITwoWayWebSocket) {

    const data: CallerData = { callIndex: 0 }
    const calls: Record<number, ResolveReject> = {}

    return new Proxy(
        {} as TwoWayLooseCaller<Functions>, // eslint-disable-line no-type-assertion/no-type-assertion
        makeProxyHandler<TwoWayLooseCaller<Functions>>(socket, data)
    )

    function makeProxyHandler<Target extends Procedure | object>(socket: ITwoWayWebSocket, data: CallerData, path?: string) { // eslint-disable-line max-len
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
            function procedure(...args: JsonValue[]) {
                return new Promise<CallResult>( (resolve, reject) => {
                  
                    const callIndex = ++data.callIndex
                    calls[callIndex] = {
                        resolve,
                        reject
                    }
                    const callMessage: CallMessage = {
                        type: 'call',
                        path,
                        args,
                        callId: callIndex,
                        time: getTime()
                    }
                    const stringifiedMessage = JSON.stringify(callMessage)
                    console.log('loosely send call message', stringifiedMessage)
                    socket.safeSend(stringifiedMessage)
                })
            },
            makeProxyHandler<Procedure>(socket, data, path)
        )
    }

}
