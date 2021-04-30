import { map, transduce } from 'ramda';
import { changeBase } from './changeBase';
import { countingSort } from './countingSort';
import { CountingElement, RadixData, RadixElement } from './types';

export const getBase = (array: any[]): number => array.length;

export const createSplitKey = <T>(
    base: number,
    changeBaseFn = changeBase,
): ((a: CountingElement<T>[]) => RadixElement<T>[]) =>
    map(([key, value]: CountingElement<T>) => [changeBaseFn(key, base), value]);

export const radixDataAccFn = <T>(res: RadixData<T>, element: RadixElement<T>): RadixData<T> => {
    res.array.push(element);
    if (element[0].length > res.iterCount) {
        res.iterCount = element[0].length;
    }
    return res;
};

export const createPrepareRadixData = <T>(base: number): ((a: CountingElement<T>[]) => RadixData<T>) =>
    transduce<CountingElement<T>, RadixElement<T>, RadixData<T>>(
        // prettier-ignore
        createSplitKey(base),
        radixDataAccFn,
        { array: [], iterCount: 0 },
    );

export const radixSort = <T>(array: CountingElement<T>[]): RadixElement<T>[] => {
    const prepareRadixData = createPrepareRadixData<T>(array.length);
    const radixData = prepareRadixData(array);
    let radixArray = radixData.array;
    const iterCount = radixData.iterCount;

    for (let i = 0; i < iterCount; i++) {
        const getKey = (key: number[]) => key[i] || 0;
        radixArray = countingSort(radixArray, getKey);
    }

    return radixArray;
};
