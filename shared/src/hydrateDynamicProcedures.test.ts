// // /* eslint-disable max-len */

// import { describe } from 'sxy-test-runner'
// import { expect } from 'chai'

// import { hydrateDynamicProcedures } from './hydateDynamicProcedures.js'
// import { CrosstalkDataWithDynamicProceduresIn } from './types.js'
// import { CrosstalkWebSocket } from './CrosstalkWebSocket.js'
// import { ServerWebSocket } from './ServerWebSocket.js'
// import { MockWebSocket } from './testing/MockWebSocket.js'

// describe('insertDynamicProcedures()', ({ it }) => {

// //     // it('dummy test to check basics', () => {
// //     //     const jsonString = '{ "foo": "bar", "baz": "__2WAY_DYNAMIC_PROCEDURE__1", "bim": "__2WAY_DYNAMIC_PROCEDURE__2" }'
// //     //     const result = insertDynamicProcedures(jsonString)
// //     //     expect(result).to.equal('{ "foo": "bar", "baz": "DP1", "bim": "DP2" }')
// //     // })

//     it('converts dynamic procedure references to functions', () => {

//         const callResult: CrosstalkDataWithDynamicProceduresIn = {
//             a :  "__2WAY_DYNAMIC_PROCEDURE__1",
//             b : "__2WAY_DYNAMIC_PROCEDURE__2"
//         }
//         console.log('callResult', structuredClone(callResult))

//         const socket = new MockWebSocket()

//         //const jsonString = '{ "foo": "bar", "baz": "__2WAY_DYNAMIC_PROCEDURE__1", "bim": "__2WAY_DYNAMIC_PROCEDURE__2" }'
//         const hydratedResult = hydrateDynamicProcedures(socket, callResult)
//         console.log('hydratedResult', hydratedResult)
//         //expect(hydratedResult).to.equal('{ "foo": "bar", "baz": "DP1", "bim": "DP2" }')
//     })

// })