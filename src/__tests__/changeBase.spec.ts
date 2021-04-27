import { changeBase, changeBaseSafe } from '../changeBase';
import { NonIntegerError } from '../errors/NonInteger';

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

describe('changeBaseSafe', () => {
    const changeBaseResult = [111];
    let changeBaseFn: (v: number, b: number) => number[];
    beforeEach(() => {
        changeBaseFn = jest.fn(() => changeBaseResult);
    });

    it('should call changeBaseFn, if both value and base are integers, and return its result', () => {
        const args = [10, 2];
        const res = changeBaseSafe(args[0], args[1], changeBaseFn);
        expect(changeBaseFn).toHaveBeenCalledWith(args[0], args[1]);
        expect(res).toBe(changeBaseResult);
    });

    it('should throw a NonIntegerError, if value is not an integer', () => {
        expect(() => changeBaseSafe(10.1, 3)).toThrow(NonIntegerError);
    });

    it('should throw a NonIntegerError, if base is not an integer', () => {
        expect(() => changeBaseSafe(10, 3.1)).toThrow(NonIntegerError);
    });

    it('should throw a NonIntegerError, if value and base are not integers', () => {
        expect(() => changeBaseSafe(10.1, 3.1)).toThrow(NonIntegerError);
    });
});
