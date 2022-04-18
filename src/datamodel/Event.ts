export interface Event {
    name: string
    once: boolean = false
    execute: (...args) => void
}