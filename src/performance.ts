import { radixSort } from './radixSort';

const generateRadixArray = (count: number): [number, number][] => {
    const array: [number, number][] = [];
    for (let i = 0; i < count; i++) {
        array.push([Math.round(Math.random() * 1000000), Math.round(Math.random() * 1000000)]);
    }
    return array;
};

const convertRadixArrayToArray = (radixArray: [number, number][]): number[] => radixArray.map((el) => el[0]);

const radixArray1 = generateRadixArray(1000000);
console.log('Genrated radix array');
const array1 = convertRadixArrayToArray(radixArray1);
console.log('Genrated array');

const start2 = Date.now();
array1.sort();
console.log(`merge in ${Date.now() - start2} ms`);

const start1 = Date.now();
radixSort<number>(radixArray1);
console.log(`radix in ${Date.now() - start1} ms`);
