import { createSplitKey, getBase, createPrepareRadixData, radixSort } from '../radixSort';

describe('getBase', () => {
    it('should return length of an array', () => {
        expect(getBase([1, 2, 3])).toBe(3);
    });
});

describe('createSplitKey', () => {
    it('should return a function that would split keys in an array', () => {
        const changeBase = jest.fn((k, b) => [k * b]);
        const splitKey = createSplitKey(3, changeBase);
        expect(
            splitKey([
                [1, 0],
                [2, 0],
                [3, 0],
            ]),
        ).toEqual([
            [[3], 0],
            [[6], 0],
            [[9], 0],
        ]);
    });
});

describe('createPrepareRadixData', () => {
    it('should return a function that will prepare data for the radix sort from an array', () => {
        const prepareRadixData = createPrepareRadixData<number>(12);
        expect(
            prepareRadixData([
                [12413, 543],
                [876, 98],
                [5678, 789],
            ]),
        ).toEqual({
            array: [
                [[5, 2, 2, 7], 543],
                [[0, 1, 6], 98],
                [[2, 5, 3, 3], 789],
            ],
            iterCount: 4,
        });
    });
});

describe('radixSort', () => {
    it('should sort and array', () => {
        expect(
            radixSort<number>([
                [12413, 543],
                [876, 98],
                [876, 99],
                [5678, 789],
            ]),
        ).toEqual([
            [[0, 3, 2, 1, 3], 98],
            [[0, 3, 2, 1, 3], 99],
            [[2, 3, 2, 0, 2, 1, 1], 789],
            [[1, 3, 3, 1, 0, 0, 3], 543],
        ]);
    });
});
