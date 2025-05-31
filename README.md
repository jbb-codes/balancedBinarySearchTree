# Balanced Binary Search Tree

A JavaScript implementation of a balanced binary search tree data structure.

## Introduction

This repository contains a complete implementation of a self-balancing binary search tree in JavaScript. The implementation provides efficient operations for inserting, deleting, and finding values while maintaining the tree's balance for optimal performance.

Binary search trees are fundamental data structures in computer science, and maintaining their balance ensures that operations remain efficient even as the tree grows or changes.

## What is a Balanced Binary Search Tree?

A binary search tree (BST) is a tree data structure where each node has at most two children (left and right), and:
- All nodes in the left subtree have values less than the node's value
- All nodes in the right subtree have values greater than the node's value

A balanced binary search tree maintains these properties while also ensuring that the tree's height is minimized. In a balanced tree:

- The height of the left and right subtrees of any node differ by at most one
- Both the left and right subtrees are also balanced

This balance property ensures that operations like insertion, deletion, and searching maintain O(log n) time complexity rather than degrading to O(n) in the worst case.

### Benefits of Balanced Trees:

- **Efficient Search**: O(log n) time complexity for lookups
- **Fast Insertions/Deletions**: Maintains O(log n) operations when adding or removing elements
- **Predictable Performance**: Avoids the worst-case scenarios of unbalanced trees
- **Space Efficiency**: Minimizes the tree height, reducing memory overhead in some implementations

## Features

This implementation includes:

- **Tree Creation**: Build a balanced tree from an array of values
- **Insertion & Deletion**: Add or remove nodes while maintaining tree properties
- **Traversal Methods**:
  - Level Order (breadth-first)
  - In-order (left-root-right)
  - Pre-order (root-left-right)
  - Post-order (left-right-root)
- **Node Operations**:
  - Find nodes by value
  - Calculate height of a node or subtree
  - Calculate depth of a node
- **Balance Management**:
  - Check if the tree is balanced
  - Rebalance the tree when needed

## Installation & Usage

### Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/balancedBinarySearchTree.git
cd balancedBinarySearchTree
```

### Basic Usage

```javascript
// Import the Tree class
import { Tree } from "./script.js";

// Create a new tree with an array of values
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

// The tree automatically sorts and removes duplicates during creation

// Insert a new value
tree.insert(10);

// Delete a value
tree.deleteItem(7); // Logs a message if value not found

// Find a value (returns the value if found, not the node)
const foundValue = tree.find(9);

// Check if the tree is balanced
const isBalanced = tree.isBalanced(); // Returns true or false

// Rebalance the tree if needed
tree.rebalance(); // Returns false if already balanced

// Traverse the tree (each traversal method requires a callback)
tree.inOrder((value) => console.log(value));
```

### Testing with Random Data

You can easily test your tree implementation with random data using the included utility function:

```javascript
// Function to generate an array of random numbers
function getRandomArray(length, min, max) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

// Generate 25 random numbers between 1 and 100
const randomArray = getRandomArray(25, 1, 100);

// Add some specific values if needed
randomArray.push(100, 101, 102);

// Create a balanced tree with the random array
const tree = new Tree(randomArray);

// Test a traversal method
tree.levelOrder((value) => {
  console.log(value);
});
```

This approach is excellent for testing the performance and balance characteristics of your tree with different data distributions.

### Pretty Print Utility

The repository includes a utility function to visualize the tree structure in the console:

```javascript
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Use it with your tree
prettyPrint(tree.root);
```

## Implementation Details

### Node Class

The basic building block of the tree:

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```

### Tree Class

The main class that implements all tree operations:

- `buildTree(arr)`: Constructs a balanced tree from an array
  - Internally uses `sortArray()` to sort and remove duplicates
  - Then uses `balancedTree()` to create a balanced BST recursively
- `insert(value)`: Adds a new value to the tree, ignores duplicates
- `deleteItem(value)`: Removes a value from the tree, logs a message if value not found
- `find(value)`: Locates and returns the value if found, logs a message if not found
- `levelOrder(callback)`: Traverses the tree in breadth-first order and applies the callback to each node's data
- `inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)`: Depth-first traversal methods that require callbacks
  - All traversal methods throw an error if no callback is provided
- `height(value)`: Calculates the height of a node (longest path to a leaf)
- `depth(value)`: Calculates the depth of a node (distance from the root)
- `isBalanced()`: Checks if the tree is balanced (returns true or false)
- `rebalance()`: Rebuilds the tree to ensure it's balanced
  - Returns false if the tree is already balanced
  - Uses in-order traversal to collect all values and then rebuilds the tree

The implementation uses recursion for most tree operations, which provides elegant and readable code for traversal and manipulation of the tree structure.

#### How Tree Balancing Works

1. The `buildTree` method takes an array and creates a balanced BST:
   - First, the array is sorted and duplicates are removed
   - Then, the middle element is chosen as the root
   - Left and right subtrees are built recursively using the left and right portions of the array

2. The `isBalanced` method checks if the tree is balanced by:
   - Calculating the height of left and right subtrees for each node
   - Ensuring the difference in heights is at most 1

3. The `rebalance` method rebalances an unbalanced tree by:
   - Using in-order traversal to get all values in sorted order
   - Rebuilding the tree using the balanced tree algorithm

## License

This project is open-source and available under the MIT License.

