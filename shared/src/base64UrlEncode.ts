
// convert a number into a base 32 number using digits 0-v, returned as a string
export function intToBase32(n: number): string {
    if (!Number.isInteger(n)) {
        throw new Error(`intToBase32() error - input number must be an integer, received "${typeof n}, "${n}"`)
    }
    return n.toString(32)
}
export function bigIntToBase32(b: bigint): string {
    return b.toString(32)
}

export function base32ToInt(s: string): number {
    if (s.includes('.')) {
        throw new Error(
            `base32ToInt() error - input string should be a representation of an integer,
            found a decimal point in "${s}"`
        )
    }
    return parseInt(s, 32)
}
export function base32ToBigInt(s: string): bigint {
    return BigInt(parseInt(s, 32))
}
// export function numToRef(n: number): string {
//     return n.toString(32)

// }

// export function refToNum(s: string): number {
//     return parseInt(s, 36) // 12345
// }

//export return randomBytes(18).toString('base64').replace(/\//g,'_').replace(/\+/g,'-')