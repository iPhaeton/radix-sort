export const changeBase = (value: number, base: number): string => {
    let currentValue = value;
    let result = '';
    let exp = 0;

    let remainder = currentValue % Math.pow(base, exp + 1);
    while (remainder !== 0) {
        result += `${remainder / Math.pow(base, exp)}`;

        exp += 1;
        currentValue -= remainder;
        remainder = currentValue % Math.pow(base, exp + 1);
    }

    return result;
};

console.log(changeBase(255, 7));
