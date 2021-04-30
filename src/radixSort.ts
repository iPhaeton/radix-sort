import { map, transduce } from 'ramda';
import { changeBase } from './changeBase';
import { CountingElement, RadixData, RadixElement } from './types';

export const getBase = (array: any[]): number => array.length;

const createSplitKey = <T>(base: number): ((a: CountingElement<T>[]) => RadixElement<T>[]) =>
    map(([key, value]: CountingElement<T>) => [changeBase(key, base), value]);

const accFn = <T>(res: RadixData<T>, element: RadixElement<T>): RadixData<T> => {
    res.array.push(element);
    if (element[0].length > res.iterCount) {
        res.iterCount = element[0].length;
    }
    return res;
};

const createPrepareArray = <T>(base: number) =>
    transduce<CountingElement<T>, RadixElement<T>, RadixData<T>>(
        // prettier-ignore
        createSplitKey(base),
        accFn,
        { array: [], iterCount: 0 },
    );

console.log(
    createPrepareArray<number>(3)([
        [12413, 543],
        [876, 98],
        [5678, 789],
    ]).array,
);

// export const radixSort = <T>(array: [number, T][]): [number, T][] => {
//     const base = getBase(array);
//     const max = getMax(array);
// };
