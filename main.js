import { Tree } from "./script.js";

function getRandomArray(length, min, max) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

const randomArray = getRandomArray(25, 1, 100);
randomArray.push(100, 101, 102, 104, 105);
const tree = new Tree(randomArray);

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

console.log(randomArray);
tree.levelOrder((a) => {
  console.table(a);
});
// prettyPrint(tree.rebalance());
