import type { VisualizerStep } from './types';

export function insertionSortSteps(arr: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    highlights: {},
    explanation: `Starting insertion sort. We build a sorted portion from left to right, inserting each new element into its correct position.`,
  });

  for (let i = 1; i < a.length; i++) {
    const key = a[i];

    const pickH: VisualizerStep['highlights'] = {};
    for (let k = 0; k < i; k++) pickH[k] = 'sorted';
    pickH[i] = 'comparing';

    steps.push({
      array: [...a],
      highlights: pickH,
      explanation: `Picking up ${key} (index ${i}) to insert into the sorted portion [${a.slice(0, i).join(', ')}].`,
    });

    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      const shiftH: VisualizerStep['highlights'] = {};
      for (let k = 0; k < i; k++) shiftH[k] = 'sorted';
      shiftH[j] = 'pivot';
      shiftH[j + 1] = 'comparing';

      steps.push({
        array: [...a],
        highlights: shiftH,
        explanation: `${a[j]} > ${key} — shift ${a[j]} one position right to make room.`,
      });

      a[j + 1] = a[j];
      j--;

      const afterShiftH: VisualizerStep['highlights'] = {};
      for (let k = 0; k <= i; k++) afterShiftH[k] = 'sorted';
      if (j >= 0) afterShiftH[j + 1] = 'comparing';

      steps.push({
        array: [...a],
        highlights: afterShiftH,
        explanation: `Shifted. Gap is now at index ${j + 1}.`,
      });
    }

    a[j + 1] = key;

    const insertH: VisualizerStep['highlights'] = {};
    for (let k = 0; k <= i; k++) insertH[k] = 'sorted';
    insertH[j + 1] = 'found';

    steps.push({
      array: [...a],
      highlights: insertH,
      explanation: `Inserted ${key} at index ${j + 1}. Sorted portion is now [${a.slice(0, i + 1).join(', ')}].`,
    });
  }

  const allSorted: VisualizerStep['highlights'] = {};
  for (let k = 0; k < a.length; k++) allSorted[k] = 'sorted';

  steps.push({
    array: [...a],
    highlights: allSorted,
    explanation: `Done! Fully sorted: [${a.join(', ')}]. Insertion sort is O(n²) worst case but O(n) on nearly-sorted data.`,
  });

  return steps;
}
