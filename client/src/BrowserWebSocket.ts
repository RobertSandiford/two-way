
import { WebSocketBase } from "@two-way/shared/WebSocketBase.fullDynamicProcedures.js"
import {
    ITwoWayWebSocket, IWebSocketData, IWebSocketReadyState, ITwoWayWebSocketEventArgs,
    ITwoWayWebSocketListenerArgsIsOpen, ITwoWayWebSocketListenerArgsIsClose,
    ITwoWayWebSocketListenerArgsIsError, ITwoWayWebSocketListenerArgsIsMessage,

} from "@two-way/shared/ITwoWayWebSocket.fullDynamicProcedures.js"
//import { dynamicProcedureInternal } from "./dynamicProcedureInternal.js"
import { warn } from "@two-way/shared/lib.js"
//import type { TwoWayFunctionLowConstraint } from "@two-way/shared/types.fullDynamicProcedures.js"

export type WebSocketOpenEvent = WebSocketEventMap['open']
export type WebSocketCloseEvent = WebSocketEventMap['close']
export type WebSocketErrorEvent = WebSocketEventMap['error']
export type WebSocketMessageEvent = MessageEvent<IWebSocketData>

export class BrowserWebSocket extends WebSocketBase implements ITwoWayWebSocket {
    webSocket: WebSocket
    get CONNECTING() { return this.webSocket.CONNECTING }
    get OPEN() { return this.webSocket.OPEN }
    get CLOSING() { return this.webSocket.CLOSING }
    get CLOSED() { return this.webSocket.CLOSED }
    get readyState() { return this.webSocket.readyState as IWebSocketReadyState } // eslint-disable-line no-type-assertion/no-type-assertion
    get binaryType() { return this.webSocket.binaryType }
    set binaryType(v: BinaryType) { this.webSocket.binaryType = v }
    constructor(url: string | URL) {
        super()
        this.webSocket = new WebSocket(url)
    }
    on = <Args extends ITwoWayWebSocketEventArgs>(...args: Args) => {
        if (ITwoWayWebSocketListenerArgsIsOpen(args)) {
            const [_, callback] = args
            this.webSocket.addEventListener('open', (event: WebSocketOpenEvent) => {
                callback(event)
            })
        }
        if (ITwoWayWebSocketListenerArgsIsClose(args)) {
            const [_, callback] = args
            this.webSocket.addEventListener('close', () => {
                callback()
            })
        }
        if (ITwoWayWebSocketListenerArgsIsError(args)) {
            const [_, callback] = args
            this.webSocket.addEventListener('error', (event: WebSocketErrorEvent) => {
                callback( ('error' in event) ? event.error : undefined )
            })
        }
        if (ITwoWayWebSocketListenerArgsIsMessage(args)) {
            const [_, callback] = args
            this.webSocket.addEventListener('message', (event: WebSocketMessageEvent) => {
                if (typeof event.data === 'string') {
                    callback(event.data) // find type for this arg
                } else {
                    warn(`BrowserWebSocket received message data was type ${typeof event.data}. Expected string.`)
                }
            })
        }
    }
    //send = (data: string): void => {
    //    this.webSocket.send(data)
    //}
    safeSend = (data: string): void => {
        console.log('safe send: ' + data)
        if (this.webSocket.readyState === this.webSocket.CONNECTING) {
            warn('socket is not open, state is ' + String(this.webSocket.readyState) + '. Queueing sending')
            this.webSocket.addEventListener('open', () => {
                console.log(this.constructor.name + ' sending: ' + data)
                this.webSocket.send(data)
            })
        } else {
            console.log(this.constructor.name + ' sending: ' + data)
            this.webSocket.send(data)
        }
    }
    close = (code?: number | undefined, reason?: string | undefined) => {
        this.webSocket.close(code, reason)
    }
    // dynamicProcedure
    //     = <
    //         F extends JsonableFunctionBasicConstraint,
    //         A extends DynamicProcedureMethodArgs<F>
    //     >(...args: A) => dynamicProcedureInternal(...args);
    [Symbol.dispose] = () => {
        this.webSocket.close() // this returns nothing and doesn't seem to care whether it is already closed or not
    }
}

