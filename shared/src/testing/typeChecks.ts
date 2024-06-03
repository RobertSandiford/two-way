

// import { JsonValue, BaseFunction, AnyFunction } from 'sxy-types'
// import { JsonableFunctions, JsonableFunctionWithArgs, JsonableFunctionsBasicConstraint, MootJsonableFunctionObject } from './types.js'


// // trial func to register a procedure
// // seems to work OK
// function registerProcedure<Args extends JsonValue[]>(_: JsonableFunctionWithArgs<Args>) { }
// registerProcedure( (foo: string) => null )
// // @ts-expect-error
// registerProcedure( (date: Date) => null )
// registerProcedure( (foo: string): void => {} )




// function registerObject<Fs extends JsonableFunctionsBasicConstraint>(fs: JsonableFunctions<Fs>) {}

// const fs1 = {
//     string: (foo: string) => null
// }
// registerObject(fs1)
// const fs2 = {
//     string: (foo: string): never => { throw new Error },
// }
// const fs3 = {
//     string: (foo: string) => new Date,
// }
// const fs4 = {
//     string: (foo: string) => null,
//     date: (date: Date) => null
// }
// const fs5 = {
//     string: (foo: string) => null,
//     sub: {
//         string: (foo: string) => null
//     }
// }
// // @ts-expect-error
// registerObject(fs2)
// // @ts-expect-error
// registerObject(fs3)
// // @ts-expect-error
// registerObject(fs4)
// registerObject(fs5)
// registerObject({
//     string: (foo: string) => null,
//     sub: {
//         string: (foo: string) => null
//     },
//     nothing: (n: number): void => {}
// })



// function registerLoose<Fs extends JsonableFunctionsBasicConstraint>(fs: MootJsonableFunctionObject<Fs>) {}

// const mootProcedures = {
//     f(foo: string): void {}
// }

// registerLoose(mootProcedures)
// registerLoose({
//     f: (foo: string): never => {
//         throw new Error
//     },
//     g: (): void => {
//         //
//     },
//     h: (): undefined => {
//         //
//     },
//     // @ts-expect-error
//     i: () => true,
// })


