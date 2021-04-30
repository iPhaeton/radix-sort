import { map, transduce } from 'ramda';
import { changeBase } from './changeBase';
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

const ppp = createPrepareRadixData<number>(12);
ppp([
    [12413, 543],
    [876, 98],
    [5678, 789],
]);

console.log(
    createPrepareRadixData<number>(12)([
        [12413, 543],
        [876, 98],
        [5678, 789],
    ]).array,
);

// export const radixSort = <T>(array: [number, T][]): [number, T][] => {
//     const base = getBase(array);
//     const max = getMax(array);
// };
