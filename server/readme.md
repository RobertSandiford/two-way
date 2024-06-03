# 2Way - Bi-Directional Typed WebSocket Communication

### Server
```ts
import { TwoWayServer } from '@two-way/server'
import type { ClientFunctions } from '../client/TwoWayClient.js'

const registeredUsers: string[] = []

// create server functions that can be called by clients
const serverFunctions = {
    add(a: number, b: number): number {
        return a + b
    },
    register(name: string): undefined {
        registeredUsers.push(name)
    }
}
// export the type of our functions, which the client will use to provide typings for remote function calls
export type ServerFunctions = typeof serverFunctions

const serverPort = 3001

// Provide the local functions typing, and the remote functions type
// when creating a new Server or Client
const server = new TwoWayServer<ServerFunctions, ClientFunctions>(
    serverPort,
    serverFunctions,
    {
        // event callbacks
        onListening: () => {
            console.log(`2Way Server listening on port ${serverPort}`)
        },
        onConnection: async (caller, clientId, socket) => {
            console.log(`Client ${clientId} connected`)
            // call the "say" function on the client that just connected
            caller.say('Hi, the server sent you this message')
        }
    }
)
```


### Client
```ts
import { TwoWayClient } from '@two-way/client'
import type { ServerFunctions } from '../server/TwoWayServer.js'

// create client functions that can be called by the server
const clientFunctions = {
    say: (text: string): undefined => { console.log(text) },
}
// export the type of our functions, which the server will use to provide typings for remote function calls
export type ClientFunctions = typeof clientFunctions

const serverLocation = 'ws://localhost:3001'

// Provide the local functions typing, and the remote functions type
// when creating a new Server or Client
const { caller } = new TwoWayClient<ClientFunctions, ServerFunctions>(serverLocation, clientFunctions)

// call the "register" function on the server
caller.register('Bob')
// call the "sum" function on the server and await the result
const result = await caller.add(1, 2)
if ( !(result instanceof Error) ) {
    // result === 3
}
```