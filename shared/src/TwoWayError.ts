
export class TwoWayError extends Error {
    name = "TwoWay Error"
}

export function IsTwoWayError(u: unknown): u is TwoWayError {
    return u instanceof TwoWayError
}