import { getBlankFromArray, extendArray, countKeys, calculatePositionsFromCounts, countingSort } from '../countingSort';

describe('getBlankFromArray', () => {
    let array: number[];
    beforeEach(() => {
        array = [1, 2, 3];
    });

    it('should return a copy of the array, if inPlace === false', () => {
        const copy = getBlankFromArray(array, false);
        expect(copy).toEqual(array);
        expect(copy).not.toBe(array);
    });

    it('should return the same array, if inPlace === true', () => {
        expect(getBlankFromArray(array, true)).toBe(array);
    });
});

describe('extendArray', () => {
    let array: number[];
    beforeEach(() => {
        array = [1, 2, 3];
    });

    it('should extend an array and return its copy, if inPlace === false', () => {
        const copy = extendArray({ array, length: 5, value: 11, inPlace: false });
        expect(copy).toEqual([1, 2, 3, 11, 11]);
        expect(copy).not.toBe(array);
    });

    it('should extend an array and mutate it, if inPlace === true', () => {
        const copy = extendArray({ array, length: 5, value: 11 });
        expect(copy).toEqual([1, 2, 3, 11, 11]);
        expect(copy).toBe(array);
    });
});

describe('countKeys', () => {
    let array: [number, number][];
    beforeEach(() => {
        array = [
            [1, 1],
            [3, 3],
            [2, 2],
            [8, 8],
            [8, 10],
            [5, 5],
            [3, 33],
            [8, 88],
            [0, 111],
        ];
    });

    it('should count keys in an array', () => {
        expect(countKeys(array)).toEqual([1, 1, 1, 2, 0, 1, 0, 0, 3]);
    });
});

describe('calculatePositions', () => {
    let array: number[];
    beforeAll(() => {
        array = [1, 1, 1, 2, 0, 1, 0, 3];
    });

    it('should count for each element number of elements smaller than it is and return its copy, if inPlace === false', () => {
        const copy = calculatePositionsFromCounts(array, false);
        expect(copy).toEqual([0, 1, 2, 3, 5, 5, 6, 6, 9]);
        expect(copy).not.toBe(array);
    });

    it('should count for each element number of elements smaller than it is and and mutate the array, if inPlace === true', () => {
        const copy = calculatePositionsFromCounts(array);
        expect(copy).toEqual([0, 1, 2, 3, 5, 5, 6, 6, 9]);
        expect(copy).toBe(array);
    });
});

describe('countingSort', () => {
    let array: [number, number][];
    beforeEach(() => {
        array = [
            [1, 1],
            [3, 3],
            [2, 2],
            [8, 8],
            [10, 10],
            [5, 5],
            [3, 33],
            [8, 88],
            [0, 111],
        ];
    });

    it('should sort an array according to its keys and not mutate the original array', () => {
        const sorted = countingSort(array);
        expect(sorted).toEqual([
            [0, 111],
            [1, 1],
            [2, 2],
            [3, 3],
            [3, 33],
            [5, 5],
            [8, 8],
            [8, 88],
            [10, 10],
        ]);
        expect(sorted).not.toBe(array);
    });
});
