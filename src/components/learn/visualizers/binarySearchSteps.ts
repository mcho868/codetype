import type { VisualizerStep } from './types';

export function binarySearchSteps(arr: number[], target: number): VisualizerStep[] {
  const steps: VisualizerStep[] = [];
  const sorted = [...arr].sort((a, b) => a - b);

  steps.push({
    array: sorted,
    highlights: {},
    explanation: `Array is sorted. Searching for ${target}. Binary search divides the search range in half each step.`,
  });

  let low = 0;
  let high = sorted.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Highlight range + mid
    const highlights: VisualizerStep['highlights'] = {};
    for (let i = low; i <= high; i++) highlights[i] = 'subarray-left';
    highlights[mid] = 'pivot';

    steps.push({
      array: sorted,
      highlights,
      explanation: `Range [${low}…${high}]. Mid = ${mid}, value = ${sorted[mid]}. Is ${sorted[mid]} === ${target}?`,
    });

    if (sorted[mid] === target) {
      steps.push({
        array: sorted,
        highlights: { [mid]: 'found' },
        explanation: `Found ${target} at index ${mid}! Only ${steps.length - 1} comparison${steps.length === 2 ? '' : 's'} needed.`,
      });
      return steps;
    }

    if (sorted[mid] < target) {
      steps.push({
        array: sorted,
        highlights: { [mid]: 'comparing' },
        explanation: `${sorted[mid]} < ${target} → target must be in the right half. Discard left half entirely.`,
      });
      low = mid + 1;
    } else {
      steps.push({
        array: sorted,
        highlights: { [mid]: 'comparing' },
        explanation: `${sorted[mid]} > ${target} → target must be in the left half. Discard right half entirely.`,
      });
      high = mid - 1;
    }
  }

  steps.push({
    array: sorted,
    highlights: {},
    explanation: `Search range is empty. ${target} is not in the array.`,
  });

  return steps;
}
