const { NotImplementedError } = require("../lib");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const createNode = (node, data) => {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = createNode(node.left, data);
      } else {
        node.right = createNode(node.right, data);
      }

      return node;
    };

    this._root = createNode(this.root(), data);
  }

  find(data) {
    const searchItem = (node, data) => {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data
        ? searchItem(node.left, data)
        : searchItem(node.right, data);
    };

    return searchItem(this.root(), data);
  }

  has(data) {
    return Boolean(this.find(data));
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;

        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    };

    this._root = removeNode(this.root(), data);
  }

  min() {
    const searchMin = (node) => {
      if (!node.left) {
        return node.data;
      }

      return searchMin(node.left);
    };

    return searchMin(this.root());
  }

  max() {
    const searchMax = (node) => {
      if (!node.right) {
        return node.data;
      }

      return searchMax(node.right);
    };

    return searchMax(this.root());
  }
}

module.exports = {
  BinarySearchTree,
};
