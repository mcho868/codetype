export type HighlightRole =
  | 'comparing'
  | 'pivot'
  | 'sorted'
  | 'found'
  | 'subarray-left'
  | 'subarray-right';

export interface VisualizerStep {
  array: number[];
  highlights: Record<number, HighlightRole>;
  explanation: string;
}

export type VisualizerKind =
  | 'linear-search'
  | 'binary-search'
  | 'selection-sort'
  | 'bubble-sort'
  | 'insertion-sort'
  | 'merge-sort';
