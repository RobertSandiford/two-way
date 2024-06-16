
import type { Expand, JsonValue } from 'sxy-types'
import { BrowserWebSocket } from './BrowserWebSocket.js'
import { errorLog } from '@two-way/shared/lib.js'
import { makeCaller } from '@two-way/shared/makeCaller.fullDynamicProcedures.js'
import {
    TwoWayCaller, TwoWayLooseCaller, ValidTwoWayFunctions,
    TwoWayFunctionsLowConstraint
} from '@two-way/shared/types.fullDynamicProcedures.js'
import { makeLooseCaller } from '@two-way/shared/makeLooseCaller.js'
import { makeCallListener } from '@two-way/shared/makeCallListener.js'




type TwoWayClientConstructorListeners<ServerFunctions extends TwoWayFunctionsLowConstraint> = {
    onOpen?: (caller: TwoWayCaller<ServerFunctions>) => void | Promise<void>
}

// type TwoWayClientConstructorListeners = {
//     onOpen?: (event: unknown) => void | Promise<void>
// }


export class TwoWayClient<
    ClientFunctions extends TwoWayFunctionsLowConstraint,
    ServerFunctions extends TwoWayFunctionsLowConstraint = TwoWayFunctionsLowConstraint
> {
    readonly ownFunctions
    readonly webSocket: BrowserWebSocket
    readonly connected: Promise<{
        caller: Expand<TwoWayCaller<ServerFunctions>>,
        looseCaller: Expand<TwoWayLooseCaller<ServerFunctions>>
    }>
    //caller: CrosstalkCaller<ServerFunctions>
    readonly caller: Expand<TwoWayCaller<ServerFunctions>>
    readonly looseCaller: Expand<TwoWayLooseCaller<ServerFunctions>>
    constructor(
        url: string | URL,
        clientFunctions?: ValidTwoWayFunctions<ClientFunctions>,
        listeners?: TwoWayClientConstructorListeners<ServerFunctions>
    ) {
        //console.log('try to connect to socket ' + url)
        const ownFunctions = this.ownFunctions = clientFunctions
        const socket = this.webSocket = new BrowserWebSocket(url)

        this.caller = makeCaller<ServerFunctions>(socket)
        this.looseCaller = makeLooseCaller<ServerFunctions>(socket)

        this.connected = new Promise((resolve, reject) => {
            socket.on('open', (ev: unknown) => {
                if (listeners?.onOpen) listeners.onOpen(this.caller)
                resolve({ caller: this.caller, looseCaller: this.looseCaller })
            })
        })
        socket.on('error', (error: unknown) => {
            errorLog('two-way Socket Error', error)
        })

        if (ownFunctions) {
            socket.on('message', makeCallListener(socket, ownFunctions))
        }
    }
    close = () => {
        console.log('closing TwoWayClient\'s web socket')
        this.webSocket.close()// this returns nothing and doesn't seem to care whether it is already closed or not
    }
    [Symbol.dispose] = () => {
        this.close()
    }
}
