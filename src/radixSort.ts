import { map, transduce } from 'ramda';
import { changeBase } from './changeBase';

export const getBase = (array: any[]): number => array.length;

// export const getMax = (res: number, current: [number, any]) => (current[0] > res ? current[0] : res);

// const getMax = reduce((res: number, current: [number, any]) => (current[0] > res ? current[0] : res), 0);

interface PreparedArray<T> {
    array: [number[], T][];
    iterCount: number;
}

const createSplitKey = <T>(base: number): ((a: [number, T][]) => [number[], T][]) =>
    map(([key, value]: [number, T]) => [changeBase(key, base), value]);

const accFn = <T>(res: PreparedArray<T>, element: [number[], T]): PreparedArray<T> => {
    res.array.push(element);
    if (element[0].length > res.iterCount) {
        res.iterCount = element[0].length;
    }
    return res;
};

const createPrepareArray = <T>(base: number) =>
    transduce<[number, T], [number[], T], PreparedArray<T>>(
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
