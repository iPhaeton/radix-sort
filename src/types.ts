export interface ExtendArrayParameters<T> {
    array: T[];
    length: number;
    value: T;
    inPlace?: boolean;
}

export interface TraceParameters {
    prefix?: string;
}

export interface RadixData<T> {
    array: [number[], T][];
    iterCount: number;
}

export type CountingElement<T> = [number, T];
export type RadixElement<T> = [number[], T];
