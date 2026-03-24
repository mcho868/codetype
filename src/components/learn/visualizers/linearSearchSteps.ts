import type { VisualizerStep } from './types';

export function linearSearchSteps(arr: number[], target: number): VisualizerStep[] {
  const steps: VisualizerStep[] = [];

  steps.push({
    array: [...arr],
    highlights: {},
    explanation: `Looking for ${target}. Starting at the beginning and checking each element one by one.`,
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      highlights: { [i]: 'comparing' },
      explanation: `Index ${i}: Is ${arr[i]} === ${target}? ${arr[i] === target ? 'Yes!' : 'No, keep going.'}`,
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        highlights: { [i]: 'found' },
        explanation: `Found ${target} at index ${i}. Done — ${i + 1} comparison${i === 0 ? '' : 's'} needed.`,
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    highlights: {},
    explanation: `${target} is not in the array. Checked all ${arr.length} elements.`,
  });

  return steps;
}
