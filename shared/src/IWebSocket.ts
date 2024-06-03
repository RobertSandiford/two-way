
// import type * as WS from "ws"
// import { DynamicProcedure, DynamicProcedureName, DynamicProcedureReference, TwoWayFunctionBasicConstraint } from "./types.js"
// type WSSocket = WS.WebSocket
// import { F } from 'ts-toolbelt'

// // copied from 'ws'
// export type BufferLike =
//     | string
//     | Buffer
//     | DataView
//     | number
//     | ArrayBufferView
//     | Uint8Array
//     | ArrayBuffer
//     | SharedArrayBuffer
//     | readonly unknown[]
//     | readonly number[]
//     | { valueOf(): ArrayBuffer }
//     | { valueOf(): SharedArrayBuffer }
//     | { valueOf(): Uint8Array }
//     | { valueOf(): readonly number[] }
//     | { valueOf(): string }
//     | { [Symbol.toPrimitive](hint: string): string };

// export type IWebSocketData = string | ArrayBuffer | Blob

// export type IWebSocketReadyState = 0 | 1 | 2 | 3

// export type DynamicProcedureMethodArgs<F extends TwoWayFunctionBasicConstraint>
//     = [name: DynamicProcedureName, function: F] | [function: F]

// export type FunctionFromDynamicProcedureArgs<A extends DynamicProcedureMethodArgs<TwoWayFunctionBasicConstraint>> =
//     A extends [name: DynamicProcedureName, function: TwoWayFunctionBasicConstraint]
//         ? A[1]
//         : A[0]

// // simple form
// // export type DynamicProcedureMethod
// //     = <A extends DynamicProcedureMethodArgs<TwoWayFunctionBasicConstraint>>(...args: A)
// //         => DynamicProcedureReference<string, FunctionFromDynamicProcedureArgs<A>>

// // full dynamic procedures
// export type DynamicProcedureMethod
//     = <A extends DynamicProcedureMethodArgs<TwoWayFunctionBasicConstraint>>(...args: A)
//         => DynamicProcedure

// type KeysFromWSSocket = 'OPEN' | 'CLOSED' | 'CLOSING' | 'CONNECTING' | 'readyState'
// export type IWebSocket = Pick<WSSocket, KeysFromWSSocket> & {
//     on(event: 'open', listener: IWebSocketListenerMap['open']): void | Promise<void>
//     on(event: 'close', listener: IWebSocketListenerMap['close']): void | Promise<void>
//     on(event: 'error', listener: IWebSocketListenerMap['error']): void | Promise<void>
//     on(event: 'message', listener: IWebSocketListenerMap['message']): void | Promise<void>
//     safeSend: (data: string) => void | Promise<void>
//     close: (code?: number | undefined, reason?: string | undefined) => void | Promise<void>
//     //dynamicProcedures: Record<string, DynamicProcedure>
//     //dynamicProcedureIndex: number
//     //dynamicProcedure: DynamicProcedureMethod
// }

// export type IWebSocketListenerMap = {
//     open: (event: unknown) => void | Promise<void>
//     close: () => void | Promise<void>
//     error: (error: unknown) => void | Promise<void>
//     message: (data: string) => void | Promise<void>
// }
// export type IWebSocketEvent = keyof IWebSocketListenerMap
// export type IWebSocketEventArgsMap = {
//     [Event in IWebSocketEvent]: [Event, IWebSocketListenerMap[Event]]
// }
// export type IWebSocketEventArgs = IWebSocketEventArgsMap[IWebSocketEvent]

// export function IWebSocketListenerArgsIsOpen(args: IWebSocketEventArgs): args is IWebSocketEventArgsMap['open'] {
//     return args[0] === 'open'
// }
// export function IWebSocketListenerArgsIsClose(args: IWebSocketEventArgs): args is IWebSocketEventArgsMap['close'] {
//     return args[0] === 'close'
// }
// export function IWebSocketListenerArgsIsError(args: IWebSocketEventArgs): args is IWebSocketEventArgsMap['error'] {
//     return args[0] === 'error'
// }
// export function IWebSocketListenerArgsIsMessage(args: IWebSocketEventArgs): args is IWebSocketEventArgsMap['message'] {
//     return args[0] === 'message'
// }
