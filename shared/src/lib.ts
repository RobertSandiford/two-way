
export function log(...args: readonly unknown[]) {
    console.log(...args)
}
export function warn(...args: readonly unknown[]) {
    console.log('Warn:', ...args)
}
export function errorLog(...args: readonly unknown[]) {
    console.log('Error:', ...args)
}

export function getTime() { return (new Date).getTime() }
