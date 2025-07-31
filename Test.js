import {Tree} from "./BinarySearchTree.js";

// Function to Visualize Binary Search Tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


// Function to generate random size of array with random numbers
const randomArrayGenerator = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}



// Creation of Binary Search Tree (Visualization using prettyPrint Function)
const randomArray = randomArrayGenerator(3);
const testTree = new Tree(randomArray);
console.log(testTree);
console.log(prettyPrint(testTree.root));


// Confirm that tree is balanced by calling isBalanced().
console.log(testTree.isBalanced());


// Print out all elements in Level, Pre, Post, and In-Order.
console.log(`Level-Order Traversal: `)
testTree.levelOrderForEach((node) => {
    console.log(node.data);
})
