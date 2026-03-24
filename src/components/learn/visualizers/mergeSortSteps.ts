import type { VisualizerStep } from './types';

export function mergeSortSteps(arr: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    highlights: {},
    explanation: `Starting merge sort. Divide the array in half recursively, then merge the sorted halves back together.`,
  });

  function merge(working: number[], left: number, mid: number, right: number) {
    const leftArr = working.slice(left, mid + 1);
    const rightArr = working.slice(mid + 1, right + 1);

    // Show the two halves about to be merged
    const splitH: VisualizerStep['highlights'] = {};
    for (let k = left; k <= mid; k++) splitH[k] = 'subarray-left';
    for (let k = mid + 1; k <= right; k++) splitH[k] = 'subarray-right';

    steps.push({
      array: [...working],
      highlights: splitH,
      explanation: `Merging [${leftArr.join(', ')}] (blue) and [${rightArr.join(', ')}] (amber) into one sorted subarray.`,
    });

    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      const pickLeft = leftArr[i] <= rightArr[j];

      const compareH: VisualizerStep['highlights'] = {};
      for (let x = left; x < k; x++) compareH[x] = 'sorted';
      compareH[left + i] = 'comparing';
      compareH[mid + 1 + j] = 'comparing';

      steps.push({
        array: [...working],
        highlights: compareH,
        explanation: `Comparing ${leftArr[i]} and ${rightArr[j]}. Pick ${pickLeft ? leftArr[i] : rightArr[j]} (smaller).`,
      });

      if (pickLeft) {
        working[k++] = leftArr[i++];
      } else {
        working[k++] = rightArr[j++];
      }

      const afterH: VisualizerStep['highlights'] = {};
      for (let x = left; x < k; x++) afterH[x] = 'sorted';
      for (let x = left + i; x <= mid; x++) afterH[x] = 'subarray-left';
      for (let x = mid + 1 + j; x <= right; x++) afterH[x] = 'subarray-right';

      steps.push({
        array: [...working],
        highlights: afterH,
        explanation: `Placed ${working[k - 1]} at index ${k - 1}.`,
      });
    }

    // Remaining elements
    while (i < leftArr.length) {
      working[k++] = leftArr[i++];
    }
    while (j < rightArr.length) {
      working[k++] = rightArr[j++];
    }

    const doneH: VisualizerStep['highlights'] = {};
    for (let x = left; x <= right; x++) doneH[x] = 'sorted';

    steps.push({
      array: [...working],
      highlights: doneH,
      explanation: `Merged subarray at [${left}…${right}]: [${working.slice(left, right + 1).join(', ')}].`,
    });
  }

  function mergeSort(working: number[], left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    const divH: VisualizerStep['highlights'] = {};
    for (let k = left; k <= mid; k++) divH[k] = 'subarray-left';
    for (let k = mid + 1; k <= right; k++) divH[k] = 'subarray-right';

    steps.push({
      array: [...working],
      highlights: divH,
      explanation: `Dividing [${left}…${right}] → left half [${left}…${mid}] and right half [${mid + 1}…${right}].`,
    });

    mergeSort(working, left, mid);
    mergeSort(working, mid + 1, right);
    merge(working, left, mid, right);
  }

  mergeSort(a, 0, a.length - 1);

  const allSorted: VisualizerStep['highlights'] = {};
  for (let k = 0; k < a.length; k++) allSorted[k] = 'sorted';

  steps.push({
    array: [...a],
    highlights: allSorted,
    explanation: `Done! Fully sorted: [${a.join(', ')}]. Merge sort is O(n log n) in all cases.`,
  });

  return steps;
}
