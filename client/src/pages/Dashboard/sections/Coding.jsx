import React, { useState, useEffect } from "react";
import MountainIllustration from "../../../components/ui/MountainIllustration";
import { NavIcons, UI, behavioralPrompts } from "../constants";

export default function Coding({ nightMode }) {
  const topics = [
  {
    "title": "Two Pointers",
    "description": "Master Two Pointers with these curated problems.",
    "problems": [
      {
        "name": "Pair with Target Sum",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/"
      },
      {
        "name": "Rearrange 0 and 1",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1"
      },
      {
        "name": "Remove Duplicates",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/"
      },
      {
        "name": "Squaring a Sorted Array",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/squares-of-a-sorted-array/"
      },
      {
        "name": "Triplet Sum to Zero",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/3sum/"
      },
      {
        "name": "Triplet Sum Close to Target",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/3sum-closest/"
      },
      {
        "name": "Triplets with Smaller Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1"
      },
      {
        "name": "Subarrays with Product Less than a Target",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/subarray-product-less-than-k/"
      },
      {
        "name": "Dutch National Flag Problem",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/sort-colors/description/"
      },
      {
        "name": "Quadruple Sum to Target",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/4sum/"
      },
      {
        "name": "Comparing Strings containing Backspaces",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/backspace-string-compare/"
      },
      {
        "name": "Minimum Window Sort",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/shortest-unsorted-continuous-subarray/"
      }
    ]
  },
  {
    "title": "Fast & Slow Pointers",
    "description": "Master Fast & Slow Pointers with these curated problems.",
    "problems": [
      {
        "name": "LinkedList Cycle",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/linked-list-cycle/"
      },
      {
        "name": "Start of LinkedList Cycle",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/linked-list-cycle-ii/"
      },
      {
        "name": "Happy Number",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/happy-number/"
      },
      {
        "name": "FIND DUPLICATE NUMBER",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-the-duplicate-number/description/"
      },
      {
        "name": "Middle of the LinkedList",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/middle-of-the-linked-list/"
      },
      {
        "name": "Palindrome LinkedList",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/palindrome-linked-list/"
      },
      {
        "name": "Rearrange a LinkedList",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/reorder-list/"
      },
      {
        "name": "Cycle in a Circular Array",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/circular-array-loop/"
      }
    ]
  },
  {
    "title": "Sliding Window",
    "description": "Master Sliding Window with these curated problems.",
    "problems": [
      {
        "name": "Maximum Sum Subarray of Size K",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1"
      },
      {
        "name": "Smallest Subarray with a given sum",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/minimum-size-subarray-sum/"
      },
      {
        "name": "Longest Substring with K Distinct Characters",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1"
      },
      {
        "name": "Fruits into Baskets",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/fruit-into-baskets/"
      },
      {
        "name": "No-repeat Substring",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      {
        "name": "Longest Substring with Same Letters after Replacement",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      {
        "name": "Longest Subarray with Ones after Replacement",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/max-consecutive-ones-iii/"
      },
      {
        "name": "Minimum size subarray SUM",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/minimum-size-subarray-sum/"
      },
      {
        "name": "MInimum Size Substring",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-interview-150"
      },
      {
        "name": "Permutation in a String",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/permutation-in-string/"
      },
      {
        "name": "String Anagrams",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      {
        "name": "Words Concatenation",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
      }
    ]
  },
  {
    "title": "Kadane Pattern",
    "description": "Master Kadane Pattern with these curated problems.",
    "problems": [
      {
        "name": "Maximum subarray sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-subarray/?utm_source=chatgpt.com"
      },
      {
        "name": "Minimum Subarray Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1"
      },
      {
        "name": "Maximum product subarray",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-product-subarray/?utm_source=chatgpt.com"
      },
      {
        "name": "Maximum subarray sum with one deletion",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/description/"
      },
      {
        "name": "Maximum absolute sum of any subarray",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/"
      },
      {
        "name": "Maximum sum in circular array variant",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-sum-circular-subarray/?utm_source=chatgpt.com"
      }
    ]
  },
  {
    "title": "Prefix Sum",
    "description": "Master Prefix Sum with these curated problems.",
    "problems": [
      {
        "name": "Subarray Sum Equals K",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/subarray-sum-equals-k/description/"
      },
      {
        "name": "Find Pivot Index",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/find-pivot-index/description/"
      },
      {
        "name": "Subarray Sums Divisible By K (Med)",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/subarray-sums-divisible-by-k/description/"
      },
      {
        "name": "Contiguous array",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/contiguous-array/description/"
      },
      {
        "name": "Problem challenge: Shortest Subarray With Sum at Least K",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/"
      },
      {
        "name": "Problem challenge: Count Range Sum",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/count-of-range-sum/description/"
      }
    ]
  },
  {
    "title": "Merge Intervals",
    "description": "Master Merge Intervals with these curated problems.",
    "problems": [
      {
        "name": "Merge Intervals",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/merge-intervals/description/"
      },
      {
        "name": "Insert Interval",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/insert-interval/"
      },
      {
        "name": "Intervals Intersection",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/interval-list-intersections/description/"
      },
      {
        "name": "Overlapping Intervals",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/check-if-any-two-intervals-overlap-among-a-given-set-of-intervals/"
      },
      {
        "name": "Minimum Meeting Rooms",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1"
      },
      {
        "name": "Maximum CPU Load",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/"
      },
      {
        "name": "Employee Free Time",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://www.codertrain.co/employee-free-time"
      }
    ]
  },
  {
    "title": "In-Place Reversal Of A Linkedlist",
    "description": "Master In-Place Reversal Of A Linkedlist with these curated problems.",
    "problems": [
      {
        "name": "Reverse a LinkedList",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        "name": "Reverse a Sub-list",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/reverse-linked-list-ii/"
      },
      {
        "name": "Reverse List in Pairs (Medium)",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/swap-nodes-in-pairs/description/"
      },
      {
        "name": "Reverse every K-element Sub-list",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
      },
      {
        "name": "Reverse nodes in EVEN Length Groups",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/reverse-nodes-in-even-length-groups/description/"
      },
      {
        "name": "Rotate a LinkedList",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/rotate-list/"
      }
    ]
  },
  {
    "title": "Stack",
    "description": "Master Stack with these curated problems.",
    "problems": [
      {
        "name": "remove adjacent duplicates",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/"
      },
      {
        "name": "Balanced Parentheses",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/valid-parentheses/description/"
      }
    ]
  },
  {
    "title": "Reverse A String",
    "description": "Master Reverse A String with these curated problems.",
    "problems": [
      {
        "name": "Next Greater Element",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/next-greater-element-ii/description/"
      },
      {
        "name": "Daily Temperatures",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/daily-temperatures/"
      },
      {
        "name": "Remove Nodes From Linked List",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/remove-nodes-from-linked-list/"
      },
      {
        "name": "Remove All Adjacent Duplicates in String II",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/"
      },
      {
        "name": "Simplify Path (Problem Challenge)",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/simplify-path/"
      },
      {
        "name": "Remove K Digits  Problem challenge",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/remove-k-digits/"
      }
    ]
  },
  {
    "title": "Hash Maps",
    "description": "Master Hash Maps with these curated problems.",
    "problems": [
      {
        "name": "First Non-repeating Character",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      },
      {
        "name": "Maximum Number of Balloons",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/maximum-number-of-balloons/"
      },
      {
        "name": "Longest Palindrome",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/longest-palindrome/"
      },
      {
        "name": "Ransom Note",
        "difficulty": "Easy",
        "color": "text-green-500",
        "bg": "bg-green-500/10",
        "link": "https://leetcode.com/problems/ransom-note/"
      }
    ]
  },
  {
    "title": "Pattern : Binary Search",
    "description": "Master Pattern : Binary Search with these curated problems.",
    "problems": [
      {
        "name": "Binary search basic",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-search/"
      },
      {
        "name": "Upper Bound/ Ceiling",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1"
      },
      {
        "name": "First and Last position",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
      },
      {
        "name": "Count number of occurences",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1"
      },
      {
        "name": "Search in infinite Sorted array",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/"
      },
      {
        "name": "Peak index in Mountain",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
      },
      {
        "name": "Find peak in mountain range",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-peak-element/"
      },
      {
        "name": "Find minimum in rotated sorted array",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      {
        "name": "Find number of rotations to sorted array",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/rotation4723/1"
      },
      {
        "name": "Search in rotated sorted array",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/search-in-rotated-sorted-array/description/"
      },
      {
        "name": "KOKO eating BANANAS",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/koko-eating-bananas/"
      },
      {
        "name": "Min num of days to make m bouquets",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/"
      },
      {
        "name": "Aggresive cows",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/aggressive-cows/1"
      },
      {
        "name": "H index 2",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/h-index-ii/description/"
      },
      {
        "name": "Max candies to k children",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-candies-allocated-to-k-children/description/"
      },
      {
        "name": "Capacity to ship packages in d days",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/"
      },
      {
        "name": "Book Allocation Problem",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1"
      },
      {
        "name": "Split largest arrray",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/split-array-largest-sum/description/"
      },
      {
        "name": "Search 2 D matrix",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      {
        "name": "Search 2D matrix (Hard)",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/search-a-2d-matrix-ii/description/"
      },
      {
        "name": "kth smallest in sorted matrix",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"
      },
      {
        "name": "kth smallest in multiplication matrix",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/description/"
      },
      {
        "name": "median of 2 sorted arrays",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      }
    ]
  },
  {
    "title": "Heap Pattern",
    "description": "Master Heap Pattern with these curated problems.",
    "problems": [
      {
        "name": "kth smallest",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1"
      },
      {
        "name": "kth largest",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/kth-largest-element-in-an-array/description/"
      },
      {
        "name": "TOP K frequent Elements",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/top-k-frequent-elements/description/"
      },
      {
        "name": "Top K frequent Words",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/top-k-frequent-words/description/"
      },
      {
        "name": "K closest points to origin",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/k-closest-points-to-origin/description/"
      },
      {
        "name": "Find K closest elements",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-k-closest-elements/description/"
      },
      {
        "name": "Kth weakest row in Matrix",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/description/"
      },
      {
        "name": "Merge K Sorted Arrays",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1"
      },
      {
        "name": "Kth Smallest in Sorted Matrix",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"
      },
      {
        "name": "LAST STONE WEIGHT",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/last-stone-weight/description/"
      },
      {
        "name": "CPU Task Scheduler",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/task-scheduler/description/"
      },
      {
        "name": "Reorganize String",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/reorganize-string/"
      },
      {
        "name": "Min number of refueling stops",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/minimum-number-of-refueling-stops/description/"
      },
      {
        "name": "IPO",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/ipo/description/"
      },
      {
        "name": "Course Scheduler 3",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/course-schedule-iii/description/"
      },
      {
        "name": "Find median in data stream",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/find-median-from-data-stream/description/"
      },
      {
        "name": "Sliding Window Median",
        "difficulty": "Hard",
        "color": "text-red-500",
        "bg": "bg-red-500/10",
        "link": "https://leetcode.com/problems/sliding-window-median/description/"
      }
    ]
  },
  {
    "title": "Recursion And Backtracking Pattern",
    "description": "Master Recursion And Backtracking Pattern with these curated problems.",
    "problems": [
      {
        "name": "Fibonnaci",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/fibonacci-number/description/"
      },
      {
        "name": "Check if string is Pallindrome",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/palindrome-string0817/1"
      },
      {
        "name": "Check if Array is Sorted",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1"
      },
      {
        "name": "Sum of digits of a number",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/sum-of-digits1742/1"
      },
      {
        "name": "Remove occurences of a character in string",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/remove-all-occurrences-of-a-character-in-a-string/1"
      },
      {
        "name": "Generate parenthesis",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/generate-parentheses/description/"
      },
      {
        "name": "Letter Combinations of phone number",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/"
      },
      {
        "name": "Permutations",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/permutations/description/"
      },
      {
        "name": "Combination Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/combination-sum/description/"
      },
      {
        "name": "Pallindrome partition",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/palindrome-partitioning/description/"
      }
    ]
  },
  {
    "title": "Tree Pattern",
    "description": "Master Tree Pattern with these curated problems.",
    "problems": [
      {
        "name": "Inorder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/description/"
      },
      {
        "name": "Preorder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-preorder-traversal/description/"
      },
      {
        "name": "Postorder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-postorder-traversal/description/"
      },
      {
        "name": "Level Order",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/description/"
      },
      {
        "name": "ZigZag Order",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/"
      },
      {
        "name": "Level Order II",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/"
      },
      {
        "name": "Invert Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/invert-binary-tree/description/"
      },
      {
        "name": "Symmetric Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/symmetric-tree/description/"
      },
      {
        "name": "Same Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/same-tree/description/"
      },
      {
        "name": "Subtree of another TREE",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/subtree-of-another-tree/description/"
      },
      {
        "name": "Flip Equivalent Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/flip-equivalent-binary-trees/description/"
      },
      {
        "name": "LCA of Binary TREE",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/"
      },
      {
        "name": "Binary Search Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
      },
      {
        "name": "LCA of BST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/"
      },
      {
        "name": "LCA of Deepest Leaves",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/description/"
      },
      {
        "name": "Two Sum IV",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/"
      },
      {
        "name": "Kth smallest element in BST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/"
      },
      {
        "name": "Minimum Depth of Binary Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/minimum-depth-of-binary-tree/description/"
      },
      {
        "name": "Maximum Depth of Binary Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/"
      },
      {
        "name": "Balanced Binary Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/balanced-binary-tree/description/"
      },
      {
        "name": "Diameter of Binary Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/diameter-of-binary-tree/description/"
      },
      {
        "name": "Check Completeness of Binary Tree",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/check-completeness-of-a-binary-tree/description/"
      },
      {
        "name": "Validate BST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/validate-binary-search-tree/description/"
      },
      {
        "name": "Recover BST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/recover-binary-search-tree/description/"
      },
      {
        "name": "Path Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/path-sum/description/"
      },
      {
        "name": "Path Sum II",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/path-sum-ii/"
      },
      {
        "name": "Sum of Root to Leaf",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/sum-root-to-leaf-numbers/description/"
      },
      {
        "name": "Maximum Path Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/"
      },
      {
        "name": "Contruct tree from preorder and inorder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/"
      },
      {
        "name": "Contruct tree from postorder and inorder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/"
      },
      {
        "name": "Sorted Array to BST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/"
      }
    ]
  },
  {
    "title": "Graphs",
    "description": "Master Graphs with these curated problems.",
    "problems": [
      {
        "name": "Construct Adjancency List from EDGES+Nodes",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1"
      },
      {
        "name": "Graph DFS",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1"
      },
      {
        "name": "GRAPH BFS",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1"
      },
      {
        "name": "Number of Islands",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/number-of-islands/description/"
      },
      {
        "name": "Number of Provinces",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/number-of-provinces/description/"
      },
      {
        "name": "Rotten Oranges",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/rotting-oranges/"
      },
      {
        "name": "Cycle detection in undirected graph",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1"
      },
      {
        "name": "Cycle detection in directed graph",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1"
      },
      {
        "name": "Topological sort",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/topological-sort/1"
      },
      {
        "name": "Bipartite Graph/ Graph Coloring",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/is-graph-bipartite/"
      },
      {
        "name": "Surrounded Regoins",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/surrounded-regions/"
      },
      {
        "name": "Shortest Path in Non-Weighted Graph",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1"
      },
      {
        "name": "Dijkstra's Algorithm",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1"
      },
      {
        "name": "Network Delay",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/network-delay-time/"
      },
      {
        "name": "Path With Minimum Effort",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/path-with-minimum-effort/"
      },
      {
        "name": "Swim in Rising Water",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/swim-in-rising-water/"
      },
      {
        "name": "Bellman ford",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1"
      },
      {
        "name": "Cheapest Path in K stops",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/cheapest-flights-within-k-stops/description/"
      },
      {
        "name": "Prim MST",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1"
      },
      {
        "name": "Word Ladder",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/word-ladder/"
      }
    ]
  },
  {
    "title": "Dynamic Programming (DP)",
    "description": "Master Dynamic Programming (DP) with these curated problems.",
    "problems": [
      {
        "name": "Fibonacci",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/fibonacci-number/description/"
      },
      {
        "name": "Climbing Stairs",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/climbing-stairs/description/"
      },
      {
        "name": "House Robber",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/house-robber/"
      },
      {
        "name": "0/1 Knapsack",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1"
      }
    ]
  },
  {
    "title": "Episode 06: Tabulation Intro",
    "description": "Master Episode 06: Tabulation Intro with these curated problems.",
    "problems": [
      {
        "name": "0/1 Knapsack Tabulation",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1"
      },
      {
        "name": "Subset sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1"
      },
      {
        "name": "Episode 09 : Target Sum",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/target-sum-1626326450/1"
      },
      {
        "name": "Episode 10 : LIS",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/longest-increasing-subsequence/"
      }
    ]
  },
  {
    "title": "Episode 11 : Lis Tabulation",
    "description": "Master Episode 11 : Lis Tabulation with these curated problems.",
    "problems": [
      {
        "name": "Episode 12 : LCS",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/longest-common-subsequence/description/"
      },
      {
        "name": "Episode 13 : Unique Paths",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/unique-paths/description/"
      },
      {
        "name": "Buy Sell Stocks",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/"
      },
      {
        "name": "MIn cost to cut stick",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/"
      }
    ]
  },
  {
    "title": "Greedy",
    "description": "Master Greedy with these curated problems.",
    "problems": [
      {
        "name": "Lemonade",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/lemonade-change/"
      },
      {
        "name": "Jump Game",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/jump-game/description/"
      },
      {
        "name": "Assign cookies",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://leetcode.com/problems/assign-cookies/description/"
      },
      {
        "name": "Fractional Knapsack",
        "difficulty": "Medium",
        "color": "text-yellow-500",
        "bg": "bg-yellow-500/10",
        "link": "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1"
      }
    ]
  }
];

  return <section className="pb-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> DSA CHEAT SHEET
        </p>
        <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Coding Practice.</h1>
      </div>
      <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>A highly curated list of standard interview patterns based on Blind 75 and NeetCode 150.</p>
    </div>
    
    <div className="mt-8 space-y-6 sm:space-y-8">
      {topics.map((topic, index) => (
        <article key={topic.title} className={`rounded-[24px] sm:rounded-[28px] border overflow-hidden shadow-soft ${nightMode ? "border-white/10 bg-[#10173A]/50" : "border-[#DCE3FA] bg-white"}`}>
          <div className={`border-b p-5 sm:p-7 ${nightMode ? "border-white/10" : "border-[#DCE3FA]/50"}`}>
            <h2 className={`font-display text-xl sm:text-[22px] font-bold tracking-tight ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>Step {index + 1}: {topic.title}</h2>
            <p className={`mt-1 text-sm ${nightMode ? "text-slate-400" : "text-slate-500"}`}>{topic.description}</p>
          </div>
          
          <div className="flex flex-col">
            {topic.problems.map((problem, qIndex) => (
              <div key={problem.name} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-7 sm:py-5 border-b last:border-0 transition-colors ${nightMode ? "border-white/5 hover:bg-white/5" : "border-slate-100 hover:bg-slate-50"}`}>
                <div className="flex items-center gap-4">
                  <span className={`shrink-0 flex items-center justify-center text-[10px] uppercase font-bold px-2 py-1 rounded-md ${problem.bg} ${problem.color}`}>{problem.difficulty}</span>
                  <p className={`text-sm sm:text-base font-bold ${nightMode ? "text-slate-200" : "text-[#131A2E]"}`}>{qIndex + 1}. {problem.name}</p>
                </div>
                <a href={problem.link} target="_blank" rel="noopener noreferrer" className={`shrink-0 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-bold transition-all ${nightMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#EAEEFC] text-[#3355E8] hover:bg-[#3355E8] hover:text-white"}`}>
                  Solve ↗
                </a>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>;
}
