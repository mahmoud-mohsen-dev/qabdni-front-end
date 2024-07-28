import { positionType } from '../store/positionsReducer';

function isMatched(array1: [] | positionType[], array2: [] | positionType[]) {
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

export { isMatched };
