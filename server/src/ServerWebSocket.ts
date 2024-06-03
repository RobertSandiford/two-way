
import * as WS from 'ws'
import { WebSocket as WSSocket } from 'ws'
import {
    type ITwoWayWebSocket, type ITwoWayWebSocketEventArgs,
    ITwoWayWebSocketListenerArgsIsOpen, ITwoWayWebSocketListenerArgsIsClose,
    ITwoWayWebSocketListenerArgsIsError, ITwoWayWebSocketListenerArgsIsMessage,
} from '@two-way/shared/ITwoWayWebSocket.fullDynamicProcedures.js'
import { warn } from "@two-way/shared/lib.js"
import { WebSocketBase } from '@two-way/shared/WebSocketBase.fullDynamicProcedures.js'


export class ServerWebSocket extends WebSocketBase implements ITwoWayWebSocket {
    webSocket: WSSocket
    get CONNECTING() { return this.webSocket.CONNECTING }
    get OPEN() { return this.webSocket.OPEN }
    get CLOSING() { return this.webSocket.CLOSING }
    get CLOSED() { return this.webSocket.CLOSED }
    get readyState() { return this.webSocket.readyState } // eslint-disable-line no-type-assertion/no-type-assertion
    get binaryType() { return this.webSocket.binaryType }
    set binaryType(v: 'arraybuffer' | 'nodebuffer' | 'fragments') { this.webSocket.binaryType = v }
    constructor(webSocket: WSSocket) {
        super()
        this.webSocket = webSocket
    }
    on = <Args extends ITwoWayWebSocketEventArgs>(...args: Args) => {
        if (ITwoWayWebSocketListenerArgsIsOpen(args)) {
            const [socketEvent, callback] = args
            this.webSocket.addEventListener(socketEvent, (event: WS.Event) => {
                callback(event)
            })
        }
        if (ITwoWayWebSocketListenerArgsIsClose(args)) {
            const [socketEvent, callback] = args
            this.webSocket.addEventListener(socketEvent, (event: WS.CloseEvent) => {
                callback()
            })
        }
        if (ITwoWayWebSocketListenerArgsIsError(args)) {
            const [socketEvent, callback] = args
            this.webSocket.addEventListener(socketEvent, (event: WS.ErrorEvent) => {
                callback(event.error as unknown)
            })
        }
        if (ITwoWayWebSocketListenerArgsIsMessage(args)) {
            const [socketEvent, callback] = args
            this.webSocket.addEventListener(socketEvent, (event: WS.MessageEvent) => {
                if (typeof event.data === 'string') {
                    callback(event.data) // find type for this arg
                } else {
                    warn(`ServerWebSocket received message data was type ${typeof event.data}. Expected string.`)
                }
            })
        }
    }
    // send = (data: string): void => {
    //     this.webSocket.send(data)
    // }
    safeSend = (data: string): void => {
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
    [Symbol.dispose] = () => {
        this.webSocket.close() // this returns nothing and doesn't seem to care whether it is already closed or not
    }
}
