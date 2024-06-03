
import { intToBase32 } from './base64UrlEncode.js'
import {
    $dynamicProcedureRef,
    DynamicProcedure, DynamicProcedureName, DynamicProcedureReference, TwoWayData, TwoWayFunction,
    TwoWayFunctionLowConstraint, TwoWayFunctionGeneric
} from './types.fullDynamicProcedures.js'
import { DynamicProcedureMethod, FunctionFromDynamicProcedureArgs, ITwoWayWebSocket } from './ITwoWayWebSocket.fullDynamicProcedures.js'

export const dynamicProcedureString ='__2WAY_DYNAMIC_PROCEDURE__'

export function makeDynamicProcedureReference<N extends number>(
    index: N
): DynamicProcedureReference<DynamicProcedureName> {
    const s = dynamicProcedureString + intToBase32(index) as `${typeof dynamicProcedureString}${DynamicProcedureName}` // eslint-disable-line no-type-assertion/no-type-assertion
    return s
}

export type dynamicProcedureArgs<F extends TwoWayFunctionLowConstraint>
= [name: DynamicProcedureName, function: F] | [function: F]

export abstract class WebSocketBase {

    dynamicProcedures: Record<string, DynamicProcedure> = {}
    dynamicProcedureIndex = 0
    
    // constructor() {
        
    // }

    dynamicProcedure: DynamicProcedureMethod = function DynamicProcedureMethod<
        //F extends CrosstalkFunctionBasicConstraint,
        //A extends dynamicProcedureArgs<TwoWayFunctionBasicConstraint>
        F extends TwoWayFunctionLowConstraint
    >(
        this: WebSocketBase & ITwoWayWebSocket,
        f: TwoWayFunction<F>
    ): DynamicProcedure<F> {
        //type F = FunctionFromDynamicProcedureArgs<A>
        //let name: DynamicProcedureName | '' = ''
        //let func: F
        // if (args.length === 2) {
        //     name = args[0]
        //     func = args[1] as F
        // } else {
        //     func = args[0] as F
        // }
        
        const id = ++this.dynamicProcedureIndex
    
        const ref = makeDynamicProcedureReference<typeof id>(id)
    
        const df = ((...args: never[]) => f.call(this, ...args)) as DynamicProcedure<F> // eslint-disable-line no-type-assertion/no-type-assertion
        df[$dynamicProcedureRef] = ref

        //func
        this.dynamicProcedures[String(id)] = df
    
        return df
    }
    
    // need to listen for dynamic calls
    
}

// const cws = new WebSocketBase
// cws.dynamicProcedure((a: number) => 'foo')