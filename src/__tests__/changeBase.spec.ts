import { changeBase } from '../changeBase';

describe('changeBase', () => {
    it('should change base of an integer', () => {
        expect(changeBase(1000, 5)).toEqual([0, 0, 0, 3, 1]);
        expect(changeBase(4567, 5)).toEqual([2, 3, 2, 1, 2, 1]);
        expect(changeBase(255, 7)).toEqual([3, 1, 5]);
        expect(changeBase(255, 2)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
        expect(changeBase(8, 2)).toEqual([0, 0, 0, 1]);
        expect(changeBase(11, 2)).toEqual([1, 1, 0, 1]);
        expect(changeBase(21345, 2)).toEqual([1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1]);
        expect(changeBase(30, 36)).toEqual([30]);
    });
});
