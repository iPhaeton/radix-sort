export interface ExtendArrayParameters<T> {
    array: T[];
    length: number;
    value: T;
    inPlace?: boolean;
}

export interface TraceParameters {
    prefix?: string;
}
