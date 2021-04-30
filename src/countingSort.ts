import { CountingElement, ExtendArrayParameters } from './types';
import { pipe, sum } from 'ramda';

export const getBlankFromArray = <T>(array: T[], inPlace: boolean): T[] => (inPlace ? array : [...array]);

export const extendArray = <T>({ array, length, value, inPlace = true }: ExtendArrayParameters<T>): T[] => {
    const result = getBlankFromArray(array, inPlace);
    while (result.length < length) {
        result.push(value);
    }
    return result;
};

export const countKeys = <T, K>(getKey: (k: K) => number) => (array: [K, T][]): number[] => {
    const counts: number[] = [];
    for (const [key] of array) {
        const numericKey = getKey(key);
        if (counts[numericKey] === undefined) {
            extendArray<number>({ array: counts, length: numericKey + 1, value: 0 });
        }
        ++counts[numericKey];
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

export const createCalculatePositions = <T, K>(getKey: (k: K) => number): ((a: [K, T][]) => number[]) =>
    pipe<[K, T][], number[], number[]>(countKeys<T, K>(getKey), calculatePositionsFromCounts);

export const countingSort = <T, K = number>(array: [K, T][], getKey: (k: K) => number): CountingElement<T>[] => {
    const calculatePositions = createCalculatePositions(getKey);
    const positions = calculatePositions(array);

    const sorted: CountingElement<T>[] = [];
    for (const [key, value] of array) {
        const numericKey = getKey(key);
        if (sorted[positions[numericKey]] === undefined) {
            extendArray({ array: sorted, length: positions[numericKey] + 1, value: null });
        }
        sorted[positions[numericKey]] = [numericKey, value];
        ++positions[numericKey];
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
