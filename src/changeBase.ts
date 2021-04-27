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

// TODO: Add checks:
// 1. value > base
// 2. value and base are both integers
