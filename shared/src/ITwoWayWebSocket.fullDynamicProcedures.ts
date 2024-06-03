
import type * as WS from "ws"
//import { TwoWayFunctionBasicConstraint } from "./types.js"
import {
    DynamicProcedureName, DynamicProcedure,
    TwoWayFunction, TwoWayFunctionLowConstraint
} from "./types.fullDynamicProcedures.js"
type WSSocket = WS.WebSocket

// copied from 'ws'
export type BufferLike =
    | string
    | Buffer
    | DataView
    | number
    | ArrayBufferView
    | Uint8Array
    | ArrayBuffer
    | SharedArrayBuffer
    | readonly unknown[]
    | readonly number[]
    | { valueOf(): ArrayBuffer }
    | { valueOf(): SharedArrayBuffer }
    | { valueOf(): Uint8Array }
    | { valueOf(): readonly number[] }
    | { valueOf(): string }
    | { [Symbol.toPrimitive](hint: string): string };

export type IWebSocketData = string | ArrayBuffer | Blob

export type IWebSocketReadyState = 0 | 1 | 2 | 3

// currently unused, complicated
export type DynamicProcedureMethodArgs<F extends TwoWayFunctionLowConstraint>
    = [name: DynamicProcedureName, function: F] | [function: F]
export type FunctionFromDynamicProcedureArgs<A extends DynamicProcedureMethodArgs<TwoWayFunctionLowConstraint>> =
    A extends [name: DynamicProcedureName, function: TwoWayFunctionLowConstraint]
        ? A[1]
        : A[0]

// simple form
// export type DynamicProcedureMethod
//     = <A extends DynamicProcedureMethodArgs<TwoWayFunctionBasicConstraint>>(...args: A)
//         => DynamicProcedureReference<string, FunctionFromDynamicProcedureArgs<A>>

// full dynamic procedures
export type DynamicProcedureMethod
    = <F extends TwoWayFunctionLowConstraint>(f: TwoWayFunction<F>)
        => DynamicProcedure<F>

type KeysFromWSSocket = 'OPEN' | 'CLOSED' | 'CLOSING' | 'CONNECTING' | 'readyState'
/// Should this be called TwoWayWebSocket ??
/// Or ITwoWayWebSocket?
export type ITwoWayWebSocket = Pick<WSSocket, KeysFromWSSocket> & {
    on(event: 'open', listener: ITwoWayWebSocketListenerMap['open']): void | Promise<void>
    on(event: 'close', listener: ITwoWayWebSocketListenerMap['close']): void | Promise<void>
    on(event: 'error', listener: ITwoWayWebSocketListenerMap['error']): void | Promise<void>
    on(event: 'message', listener: ITwoWayWebSocketListenerMap['message']): void | Promise<void>
    safeSend: (data: string) => void | Promise<void>
    close: (code?: number | undefined, reason?: string | undefined) => void | Promise<void>
    //dynamicProcedures: Record<string, DynamicProcedure>
    //dynamicProcedureIndex: number
    dynamicProcedure: DynamicProcedureMethod
}

export type ITwoWayWebSocketListenerMap = {
    open: (event: unknown) => void | Promise<void>
    close: () => void | Promise<void>
    error: (error: unknown) => void | Promise<void>
    message: (data: string) => void | Promise<void>
}
export type ITwoWayWebSocketEvent = keyof ITwoWayWebSocketListenerMap
export type ITwoWayWebSocketEventArgsMap = {
    [Event in ITwoWayWebSocketEvent]: [Event, ITwoWayWebSocketListenerMap[Event]]
}
export type ITwoWayWebSocketEventArgs = ITwoWayWebSocketEventArgsMap[ITwoWayWebSocketEvent]

export function ITwoWayWebSocketListenerArgsIsOpen(args: ITwoWayWebSocketEventArgs): args is ITwoWayWebSocketEventArgsMap['open'] {
    return args[0] === 'open'
}
export function ITwoWayWebSocketListenerArgsIsClose(args: ITwoWayWebSocketEventArgs): args is ITwoWayWebSocketEventArgsMap['close'] {
    return args[0] === 'close'
}
export function ITwoWayWebSocketListenerArgsIsError(args: ITwoWayWebSocketEventArgs): args is ITwoWayWebSocketEventArgsMap['error'] {
    return args[0] === 'error'
}
export function ITwoWayWebSocketListenerArgsIsMessage(args: ITwoWayWebSocketEventArgs): args is ITwoWayWebSocketEventArgsMap['message'] {
    return args[0] === 'message'
}
