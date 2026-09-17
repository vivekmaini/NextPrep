# Data Structures and Algorithms (DSA) In-Depth Guide

## 1. Algorithmic Complexity (Big-O Notation)
Big-O notation describes the worst-case scenario of an algorithm's execution time or space used.
- **O(1) Constant:** Array index lookup, Hash Map insertion/lookup.
- **O(log n) Logarithmic:** Binary Search, finding an element in a Binary Search Tree (BST).
- **O(n) Linear:** Iterating through an array, Linked List traversal.
- **O(n log n) Linearithmic:** Merge Sort, Heap Sort, Quick Sort (average case).
- **O(n^2) Quadratic:** Bubble Sort, Insertion Sort, nested loops.
- **O(2^n) Exponential:** Recursive Fibonacci without memoization.

## 2. Linear Data Structures
- **Arrays:** Contiguous memory locations. Fast reads O(1), slow insertions/deletions in the middle O(n).
- **Linked Lists:** Nodes linked via pointers. Fast insertions/deletions O(1) if node is known, slow search O(n).
- **Stacks (LIFO):** Last-In-First-Out. Used in DFS, function call stacks, undo mechanisms.
- **Queues (FIFO):** First-In-First-Out. Used in BFS, task scheduling, message queues.

## 3. Trees and Graphs
- **Binary Search Tree (BST):** Left child is smaller, right child is greater. In-order traversal yields sorted elements.
- **AVL / Red-Black Trees:** Self-balancing BSTs guaranteeing O(log n) height.
- **Trie:** Prefix tree used heavily for autocomplete and dictionary implementations.
- **Graphs:** Vertices and Edges. Can be directed or undirected, cyclic or acyclic.
  - *BFS (Breadth-First Search):* Explores neighbors first. Uses a Queue. Good for finding the shortest path in an unweighted graph.
  - *DFS (Depth-First Search):* Goes deep before backtracking. Uses a Stack (or recursion). Good for detecting cycles and topological sorting.

## 4. Advanced Algorithmic Paradigms
- **Dynamic Programming (DP):** Solves problems by breaking them into overlapping subproblems and storing the results (Memoization: Top-down, Tabulation: Bottom-up). Examples: Knapsack, Longest Common Subsequence.
- **Greedy Algorithms:** Makes the locally optimal choice at each step. Examples: Dijkstra's, Huffman Coding.
- **Sliding Window:** Used to reduce O(n^2) nested loops to O(n) for subarray/substring problems.
- **Two Pointers:** Efficiently searching pairs in a sorted array or finding cycles in a linked list.


### Advanced Data Structures & Algorithms (Expert Level)
1. **Dynamic Programming Patterns**: Focus on the 0/1 Knapsack, Longest Common Subsequence (LCS), and Matrix Chain Multiplication. Always identify the state variables and the base cases.
2. **Graph Algorithms**: Understand Dijkstra's Algorithm for shortest path in weighted graphs without negative cycles. Use Bellman-Ford if negative weights exist.
3. **Disjoint Set Union (DSU)**: Essential for cycle detection in undirected graphs and Kruskal's Minimum Spanning Tree algorithm. Always implement path compression and union by rank for O(α(N)) time complexity.
4. **Trie (Prefix Tree)**: Used heavily in autocomplete systems and spell checkers. Fast O(L) time complexity for search, where L is the word length.
