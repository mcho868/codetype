import type { VisualizerStep } from './types';

export function bubbleSortSteps(arr: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const a = [...arr];
  let totalSwaps = 0;

  steps.push({
    array: [...a],
    highlights: {},
    explanation: `Starting bubble sort. Adjacent pairs are compared and swapped if out of order. Large values "bubble" to the end.`,
  });

  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < a.length - i - 1; j++) {
      const h: VisualizerStep['highlights'] = {};
      for (let k = a.length - i; k < a.length; k++) h[k] = 'sorted';
      h[j] = 'comparing';
      h[j + 1] = 'comparing';

      steps.push({
        array: [...a],
        highlights: h,
        explanation: `Comparing ${a[j]} and ${a[j + 1]}. ${a[j] > a[j + 1] ? `${a[j]} > ${a[j + 1]} — swap!` : `${a[j]} ≤ ${a[j + 1]} — no swap needed.`}`,
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        totalSwaps++;

        const afterH: VisualizerStep['highlights'] = {};
        for (let k = a.length - i; k < a.length; k++) afterH[k] = 'sorted';
        afterH[j] = 'pivot';
        afterH[j + 1] = 'pivot';

        steps.push({
          array: [...a],
          highlights: afterH,
          explanation: `Swapped → now [${a[j]}, ${a[j + 1]}]. Continuing pass ${i + 1}…`,
        });
      }
    }

    const passH: VisualizerStep['highlights'] = {};
    for (let k = a.length - i - 1; k < a.length; k++) passH[k] = 'sorted';

    steps.push({
      array: [...a],
      highlights: passH,
      explanation: `End of pass ${i + 1}. ${a[a.length - i - 1]} has bubbled to its correct position.`,
    });

    if (!swapped) {
      const doneH: VisualizerStep['highlights'] = {};
      for (let k = 0; k < a.length; k++) doneH[k] = 'sorted';
      steps.push({
        array: [...a],
        highlights: doneH,
        explanation: `No swaps in this pass — array is already sorted! Early exit after pass ${i + 1}.`,
      });
      return steps;
    }
  }

  const allSorted: VisualizerStep['highlights'] = {};
  for (let k = 0; k < a.length; k++) allSorted[k] = 'sorted';

  steps.push({
    array: [...a],
    highlights: allSorted,
    explanation: `Done! Sorted: [${a.join(', ')}]. Total swaps: ${totalSwaps}.`,
  });

  return steps;
}
