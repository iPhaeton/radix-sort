declare module 'ramda-typed' {
    module 'ramda' {
        /**
         * Initializes a transducer using supplied iterator function. Returns a single item by iterating through the
         * list, successively calling the transformed iterator function and passing it an accumulator value and the
         * current value from the array, and then passing the result to the next call.
         */
        export function transduce<T, R, U>(xf: (arg: T[]) => R[], fn: (acc: U, val: R) => U, acc: U, list: T[]): U;
        export function transduce<T, R, U>(xf: (arg: T[]) => R[]): (fn: (acc: U, val: R) => U, acc: U, list: T[]) => U;
        export function transduce<T, R, U>(xf: (arg: T[]) => R[], fn: (acc: U, val: R) => U): (acc: U, list: T[]) => U;
        export function transduce<T, R, U>(xf: (arg: []) => R[], fn: (acc: U, val: R) => U, acc: U): (list: T[]) => U;
    }
}
