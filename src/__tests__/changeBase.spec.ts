import { changeBase } from '../changeBase';

describe('changeBase', () => {
    it('should change base of an integer', () => {
        expect(changeBase(1000, 5)).toBe('13000');
        expect(changeBase(4567, 5)).toBe('121232');
        expect(changeBase(255, 7)).toBe('513');
        expect(changeBase(255, 2)).toBe('11111111');
        expect(changeBase(8, 2)).toBe('1000');
        expect(changeBase(11, 2)).toBe('1011');
        expect(changeBase(21345, 2)).toBe('101001101100001');
    });
});
