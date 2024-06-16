// /* eslint-disable max-len */

// import { describe } from 'sxy-test-runner'
// import { expect } from 'chai'

// import { insertDynamicProcedures } from './insertDynamicProcedures.js'
// import { CrosstalkData } from './types.js'

// describe('insertDynamicProcedures()', ({ it }) => {

//     // it('dummy test to check basics', () => {
//     //     const jsonString = '{ "foo": "bar", "baz": "__TWO_WAY_DYNAMIC_PROCEDURE__1", "bim": "__TWO_WAY_DYNAMIC_PROCEDURE__2" }'
//     //     const result = insertDynamicProcedures(jsonString)
//     //     expect(result).to.equal('{ "foo": "bar", "baz": "DP1", "bim": "DP2" }')
//     // })

//     it('dummy test to check basics', () => {
//         const callResult: CrosstalkData = {
//             foo: 'FOO',
//             dynProc: dynamicProcedure(() => 'BAR')
//         }
//         console.log('callResult', callResult)

        
//         const jsonString = JSON.stringify(callResult)
//         console.log('jsonString', jsonString)

//         //const jsonString = '{ "foo": "bar", "baz": "__TWO_WAY_DYNAMIC_PROCEDURE__1", "bim": "__TWO_WAY_DYNAMIC_PROCEDURE__2" }'
//         const result = insertDynamicProcedures(jsonString)
//         expect(result).to.equal('{ "foo": "bar", "baz": "DP1", "bim": "DP2" }')
//     })

// })