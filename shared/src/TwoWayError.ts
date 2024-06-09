
export class TwoWayError extends Error {
    name = "TwoWay Error" as const
}

export function IsTwoWayError(u: unknown): u is TwoWayError {
    return u instanceof TwoWayError
}