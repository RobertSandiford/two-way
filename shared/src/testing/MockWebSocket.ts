import { WebSocketBase } from "../WebSocketBase.fullDynamicProcedures.js"
import { ITwoWayWebSocket, ITwoWayWebSocketEventArgs } from "../ITwoWayWebSocket.fullDynamicProcedures.js"

export class MockWebSocket extends WebSocketBase implements ITwoWayWebSocket {
    //webSocket: WebSocket
    _readyState: 0 | 1 | 2 | 3 = 0
    get CONNECTING() { return 0 as const }
    get OPEN() { return 1 as const }
    get CLOSING() { return 2 as const }
    get CLOSED() { return 3 as const }
    get readyState() { return this._readyState }
    on = <Args extends ITwoWayWebSocketEventArgs>(...args: Args) => {
        //
    }
    safeSend = () => {
        //
    }
    close = () => {
        this._readyState = 3
    }
}