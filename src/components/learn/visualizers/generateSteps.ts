import type { VisualizerKind, VisualizerStep } from './types';
import { linearSearchSteps } from './linearSearchSteps';
import { binarySearchSteps } from './binarySearchSteps';
import { selectionSortSteps } from './selectionSortSteps';
import { bubbleSortSteps } from './bubbleSortSteps';
import { insertionSortSteps } from './insertionSortSteps';
import { mergeSortSteps } from './mergeSortSteps';

const SEARCH_ARRAY = [34, 7, 23, 32, 5, 62, 18, 45];
const SEARCH_TARGET = 23;

const SORT_ARRAY = [38, 27, 43, 3, 9, 82, 10, 55];

export function generateSteps(kind: VisualizerKind): VisualizerStep[] {
  switch (kind) {
    case 'linear-search':
      return linearSearchSteps(SEARCH_ARRAY, SEARCH_TARGET);
    case 'binary-search':
      return binarySearchSteps(SEARCH_ARRAY, SEARCH_TARGET);
    case 'selection-sort':
      return selectionSortSteps(SORT_ARRAY);
    case 'bubble-sort':
      return bubbleSortSteps(SORT_ARRAY);
    case 'insertion-sort':
      return insertionSortSteps(SORT_ARRAY);
    case 'merge-sort':
      return mergeSortSteps(SORT_ARRAY);
  }
}
