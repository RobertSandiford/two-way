
export type StringWithDynamicProcedures = string & { type: 'StringWithDynamicProcedures' }
export function insertDynamicProcedures(jsonString: string): StringWithDynamicProcedures {
    let outString = ''
    let stringPos = 0
    //console.log('jsonString', jsonString)
    const dynProcRegex = /"__2WAY_DYNAMIC_PROCEDURE__([0-9]+)"/g
    // for (const match of jsonString.matchAll(dynProcRegex)) {
    //     console.log('match', match)
    //     const { index } = match
    //     const len = match[0].length
    //     const dynProcId = match[1]!
    // }
    let match
    while (match = dynProcRegex.exec(jsonString)) { // eslint-disable-line no-cond-assign
        console.log(match)
        const { index } = match
        console.log('index', index)
        const lastIndex = dynProcRegex.lastIndex
        console.log('lastIndexOf', lastIndex)
        console.log(jsonString.substring(index, lastIndex))

        const dynProcId = match[1]!

        outString += jsonString.substring(stringPos, index) + '"DP' + String(dynProcId) + '"'
        console.log('outString', outString)
        stringPos = lastIndex
    }
    match
    outString += jsonString.substring(stringPos)
    console.log('outString', outString)
    return outString as StringWithDynamicProcedures  // eslint-disable-line no-type-assertion/no-type-assertion
}