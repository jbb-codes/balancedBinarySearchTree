class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = this.sortArray(arr);

    const node = this.balancedTree(sortedArray, 0, sortedArray.length - 1);

    return node;
  }

  sortArray(arr) {
    const sortedArray = [...arr].sort((a, b) => a - b);

    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] === sortedArray[i + 1]) {
        sortedArray.splice(i + 1, 1);
      }
    }
    return sortedArray;
  }

  balancedTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.balancedTree(arr, start, mid - 1);
    node.right = this.balancedTree(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    if (!this.root) {
      return (this.root = new Node(value));
    }

    if (value === this.root.data) {
      return;
    }

    const newNode = new Node(value);

    const recursiveInsert = (value, currentNode) => {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          return (currentNode.left = newNode);
        } else {
          recursiveInsert(value, currentNode.left);
        }
      } else {
        if (currentNode.right === null) {
          return (currentNode.right = newNode);
        } else {
          recursiveInsert(value, currentNode.right);
        }
      }
    };
    recursiveInsert(value, this.root);
  }

  deleteItem(value) {
    const recursiveDelete = (value, currentNode) => {
      if (currentNode === null) {
        return console.log(`${value} not found in the tree.`);
      }

      if (value < currentNode.value) {
        currentNode.left = recursiveDelete(value, currentNode.left);
      } else if (value > currentNode.value) {
        currentNode.right = recursiveDelete(value, currentNode.right);
      } else if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      } else {
        let inorderSuccessor = currentNode.right;
        while (inorderSuccessor.left !== null) {
          inorderSuccessor = inorderSuccessor.left;
        }

        currentNode.value = inorderSuccessor.value;

        currentNode.right = recursiveDelete(
          inorderSuccessor.value,
          currentNode.right
        );
      }
      return currentNode;
    };
    this.root = recursiveDelete(value, this.root);
  }

  find(value) {
    const findRecursive = (value, currentNode) => {
      if (currentNode === null) {
        return console.log(`${value} not found in the tree.`);
      }

      if (currentNode.value === value) {
        return currentNode.value;
      }

      if (value < currentNode.value) {
        return findRecursive(value, currentNode.left);
      }

      if (value > currentNode.value) {
        return findRecursive(value, currentNode.right);
      }
    };
    return findRecursive(value, this.root);
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    if (!this.root) return;
    const queue = [];
    queue.push(this.root);

    while (queue.length) {
      let currentNode = queue[0];
      callback(currentNode.data);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      queue.shift();
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    const inOrderRecursive = (callback, currentNode) => {
      if (!currentNode) return currentNode;

      inOrderRecursive(callback, currentNode.left);
      callback(currentNode.data);
      inOrderRecursive(callback, currentNode.right);
    };
    inOrderRecursive(callback, this.root);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    const preOrderRecursive = (callback, currentNode) => {
      if (!currentNode) return currentNode;

      callback(currentNode.data);
      preOrderRecursive(callback, currentNode.left);
      preOrderRecursive(callback, currentNode.right);
    };
    preOrderRecursive(callback, this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback function is required.");
    }

    const postOrderRecursive = (callback, currentNode) => {
      if (!currentNode) return currentNode;

      postOrderRecursive(callback, currentNode.left);
      postOrderRecursive(callback, currentNode.right);
      callback(currentNode.data);
    };
    postOrderRecursive(callback, this.root);
  }

  height(value) {
    const outerNode = this.find(value);
    if (!outerNode) return null;

    const findHeight = (currentNode) => {
      if (!currentNode) return -1;
      const leftHeight = findHeight(currentNode.left);
      const rightHeight = findHeight(currentNode.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return findHeight(outerNode);
  }

  depth(value) {
    const node = this.find(value);
    if (!node) return null;

    const findDepth = (value, currentNode, count = 0) => {
      if (value === currentNode.data) return 0;

      if (value < currentNode.data) {
        count = findDepth(value, currentNode.left, count);
      } else {
        count = findDepth(value, currentNode.right, count);
      }
      return count++;
    };
    return findDepth(node.data, this.root);
  }

  isBalanced() {
    const array = [];

    const findHeight = (currentNode) => {
      if (!currentNode) return -1;
      const leftHeight = findHeight(currentNode.left);
      const rightHeight = findHeight(currentNode.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };

    const checkBalance = (currentNode, array) => {
      if (!currentNode) return currentNode;

      const left = checkBalance(currentNode.left, array);
      const right = checkBalance(currentNode.right, array);
      if (Math.abs(findHeight(left) - findHeight(right)) > 1) {
        array.push(false);
      }
      return currentNode;
    };
    checkBalance(this.root, array);
    return array.length === 0 ? true : false;
  }

  rebalance() {
    if (this.isBalanced()) {
      return false;
    }

    const newArray = [];

    this.inOrder((value) => {
      newArray.push(value);
    });

    this.root = this.buildTree(newArray);
  }
}
