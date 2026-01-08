import type { AlgorithmEntry } from "./types";

import activity_selection from "./activity_selection_data";
import approximation from "./approximation_data";
import balanced_trees from "./balanced_trees_data";
import bellman_ford from "./bellman_ford_data";
import bfs from "./bfs_data";
import binary_search from "./binary_search_data";
import binary_search_tree from "./binary_search_tree_data";
import bubble_sort from "./bubble_sort_data";
import circuit_complexity from "./circuit_complexity_data";
import convex_hull from "./convex_hull_data";
import count_min_sketch from "./count_min_sketch_data";
import dfs from "./dfs_data";
import dijkstra from "./dijkstra_data";
import dinic from "./dinic_data";
import disjoint_set_union from "./disjoint_set_union_data";
import edmonds_karp from "./edmonds_karp_data";
import em_algorithm from "./em_algorithm_data";
import fenwick_tree from "./fenwick_tree_data";
import fibonacci_dp from "./fibonacci_dp_data";
import fine_grained_complexity from "./fine_grained_complexity_data";
import floyd_warshall from "./floyd_warshall_data";
import ford_fulkerson from "./ford_fulkerson_data";
import hash_table from "./hash_table_data";
import heap_sort from "./heap_sort_data";
import huffman_coding from "./huffman_coding_data";
import insertion_sort from "./insertion_sort_data";
import kmp from "./kmp_data";
import knapsack_01 from "./knapsack_01_data";
import kruskal from "./kruskal_data";
import las_vegas from "./las_vegas_data";
import lcs from "./lcs_data";
import line_sweep from "./line_sweep_data";
import linear_search from "./linear_search_data";
import mapreduce from "./mapreduce_data";
import merge_sort from "./merge_sort_data";
import misra_gries from "./misra_gries_data";
import monte_carlo from "./monte_carlo_data";
import np_complete from "./np_complete_data";
import p_vs_np from "./p_vs_np_data";
import pcp_theorem from "./pcp_theorem_data";
import pram_prefix_sum from "./pram_prefix_sum_data";
import prim from "./prim_data";
import quick_sort from "./quick_sort_data";
import rabin_karp from "./rabin_karp_data";
import randomized_quicksort from "./randomized_quicksort_data";
import segment_tree from "./segment_tree_data";
import selection_sort from "./selection_sort_data";
import sgd from "./sgd_data";
import stack_queue from "./stack_queue_data";
import suffix_array from "./suffix_array_data";
import trie from "./trie_data";

export const CURRICULUM: AlgorithmEntry[] = [
  activity_selection,
  approximation,
  balanced_trees,
  bellman_ford,
  bfs,
  binary_search,
  binary_search_tree,
  bubble_sort,
  circuit_complexity,
  convex_hull,
  count_min_sketch,
  dfs,
  dijkstra,
  dinic,
  disjoint_set_union,
  edmonds_karp,
  em_algorithm,
  fenwick_tree,
  fibonacci_dp,
  fine_grained_complexity,
  floyd_warshall,
  ford_fulkerson,
  hash_table,
  heap_sort,
  huffman_coding,
  insertion_sort,
  kmp,
  knapsack_01,
  kruskal,
  las_vegas,
  lcs,
  line_sweep,
  linear_search,
  mapreduce,
  merge_sort,
  misra_gries,
  monte_carlo,
  np_complete,
  p_vs_np,
  pcp_theorem,
  pram_prefix_sum,
  prim,
  quick_sort,
  rabin_karp,
  randomized_quicksort,
  segment_tree,
  selection_sort,
  sgd,
  stack_queue,
  suffix_array,
  trie,
];

export type { AlgorithmEntry, Language, Difficulty } from "./types";
export default CURRICULUM;