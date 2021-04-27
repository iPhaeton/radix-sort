import { isInteger } from '../utils';

describe('isInteger', () => {
    it('should return true, if the parameter is a positive integer', () => {
        expect(isInteger(3)).toBe(true);
    });

    it('should return true, if the parameter is a negative integer', () => {
        expect(isInteger(-4)).toBe(true);
    });

    it('should return true, if the parameter is 0', () => {
        expect(isInteger(-4)).toBe(true);
    });

    it('should return true, if the parameter is not an integer', () => {
        expect(isInteger(3.1)).toBe(false);
    });
});
