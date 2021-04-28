import { TraceParameters } from './types';

export const isInteger = (value: number): boolean => value % 1 === 0;

export const trace = ({ prefix = '' }: TraceParameters) => (value: any): void => {
    console.log(prefix, value);
    return value;
};
