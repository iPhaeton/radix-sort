import { NonIntegerError } from './errors/NonInteger';
import { isInteger } from './utils';

export const changeBase = (value: number, base: number): number[] => {
    let currentValue = value;
    const result = [];
    let exp = 0;

    let remainder = currentValue % Math.pow(base, exp + 1);
    while (remainder !== currentValue) {
        result.push(remainder / Math.pow(base, exp));

        exp += 1;
        currentValue -= remainder;
        remainder = currentValue % Math.pow(base, exp + 1);
    }
    result.push(remainder / Math.pow(base, exp));
    return result;
};

export const changeBaseSafe = (
    value: number,
    base: number,
    changeBaseFn: (v: number, b: number) => number[] = changeBase,
): number[] => {
    if (!isInteger(value) || !isInteger(base)) {
        throw new NonIntegerError('Both value and base should be integers');
    }

    return changeBaseFn(value, base);
};
