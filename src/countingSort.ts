import { ExtendArrayParameters } from './types';
import { pipe, sum } from 'ramda';

export const getBlankFromArray = <T>(array: T[], inPlace: boolean): T[] => (inPlace ? array : [...array]);

export const extendArray = <T>({ array, length, value, inPlace = true }: ExtendArrayParameters<T>): T[] => {
    const result = getBlankFromArray(array, inPlace);
    while (result.length < length) {
        result.push(value);
    }
    return result;
};

export const countKeys = <T>(array: [number, T][]): number[] => {
    const counts: number[] = [];
    for (const [key] of array) {
        if (counts[key] === undefined) {
            extendArray<number>({ array: counts, length: key + 1, value: 0 });
        }
        ++counts[key];
    }
    return counts;
};

export const calculatePositionsFromCounts = (counts: number[], inPlace = true): number[] => {
    const result = getBlankFromArray(counts, inPlace);
    result.push(sum(counts));
    for (let key = result.length - 2; key >= 0; key--) {
        result[key] = result[key + 1] - result[key];
    }
    return result;
};

export const calculatePositions = pipe<[number, any][], number[], number[]>(countKeys, calculatePositionsFromCounts);

export const countingSort = <T>(array: [number, T][]): [number, T][] => {
    const positions = calculatePositions(array);

    const sorted: [number, T][] = [];
    for (const [key, value] of array) {
        if (sorted[positions[key]] === undefined) {
            extendArray({ array: sorted, length: positions[key] + 1, value: null });
        }
        sorted[positions[key]] = [key, value];
        ++positions[key];
    }
    return sorted;
};

// console.log(
//     countingSort([
//         [1, 1],
//         [3, 3],
//         [2, 2],
//         [8, 8],
//         [10, 10],
//         [5, 5],
//         [3, 33],
//         [8, 88],
//         [0, 111],
//     ]),
// );
