import {Node} from "./Node.js";

export {Tree}

function getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left !== left) {
        current = current.left;
    }
    return current;
}

class Tree {

    constructor(array){
        this.root = this.buildTree(array);
    }

    buildTree(array){
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

        const start = 0;
        const end = uniqueSortedArray.length - 1;
        const middle = start + Math.floor((end - start) / 2);

        if (start > end){
            return null
        }

        const currentNode = new Node(uniqueSortedArray[middle]);

        const leftArray = uniqueSortedArray.slice(0, middle);
        const rightArray = uniqueSortedArray.slice(middle + 1);

        currentNode.left = this.buildTree(leftArray);
        currentNode.right = this.buildTree(rightArray);

        return currentNode;

    }

    insert(value, currentNode = this.root){

        if (currentNode === null){
            return new Node(value);
        }

        if (value === currentNode.data){
            return currentNode
        }
    
        if (value < currentNode.data){
            currentNode.left = this.insert(value, currentNode.left);
        } else if (value > currentNode.data){
            currentNode.right = this.insert(value, currentNode.right);
        }
        
        return currentNode;
    }

    deleteItem(value, currentNode = this.root){

        if (currentNode === null){
            return null;
        }

        if (value > currentNode.data){
            currentNode.right = this.deleteItem(value, currentNode.right)
        } else if (value < currentNode.data) {
            currentNode.left = this.deleteItem(value, currentNode.left);
        } else {
            
            if (currentNode.left === null){
                return currentNode.right;
            }

            if (currentNode.right === null){
                return currentNode.left;
            }

            let successor = getSuccessor(currentNode);
            currentNode.data = successor.data;
            currentNode.right = deleteItem(currentNode.right, successor.data);
        }

        return currentNode;
    }

    find(value, currentNode = this.root){
        
        if (currentNode === null){
            return null
        }

        if (value === currentNode.data){
            return currentNode
        } else if (value > currentNode.data){
            return currentNode.right = this.find(value, currentNode.right)
        } else if (value < currentNode.data){
            return currentNode.left = this.find(value, currentNode.left)
        }

    }

    // BFS
    levelOrderForEach(callback, currentNode = this.root) {
        if (!callback){
            throw new Error("No Callback Input!")    
        }

        const queue = [currentNode];

        while (queue.length > 0){

            const current = queue.shift();
            callback(current);

            if (current.right){
                queue.push(current.right)
            }

            if (current.left){
                queue.push(current.left);
            }
            
        }
  }

    // DFS (left -> root -> right)
    inOrderForEach(callback, currentNode = this.root){

        if (!callback){
            throw new Error("No Callback Input!")    
        }

        if (!currentNode){
            return;
        }

        this.inOrderForEach(callback, currentNode.left);

        callback(currentNode);

        this.inOrderForEach(callback, currentNode.right);
        
        return;
    }

    // DFS (root -> left -> right)
    preOrderForEach(callback, currentNode = this.root){

        if (!callback){
            throw new Error("No Callback Input!")    
        }

        if (!currentNode){
            return;
        }

        this.inOrderForEach(callback, currentNode.left);

        this.inOrderForEach(callback, currentNode.right);

        callback(currentNode);

        return;
    }

    // DFS (left -> right -> root)
    postOrderForEach(callback, currentNode = this.root){
        
        if (!callback){
            throw new Error("no Callback Input!")
        }

        if (!currentNode){
            return;
        }

        this.inOrderForEach(callback, currentNode.left);

        this.inOrderForEach(callback, currentNode.right);

        callback(currentNode);

        return;
    }

    height(value, currentNode = this.find(value)){

        if (!currentNode){
            return null
        }

        const maxHeight = Math.max(this.height(value, currentNode.left), this.height(value, currentNode.right));

        return maxHeight;
    }

    depth(value, currentNode = this.root, currentDepth = 0){

        if (!currentNode){
            return null
        }

        if (currentNode.data === value){
            return currentDepth;
        } else if (value < currentNode.data){
            return this.depth(value, currentNode.left, currentDepth++);
        } else if (value > currentNode.data){
            return this.depth(value, currentNode.right, currentDepth++);
        }
        
    }

    isBalanced(currentNode = this.root){

        if (!currentNode){
            return true;
        }

        const leftNodeHeight = this.height(currentNode.left);
        const rightNodeHeight = this.height(currentNode.right);

        const heightDifference = Math.abs(leftNodeHeight - rightNodeHeight);

        if (heightDifference > 1) {
            return false;
        }

        return this.isBalanced(currentNode.left) && this.isBalanced(currentNode.right);
    
    }

    rebalance(){

        const unbalancedTreeArray = [];
        this.postOrderForEach((node) => unbalancedTreeArray.push(node.data));
        this.root = this.buildTree(unbalancedTreeArray);
        return this.root;
    }

}