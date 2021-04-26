export const changeBase = (value: number, base: number): string => {
    let currentValue = value;
    let result = '';
    let exp = 0;

    let remainder = currentValue % Math.pow(base, exp + 1);
    while (remainder !== currentValue) {
        result += `${remainder / Math.pow(base, exp)}`;

        exp += 1;
        currentValue -= remainder;
        remainder = currentValue % Math.pow(base, exp + 1);
    }
    result += `${remainder / Math.pow(base, exp)}`;

    return result.split('').reverse().join('');
};

// TODO: Add checks:
// 1. value > base
// 2. value and base are both integers
