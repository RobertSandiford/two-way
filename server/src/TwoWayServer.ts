
import type { IncomingMessage } from 'http'
import { WebSocketServer as WSServer, WebSocket as WSSocket } from 'ws'
import { makeCaller } from '@two-way/shared/makeCaller.fullDynamicProcedures.js'
import type { TwoWayCaller, Valid2WayFunctions, TwoWayFunctionsLowConstraint } from '@two-way/shared/types.fullDynamicProcedures.js'
import { ServerWebSocket } from './ServerWebSocket.js'
import { makeCallListener } from '@two-way/shared/makeCallListener.js'
import { log } from '@two-way/shared/lib.js'


type TwoWayServerEvents<ClientFunctions extends TwoWayFunctionsLowConstraint> = {
    listening: () => void,
    connection: (
        caller: TwoWayCaller<ClientFunctions>,
        clientId: number,
        socket: ServerWebSocket,
        request: IncomingMessage
    ) => void
}

type TwoWayServerConstructorListeners<ClientFunctions extends TwoWayFunctionsLowConstraint> = {
    onListening?: TwoWayServerEvents<ClientFunctions>['listening']
    onConnection?: TwoWayServerEvents<ClientFunctions>['connection']
}

export class TwoWayServer<
    ServerFunctions extends TwoWayFunctionsLowConstraint,
    ClientFunctions extends TwoWayFunctionsLowConstraint = TwoWayFunctionsLowConstraint
> {
    readonly ownFunctions
    readonly webSocketServer: WSServer
    #clientIndex = 0
    readonly clients = new Set<ServerWebSocket>
    constructor(
        port: number,
        serverFunctions?: Valid2WayFunctions<ServerFunctions>,
        listeners?: TwoWayServerConstructorListeners<ClientFunctions>
    ) {
        // save a reference to this
        const twoWayServer = this // eslint-disable-line @typescript-eslint/no-this-alias

        const ownFunctions = this.ownFunctions = serverFunctions

        // if an on listening callback was provided, set up a listener to call this
        // the user can grab the webSocketServer and add their own listener instead,
        // but this could create a race condition, so this approach is recommended
        if (listeners) {
            const { onListening, onConnection } = listeners
            if (onListening) this.onListening(onListening)
            if (onConnection) this.onConnection(onConnection)
        }
        //wss.on('listening', () => this.emitListening())
            
        // create socket server
        const wss = this.webSocketServer = new WSServer({ port }, this.emitListening)

        // when a client connects to the web socket server
        wss.on('connection', function (this: WSServer, wsSocket: WSSocket, request: IncomingMessage) {
            // assign an ID, 1 higher than the current index
            const clientId = ++twoWayServer.#clientIndex
            const socket = new ServerWebSocket(wsSocket)
            
            log(`Client ${clientId} Connected`)

            // save the client?
            twoWayServer.clients.add(socket)

            const caller = makeCaller<ClientFunctions>(socket)

            if (ownFunctions) {
                socket.on('message', makeCallListener<Valid2WayFunctions<ServerFunctions>>(socket, ownFunctions))
            }

            twoWayServer.emitConnection(caller, clientId, socket, request)

            // experi
            socket.on('close', () => console.log(`Client ${clientId} disconnected`))
        })

        // experi
        wss.on('close', () => console.log('WSS close event'))

    }

    listeningListeners: TwoWayServerEvents<ClientFunctions>['listening'][] = []
    onListening = (callback: TwoWayServerEvents<ClientFunctions>['listening']) => {
        this.listeningListeners.push(callback)
    }
    emitListening = () => {
        for (const callback of this.listeningListeners) {
            callback()
        }
    }

    connectionListeners: TwoWayServerEvents<ClientFunctions>['connection'][] = []
    onConnection = (callback: TwoWayServerEvents<ClientFunctions>['connection']) => {
        this.connectionListeners.push(callback)
    }
    emitConnection = (
        caller: TwoWayCaller<ClientFunctions>,
        clientId: number,
        socket: ServerWebSocket,
        request: IncomingMessage
    ) => {
        for (const callback of this.connectionListeners) {
            callback(caller, clientId, socket, request)
        }
    }

    //callAll = makeAllCaller<ClientFunctions>(this.clients)

    close = () => {
        console.log('closing 2WayServer\'s web socket')
        this.webSocketServer.close()// this returns nothing and doesn't seem to care whether it is already closed or not
    }
    [Symbol.dispose] = () => {
        this.close()
    }
}



