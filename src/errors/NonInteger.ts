export class NonIntegerError extends Error {
    constructor(...args: any[]) {
        super(...args);
        Object.setPrototypeOf(this, NonIntegerError.prototype);
    }
}
