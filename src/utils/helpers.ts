import { ValueItemType } from '../types';

/**
 * Checks if two arrays are identical in length and content.
 *
 * @param array1 - The first array to compare. It can be of type `[]` or `ValueItemType[]`.
 * @param array2 - The second array to compare. It can be of type `[]` or `ValueItemType[]`.
 *
 * @returns `true` if both arrays have the same length and identical content, `false` otherwise.
 */

function isMatched(array1: [] | ValueItemType[], array2: [] | ValueItemType[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Finds the first occurrence of a specific value in an array.
 *
 * @param value - The value to search for in the array.
 * @param array - The array to search within.
 *
 * @returns The first occurrence of the value in the array, or `null` if the value is not found.
 */

function valueInArray(value: any, array: any[], defaultValue: any = null) {
  return array.includes(value) ? value : defaultValue;
}

function valueInArrayObjectOfNames(value: any, array: ValueItemType[], defaultValue: any = null) {
  const result = array.find((item) => item.name.toLowerCase() === value?.toLowerCase());
  return result ? result.name : defaultValue;
}

function normalize(value: any): string | null {
  if (typeof value === 'string') {
    // Trim extra spaces and convert to lowercase
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
  }
  return null;
}

export { isMatched, valueInArray, valueInArrayObjectOfNames, normalize };
