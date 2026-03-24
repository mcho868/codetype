import type { VisualizerStep } from './types';

export function selectionSortSteps(arr: number[]): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    highlights: {},
    explanation: `Starting selection sort. Each pass finds the minimum in the unsorted portion and swaps it into place.`,
  });

  for (let i = 0; i < a.length - 1; i++) {
    let minIdx = i;

    // Mark sorted prefix + current position
    const sortedHighlights: VisualizerStep['highlights'] = {};
    for (let k = 0; k < i; k++) sortedHighlights[k] = 'sorted';
    sortedHighlights[i] = 'pivot';

    steps.push({
      array: [...a],
      highlights: sortedHighlights,
      explanation: `Pass ${i + 1}: Looking for the minimum in positions ${i}–${a.length - 1}. Current minimum: ${a[minIdx]} at index ${minIdx}.`,
    });

    for (let j = i + 1; j < a.length; j++) {
      const h: VisualizerStep['highlights'] = {};
      for (let k = 0; k < i; k++) h[k] = 'sorted';
      h[minIdx] = 'pivot';
      h[j] = 'comparing';

      steps.push({
        array: [...a],
        highlights: h,
        explanation: `Comparing ${a[j]} (index ${j}) with current minimum ${a[minIdx]} (index ${minIdx}). ${a[j] < a[minIdx] ? `${a[j]} is smaller — new minimum!` : `${a[minIdx]} stays as minimum.`}`,
      });

      if (a[j] < a[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      const beforeSwap: VisualizerStep['highlights'] = {};
      for (let k = 0; k < i; k++) beforeSwap[k] = 'sorted';
      beforeSwap[i] = 'comparing';
      beforeSwap[minIdx] = 'pivot';

      steps.push({
        array: [...a],
        highlights: beforeSwap,
        explanation: `Swapping ${a[i]} (index ${i}) with minimum ${a[minIdx]} (index ${minIdx}).`,
      });

      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }

    const afterSwap: VisualizerStep['highlights'] = {};
    for (let k = 0; k <= i; k++) afterSwap[k] = 'sorted';

    steps.push({
      array: [...a],
      highlights: afterSwap,
      explanation: `${a[i]} is now in its correct position. Sorted portion: [${a.slice(0, i + 1).join(', ')}].`,
    });
  }

  const allSorted: VisualizerStep['highlights'] = {};
  for (let k = 0; k < a.length; k++) allSorted[k] = 'sorted';

  steps.push({
    array: [...a],
    highlights: allSorted,
    explanation: `Done! Array is fully sorted: [${a.join(', ')}]. Used exactly ${a.length - 1} swaps.`,
  });

  return steps;
}
